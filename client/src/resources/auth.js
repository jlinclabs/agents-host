
import { useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { useViewerConnection } from '@self.id/react'
import { useRemoteQuery, useRemoteCommand } from '../lib/rpc'
import randomString from '../lib/randomString'

export function generatePassword(){
  return randomString(128)
}

function useEthereumConnection(){
  const [connection, connect, disconnect] = useViewerConnection()
  console.log('ethereum', connection)
  return [connection, connect, disconnect]
}

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
  const { view: currentAgent, loading, error, mutate } = useRemoteQuery('auth.getCurrentAgent')

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

function useRemoteCommandAndReloadCurrentAgent(action, callbacks = {}){
  // const reloadCurrentAgent = useReloadCurrentAgent()
  const { mutate } = useCurrentAgent()
  return useRemoteCommand(action, {
    ...callbacks,
    onSuccess(currentAgent){
      mutate(currentAgent)
      if (callbacks.onSuccess) callbacks.onSuccess(currentAgent)
    },
  })
}

export const useLogin = callbacks =>
  useRemoteCommandAndReloadCurrentAgent('auth.login', callbacks)

export const useLogout = callbacks =>
  useRemoteCommandAndReloadCurrentAgent('auth.logout', callbacks)

export const useSignup = callbacks =>
  useRemoteCommandAndReloadCurrentAgent('auth.signup', callbacks)

