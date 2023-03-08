// Command. Query. Remote. Procedure. Call
import { useCallback } from 'react'
import useSWR from 'swr'
import useAsync from './useAsync'
import { fetchJSON } from '../lib/http'

const ENDPOINT = '/api/v1'

async function fetchJSONAndParse(method, url, body){
  const { result, error } = await fetchJSON(method, url, body)
  if (error) {
    const e = new Error(error.message)
    e.stack = error.stack
    throw e
  }
  return result || null
}

export function fetchQueryURL(name, options = {}){
  const json = JSON.stringify(options)
  const params = json === '{}' ? '' :
    '?' + new URLSearchParams({ o: json })
  return `${ENDPOINT}/${name}${params}`
}

async function _logWrapper(label, color, name, options, worker){
  try {
    const result = await worker()
    console.log(
      `%c${label} Success %c${name}`,
      `color: ${color};`,
      '',
      options,
      result
    )
    return result
  }catch(error){
    console.error(`${label} Failed`, name, options)
    console.error(error)
    throw error
  }
}

export async function fetchQuery([name, options = {}]){
  if (!/(^|\.)get/.test(name)) throw new Error(`invalid query name ${name}`)
  return _logWrapper('Query', 'green', name, options, async () =>
    await fetchJSONAndParse('GET', fetchQueryURL(name, options))
  )
}

export async function fetchCommand(name, options){
  return _logWrapper('Command', 'aqua', name, options, async () =>
    await fetchJSONAndParse('POST', fetchQueryURL(name), options)
  )
}

global.cqrpc = {
  get: (name, options) => fetchQuery([name, options]),
  do: fetchCommand,
}

export function useQuery(name, options = {}, config){
  const swrKey = name ? [name, options] : null
  const { data: result, error, mutate } = useSWR(swrKey, {
    ...config,
    fetcher: fetchQuery,
  })
  const loading = typeof result === 'undefined' && !error
  const reload = useCallback(() => mutate(), [mutate])
  const notFound = !loading && !error && (result === undefined || result === null)
  return { loading, error, result, notFound, mutate, reload }
}

export function useCommand(name, config){
  const cmd = useAsync(
    useCallback(
      options => fetchCommand(name, options),
      [name]
    ),
    config
  )
  cmd.commandName = name
  return cmd
}
