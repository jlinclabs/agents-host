import { useState } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'

import Link from './Link'
import ErrorMessage from './ErrorMessage'
import PassphraseInput from './PassphraseInput'
import { useLogin } from '../resources/auth'

export default function LoginForm(props){
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const login = useLogin()

  const onSubmit = event => {
    event.preventDefault()
    login.call({ email, password })
  }

  const submitOnEnter = event => {
    if (event.key === 'Enter') onSubmit(event)
  }
  const submittable = (email && password)

  const disabled = !!login.pending
  return <Box {...props}>
    <Typography variant="h4">Login</Typography>
    <Box {...{
      component: 'form',
      onSubmit,
    }}>
      <ErrorMessage error={login.error}/>
      <TextField
        label="email"
        autoComplete="email"
        disabled={disabled}
        margin="normal"
        fullWidth
        name="email"
        type="email"
        value={email}
        onChange={e => { setEmail(e.target.value) }}
      />
      <TextField
        label="password"
        autoComplete="email"
        disabled={disabled}
        margin="normal"
        fullWidth
        name="password"
        type="password"
        value={password}
        onChange={e => { setPassword(e.target.value) }}
      />

      <Stack spacing={2} direction="row-reverse" alignItems="center" mt={2}>
        <Button
          type="submit"
          variant="contained"
          disabled={disabled || !submittable}
        >Login</Button>
        <Button
          variant="outlined"
          to="/forgot-password"
          component={Link}
        >Forgot Password</Button>
        <Link variant="text" to="/">back</Link>
      </Stack>
    </Box>
  </Box>
}
