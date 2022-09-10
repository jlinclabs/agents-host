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
  const [secretKey, setSecretKey] = useState('')

  const login = useLogin()

  const onSubmit = event => {
    event.preventDefault()
    login({ secretKey })
  }

  const submitOnEnter = event => {
    if (event.key === 'Enter') onSubmit(event)
  }
  const secretKeyIsValid = PassphraseInput.isValid(secretKey)
  const submittable = secretKeyIsValid

  const disabled = !!login.pending
  return <Box {...props}>
    <Typography variant="h4">Login</Typography>
    <Box {...{
      component: 'form',
      onSubmit,
    }}>
      <ErrorMessage error={login.error}/>
      <PassphraseInput
        disabled={disabled}
        value={secretKey}
        onChange={e => { setSecretKey(e.target.value) }}
        autoFocus
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
