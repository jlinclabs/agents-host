
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAction } from '../lib/actions'
import { useView, useReloadView } from '../lib/views'

export function useCurrentAgent({
  redirectToIfFound,
  redirectToIfNotFound,
} = {}) {
  const navigate = useNavigate()
  const { view: currentAgent, loading, error, mutate } = useView('session.currentAgent')

  useEffect(
    () => {
      if (loading) return
      if (redirectToIfFound && currentAgent){
        navigate(redirectToIfFound)
      }else if (redirectToIfNotFound && !currentAgent){
        navigate(redirectToIfNotFound)
      }
    },
    [
      navigate,
      loading,
      currentAgent,
      redirectToIfFound,
      redirectToIfNotFound
    ]
  )
  const reload = () => { mutate() }
  console.log('useCurrentAgent', { currentAgent })
  return { currentAgent, loading, error, mutate, reload }
}

export function useReloadCurrentAgent(){
  return useReloadView('session.currentAgent')
}

function useActionAndReloadCurrentAgent(action, callbacks = {}){
  const reloadCurrentAgent = useReloadCurrentAgent()
  return useAction(action, {
    ...callbacks,
    onSuccess(result){
      reloadCurrentAgent()
      if (callbacks.onSuccess) callbacks.onSuccess(result)
    },
  })
}
export const useLogin = callbacks =>
  useActionAndReloadCurrentAgent('session.login', callbacks)

export const useLogout = callbacks =>
  useActionAndReloadCurrentAgent('session.logout', callbacks)

export const useSignup = callbacks =>
  useActionAndReloadCurrentAgent('session.signup', callbacks)
