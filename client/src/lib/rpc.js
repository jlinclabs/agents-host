import jaysonBrowserClient from 'jayson/promise/lib/client/browser'
import { useState, useCallback } from 'react'
import useSWR, { useSWRConfig } from 'swr'

async function callServer(body, tries = 0){
  const res = await fetch('/api/jlinx/v0/rpc', {
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
  return await res.text()
}

const client = new jaysonBrowserClient(callServer, {
  // other options go here
});

export async function rpc(name, args = {}, opts = {}){
  // console.log('RPC call', {name, args})
  let id = undefined // set to null to ignore server response
  const res = await client.request(name, args, id)
  if (res.error) {
    let message = `RPC call failed NAME=${name}`
    if (res.error?.error?.code)
      message += ` CODE=${res.error.error.code}`
    if (res.error?.error?.message)
      message += ` ${res.error.error.message}`
    if (res.error?.error?.data?.message)
      message += ` ${res.error.error.data.message}`
    const error = new Error(message)
    if (res.error?.error?.data?.stack)
      error.stack += `\n${res.error.error.data.stack}`
    error.data = res.error
    console.error(error)
    throw error
  }
  // console.log('RPC resp', { name, args }, res.result)
  return res.result
}

window.rpc = rpc

const wait = ms => new Promise(resolve => {
  setTimeout(() => { resolve() }, ms)
})


const fetchView = ({ name, args }) => rpc(name, args)
export function useRemoteQuery(name, args = {}){
  validateViewName(name)
  const swrKey = name ? { name, args } : null
  const { data: view, error, mutate } = useSWR(swrKey, fetchView)
  const loading = typeof view === 'undefined' && !error
  const reload = useCallback(() => { mutate(swrKey) }, [swrKey, mutate])
  return { view, loading, error, mutate, reload }
}

function validateViewName(name){
  if (
    typeof name === 'string' &&
    (name.startsWith('get') || /\.get[^\.]*$/.test(name))
  ) return
  throw new Error(`invalid view name "${name}`)
}

export function useRemoteCommand(name, callbacks = {}){
  const [value, setValue] = useState(null)
  const pending = value instanceof Promise
  const call = (pending
    ? () => {
      console.trace(`already executing`, { name })
      throw new Error(`already executing name="${name}"`)
    }
    : options => {
      const promise = new Promise((resolve, reject) => {
        rpc(name, options).then(resolve, reject)
      }).then(
        result => {
          setValue(result)
          if (callbacks.onSuccess)
            callbacks.onSuccess(result)
        },
        error => {
          setValue(error)
          if (callbacks.onFailure)
            callbacks.onFailure(error)
        },
      )
      setValue(promise)
      return promise
    }
  )

  call.pending = pending
  call.failed = value instanceof Error
  call.success = !call.pending && !call.failed && !!value
  call.error = call.failed ? value : null
  call.result = call.success ? value : null
  return call
}
