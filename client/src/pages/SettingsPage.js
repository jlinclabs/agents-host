import { useEffect } from 'react'
import Container from '@mui/material/Container'
import Layout from '../Layout'
import ErrorMessage from '../components/ErrorMessage'
import { useCurrentUser, useLogout } from '../resources/session'

export default function SettingsPage() {
  const { currentUser } = useCurrentUser({ redirectToIfNotFound: '/' })
  return <Container maxWidth="sm" sx={{p: 2}}>
    <span>SettingsPage</span>
  </Container>
}
