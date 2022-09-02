import Container from '@mui/material/Container'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'

import { useCurrentUser } from '../resources/session'
import Link from '../components/Link'
import LoginForm from '../components/LoginForm'
import SignupForm from '../components/SignupForm'

export default function HomePage() {
  const { currentUser } = useCurrentUser()
  return <Container maxWidth="md">
    THIS IS THE HOME PAGE
  </Container>
}
