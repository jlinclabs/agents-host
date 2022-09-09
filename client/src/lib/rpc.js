import jaysonBrowserClient from 'jayson/promise/lib/client/browser'

async function callServer(body, tries = 0){
  const res = await fetch('/api/jlinx/v0', {
    method: 'POST',
    body,
    headers: {
      'Content-Type': 'application/json',
    }
  })
  if (res.status === 504 && tries < 5) {
    await wait(500)
    return callServer(body, tries + 1)
  }
  if (res.status >= 400) {
    // throw new Error('RPC ERROR')
  }
  const text = await res.text()
  console.log({ text })
  return text
}

const client = new jaysonBrowserClient(callServer, {
  // other options go here
});

export async function rpc(name, args, opts = {}){
  let id = undefined // set to null to ignore server response
  const { result } = await client.request(name, args, id)
  return result
}

window.rpc = rpc

const wait = ms => new Promise(resolve => {
  setTimeout(() => { resolve() }, ms)
})

