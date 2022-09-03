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
  const [secretKey, setSecretKey] = useState('')
  const [email, setEmail] = useState('')

  const signup = useSignup({
    onSuccess: props.onSuccess,
    onFailure: props.onFailure,
  })

  const copySecretKey = () => {
    navigator.clipboard.writeText(secretKey)
  }

  const onGenerateSecretKey = () => {
    setSecretKey(generateSecretKey())
  }

  const onSubmit = event => {
    event.preventDefault()
    signup({
      email: email || undefined,
      secretKey: secretKey || undefined,
    })
  }

  const disabled = !!signup.pending
  // const emailIsValid = email.length >= 3 && email.includes('@')
  const secretKeyIsValid = PassphraseInput.isValid(secretKey)
  const submittable = secretKeyIsValid
  return <Paper {...{
    ...props,
    sx: {
      ...props.sx,
      minWidth: `min(100vw, 500px)`,
    }
  }}>
    <Typography variant="h4" mb={2}>Signup with passphrase</Typography>
    <Typography variant="body2" mb={2}>
      {`
        Signing up with a passphrase
      `}
    </Typography>
    <Box {...{
      component: 'form',
      onSubmit,
    }}>
      <ErrorMessage error={signup.error}/>
      <PassphraseInput
        disabled={disabled}
        value={secretKey}
        onChange={e => { setSecretKey(e.target.value) }}
        helperText="must be at least 128 characters"
      />
      <Stack spacing={2} direction="row-reverse" alignItems="center" mt={2}>
        <Button size="small" variant="outlined" onClick={copySecretKey}>
          <ContentCopyIcon/>&nbsp;COPY
        </Button>
        <Button size="small" variant="outlined" onClick={onGenerateSecretKey}>
          <AutorenewIcon/>&nbsp;REGENERATE
        </Button>
      </Stack>

      <TextField
        label="email (for recovery)"
        autoComplete="email"
        disabled={disabled}
        margin="normal"
        fullWidth
        name="email"
        type="email"
        value={email}
        onChange={e => { setEmail(e.target.value) }}
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
