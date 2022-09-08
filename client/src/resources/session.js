
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAction } from '../lib/actions'
import { useView, useReloadView } from '../lib/views'

function logCurrentAgentIfChanged(agent){
  if (logCurrentAgentIfChanged.last === agent) return
  logCurrentAgentIfChanged.last = agent
  console.log(`currentAgent => ${JSON.stringify(agent)}`)
}
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

  useEffect(
    () => {
      logCurrentAgentIfChanged(currentAgent)
    },
    [currentAgent]
  )

  const reload = () => { mutate() }
  return { currentAgent, loading, error, mutate, reload }
}

export function useReloadCurrentAgent(){
  return useReloadView('session.currentAgent')
}

function useActionAndReloadCurrentAgent(action, callbacks = {}){
  const reloadCurrentAgent = useReloadCurrentAgent()
  return useAction(action, {
    ...callbacks,
    onSuccess(currentAgent){
      reloadCurrentAgent(currentAgent)
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
