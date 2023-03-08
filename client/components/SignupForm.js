import { useState } from 'react'

import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'

import Link from './Link'
import ErrorMessage from './ErrorMessage'
import { useSignup } from '../hooks/auth'

export default function SignupForm({
  onSuccess,
  onFailure,
  ...props
}){
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const signup = useSignup({
    onSuccess,
    onFailure,
  })

  const onSubmit = event => {
    event.preventDefault()
    signup.call({
      email: email || undefined,
      password: password || undefined,
    })
  }

  const disabled = !!signup.pending
  // const emailIsValid = email.length >= 3 && email.includes('@')
  // const secretKeyIsValid = PassphraseInput.isValid(secretKey)
  const submittable = !!(email ?? password)
  return <Paper {...{
    ...props,
    sx: {
      ...props.sx,
      minWidth: `min(100vw, 500px)`,
    }
  }}>
    <Typography variant="h4" mb={2}>Signup</Typography>
    <Box {...{
      component: 'form',
      onSubmit,
    }}>
      <ErrorMessage error={signup.error}/>
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
          disabled={disabled || !submittable}
          type="submit"
          variant="contained"
          size="large"
        >Signup</Button>
        <Link variant="text" to="/signup">back</Link>
      </Stack>
    </Box>

  </Paper>
}
