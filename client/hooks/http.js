import React from 'react'
import useSWR from 'swr'
import useAsync from './useAsync'
import { getJSON } from '../lib/http'

export function useHttpGetJSON(url, config = {}) {
  const { data: result, error, mutate } = useSWR(url, {
    ...config,
    fetcher: getJSON,
  })
  const loading = typeof result === 'undefined' && !error
  const reload = React.useCallback(() => { mutate() }, [mutate])
  return { result, loading, error, mutate, reload }
}
