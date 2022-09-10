import { useEffect } from 'react'
import Container from '@mui/material/Container'
import Layout from '../Layout'
import ErrorMessage from '../components/ErrorMessage'
import { useCurrentAgent, useLogout } from '../resources/auth'

export default function LogoutPage() {
  const { currentAgent } = useCurrentAgent({ redirectToIfNotFound: '/' })
  const logout = useLogout()
  useEffect(() => { logout() }, [])
  return <Container maxWidth="sm" sx={{p: 2}}>
    <span>Logging out…</span>
    <ErrorMessage error={logout.error}/>
  </Container>
}
