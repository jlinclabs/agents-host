import { useState } from 'react'

import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Divider from '@mui/material/Divider'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import AutorenewIcon from '@mui/icons-material/Autorenew'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'

import Link from './Link'
import ErrorMessage from './ErrorMessage'
import PassphraseInput from './PassphraseInput'
import randomString from '../lib/randomString'
import { useSignup } from '../resources/session'

export default function SignupForm(props){
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const signup = useSignup({
    onSuccess: props.onSuccess,
    onFailure: props.onFailure,
  })

  const onSubmit = event => {
    event.preventDefault()
    signup({
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

export function generateSecretKey(){
  return randomString(128)
}
