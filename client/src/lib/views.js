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
  const res = await fetch(url)
  if (res.status === 504 && tries < 5) {
    await wait(500)
    return fetchView(url, tries + 1)
  }
  let data, parseError
  try{
    data = await res.json()
  }catch(error){
    parseError = error
    console.error(parseError)
  }
  if (!res.ok) {
    const error = new Error('An error occurred while fetching the data.')
    error.parseError = parseError
    error.info = data
    error.status = res.status
    throw error
  }
  console.log('VIEW', url, data.value)
  return data.value
}

const wait = ms => new Promise(resolve => {
  setTimeout(() => { resolve() }, ms)
})
