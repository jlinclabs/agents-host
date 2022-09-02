import { useLayoutEffect } from 'react'
import { Routes, Route, useNavigate, useParams } from 'react-router-dom'

import Container from '@mui/material/Container'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'

import { useCurrentUser } from '../resources/session'
import Link from '../components/Link'
import LoginForm from '../components/LoginForm'
import SignupForm from '../components/SignupForm'

export default function AuthPage() {
  return <Container
    sx={{
      minHeight: '100vh',
      width: '100vw',
      display: 'flex',
    }}
  >
    <Container
      maxWidth="sm"
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/logout" element={<Logout />} />
      </Routes>
    </Container>
  </Container>
}

function Index(){
  return <Stack>
    <Button
      variant="contained"
      to="/login"
      component={Link}
    >Login</Button>
    <Divider sx={{my: 3}}>OR</Divider>
    <Button
      variant="contained"
      to="/signup"
      component={Link}
    >Signup</Button>
  </Stack>
}

function Login(){
  return <LoginForm sx={{p:2}}/>
}

function Signup(){
  return <SignupForm sx={{p:2}}/>
}

function Logout(){
  const navigate = useNavigate()
  useLayoutEffect(() => { navigate(`/`) }, [])
  return null
}
