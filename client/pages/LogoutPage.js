import { useEffect, useRef } from 'react'
import Container from '@mui/material/Container'
import Layout from '../Layout'
import ErrorMessage from '../components/ErrorMessage'
import { useCurrentAgent, useLogout } from '../resources/auth'


function useReactComponentUUID(){
  const uuidRef = useRef(Math.random())
  return uuidRef.current
}

function useRenderCount(){
  const renderCountRef = useRef(0)
  return renderCountRef.current++
}

export default function LogoutPage() {
  const { currentAgent } = useCurrentAgent({ redirectToIfNotFound: '/' })
  const logout = useLogout()
  const renderCount = useRenderCount()
  const debug = {
    renderUUID: useReactComponentUUID(),
    renderCount,
  }
  console.log('LogoutPage render', debug)
  useEffect(
    () => {
      const callLogout = () => {
        console.log('LOGOUT PAGE CALLING LOGOUT', { currentAgent, debug })
        logout.call()
      }
      const timeout = setTimeout(callLogout, 100)
      return () => { clearTimeout(timeout) }
    },
    []
  )
  return <Container maxWidth="sm" sx={{p: 2}}>
    <span>Logging out…</span>
    <ErrorMessage error={logout.error}/>
  </Container>
}
