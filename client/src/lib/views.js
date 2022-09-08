import { useCallback } from 'react'
import useSWR, { useSWRConfig } from 'swr'

const viewIdToSwrKey = viewId => viewId ? `/api/views/${viewId}` : undefined

global.getView = viewId => fetchView(viewIdToSwrKey(viewId))

export function useView(viewId){
  const swrKey = viewIdToSwrKey(viewId)
  const { data: view, error, mutate } = useSWR(swrKey, fetchView)
  const loading = typeof view === 'undefined' && !error
  const reload = useCallback(() => { mutate(swrKey) }, [swrKey, mutate])
  return { view, loading, error, mutate, reload }
}

export function useReloadView(viewId){
  const swrKey = viewIdToSwrKey(viewId)
  const { mutate } = useSWRConfig()
  return useCallback(
    (value, options) => { mutate(swrKey, value, options) },
    [swrKey, mutate]
  )
}

async function fetchView(url, tries = 0){
  console.log('VIEW ->', url)
  const res = await fetch(url)
  if (res.status === 504 && tries < 5) {
    await wait(500)
    return fetchView(url, tries + 1)
  }
  let error, value
  try{
    ({ error, value } = await res.json())
  }catch(e){
    error = e
  }

  if (!res.ok || error) {
    const _error = new Error(
      `An error occurred while fetching the data. ` +
      // TODO if development
      (error && `\n${error.message}\n${error.stack}`)
    )
    _error.error = error
    // _error.info = data
    _error.status = res.status
    console.error('VIEW ERROR', url, { error, status: res.status })
    throw _error
  }
  console.log('VIEW <-', url, value)
  return value
}

const wait = ms => new Promise(resolve => {
  setTimeout(() => { resolve() }, ms)
})
