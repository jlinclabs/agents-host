import { useEffect } from 'react'
import Container from '@mui/material/Container'
import Layout from '../Layout'
import ErrorMessage from '../components/ErrorMessage'
import { useCurrentAgent, useLogout } from '../resources/auth'

export default function SettingsPage({ currentUser }) {
  return <Container maxWidth="sm" sx={{p: 2}}>
    <span>SettingsPage</span>
  </Container>
}
