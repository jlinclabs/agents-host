import { useRef, useEffect } from 'react'
import { Routes, Route, useNavigate, useParams } from 'react-router-dom'

import Container from '@mui/material/Container'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'

import RedirectPage from './RedirectPage'
import { useSignup } from '../resources/session'
import ErrorMessage from '../components/ErrorMessage'
import Link from '../components/Link'
import LoginForm from '../components/LoginForm'
import SignupForm, { generateSecretKey } from '../components/SignupForm'

export default function AuthPage({ loading, error }) {
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
      {
        error ? <ErrorMessage {...{error}}/> :
        loading ? <CircularProgress/> :
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signup/password" element={<SignupWithPassword />} />
          <Route path="/signup/wallet" element={<SignupWithWallet />} />
          <Route path="/logout" element={<RedirectPage to="/" />} />
          <Route path="*" element={<Main />} />
        </Routes>
      }
    </Container>
  </Container>
}

function Main(){
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
  return <Paper>
    <LoginForm sx={{p:2}}/>
  </Paper>
}

function Signup(){
  const navigate = useNavigate()
  const signup = useSignup({
    onSuccess(){
      navigate('/')
    },
  })
  const justTryIt = () => {
    signup({
      secretKey: generateSecretKey()
    })
  }
  return <Box>
    <Typography variant="h4" mb={3}>Signup</Typography>
    <Stack spacing={2}>
      <Button
        variant="contained"
        onClick={justTryIt}
        disabled={signup.pending}
      >Just Try It!</Button>
      <Button
        variant="contained"
        to="/signup/password"
        component={Link}
      >Email & Password</Button>
      <Button
        variant="contained"
        to="/signup/wallet"
        component={Link}
      >Crypto Wallet</Button>
      <Button
        variant="text"
        to="/"
        component={Link}
        size="small"
      >back</Button>
    </Stack>
  </Box>
}

function SignupWithPassword(){
  const navigate = useNavigate()
  return <SignupForm
    sx={{p:2}}
    onSuccess={() => {
      navigate('/')
    }}
  />
}

function SignupWithWallet(){
  return <Box>
    <Typography variant="h4" mb={3}>Signup with crypto wallet</Typography>
    <Typography variant="body1" mb={3}>coming soon…</Typography>
    <Link variant="text" to="/signup">back</Link>
  </Box>
}

function ForgotPassword(){
  return <div>forgot password form TBD</div>
}

