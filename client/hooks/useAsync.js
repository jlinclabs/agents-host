import * as React from 'react'
import { useRef, useMemo, useCallback, useEffect } from 'react'
import useForceUpdate from './useForceUpdate'

const STATES = ['idle', 'pending', 'resolved', 'rejected']
export default function useAsync(asyncFunction, config = {}){
  const { callOnMount, onSuccess, onFailure, onComplete } = config
  const callbacks = useRef()
  Object.assign(callbacks, { onSuccess, onFailure, onComplete })
  const forceUpdate = useForceUpdate()
  const ctx = useMemo(() => ({}), [asyncFunction, callOnMount])

  ctx.call = useCallback(
    (...args) => {
      if (ctx.promise) throw new Error(`already executing`)
      const setState = state => {
        ctx.state = STATES[state]
        STATES.forEach((name, index) => {
          ctx[name] = index === state
        })
        forceUpdate()
      }
      ctx.promise = new Promise((resolve, reject) => {
        asyncFunction(...args).then(resolve, reject)
      }).then(
        async result => {
          delete ctx.promise
          ctx.result = result
          setState(2)
          if (callbacks.onSuccess) await callbacks.onSuccess(result)
          return result
        },
        async error => {
          delete ctx.promise
          ctx.error = error
          if (callbacks.onFailure) await callbacks.onFailure(error)
          setState(3)
          return error
        },
      ).then(async result => {
        if (callbacks.onComplete) await callbacks.onComplete(result)
      })
      setState(1)
      return ctx.promise
    },
    [ctx]
  )

  useEffect(
    () => { if (callOnMount && ctx.idle) ctx.call() },
    [ctx]
  )

  return ctx
}
