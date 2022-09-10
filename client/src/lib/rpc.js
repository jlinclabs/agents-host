import jaysonBrowserClient from 'jayson/promise/lib/client/browser'

async function callServer(body, tries = 0){
  const res = await fetch('/api/jlinx/v0', {
    method: 'POST',
    body,
    headers: {
      'Content-Type': 'application/json',
    }
  })
  console.log({ res })
  if (res.status === 504 && tries < 5) {
    await wait(500)
    return callServer(body, tries + 1)
  }
  const json = await res.text()
  if (res.status >= 400) {
    console.error('RPC error', { json })
    // throw new Error('RPC ERROR')
  }
  return json
}

const client = new jaysonBrowserClient(callServer, {
  // other options go here
});

export async function rpc(name, args, opts = {}){
  let id = undefined // set to null to ignore server response
  const res = await client.request(name, args, id)
  console.log('RPC response', res)
  if (res.error) {
    let message = `RPC call failed`
    if (res.error?.error?.data?.message)
      message += `: ${res.error.error.data.message}`
    const error = new Error(message)
    if (res.error?.error?.data?.stack)
      error.stack += `\n${res.error.error.data.stack}`
    error.data = res.error
    throw error
  }
  return res.result
}

window.rpc = rpc

const wait = ms => new Promise(resolve => {
  setTimeout(() => { resolve() }, ms)
})

