import Container from '@mui/material/Container'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'

import { useCurrentAgent } from '../resources/session'
import Link from '../components/Link'
import LoginForm from '../components/LoginForm'
import SignupForm from '../components/SignupForm'

export default function HomePage() {
  const { currentAgent } = useCurrentAgent()
  return <Container maxWidth="md">
    THIS IS THE HOME PAGE
  </Container>
}
