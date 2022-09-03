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
import { useSignup } from '../resources/session'

export default function SignupForm(props){
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')

  const signup = useSignup()

  const copyPassword = () => {
    navigator.clipboard.writeText(password)
  }

  const generatePassword = () => {
    setPassword(randomString(128))
  }

  const onSubmit = event => {
    event.preventDefault()
    signup({ email })
  }

  const disabled = !!signup.pending
  // const emailIsValid = email.length >= 3 && email.includes('@')
  const passwordIsValid = password.length >= 128
  const submittable = passwordIsValid
  return <Paper {...{
    ...props,
    sx: {
      ...props.sx,
      minWidth: `min(100vw, 500px)`,
    }
  }}>
    <Typography variant="h4" mb={3}>Signup</Typography>
    <Box {...{
      component: 'form',
      onSubmit,
    }}>
      <ErrorMessage error={signup.error}/>
      <TextField
        InputProps={{
          sx: {
            whiteSpace: 'pre-wrap',
            fontSize: 'smaller',
            fontFamily: 'monospace',
          }
        }}
        label="passphrase"
        autoComplete="password"
        helperText="Must be at least 128 characters"
        minLength="128"
        disabled={disabled}
        margin="normal"
        fullWidth
        name="password"
        type="password"
        value={password}
        multiline
        rows={3}
        onChange={e => { setPassword(e.target.value) }}
      />

      <Stack spacing={2} direction="row-reverse" alignItems="center" mt={2}>
        <Button size="small" variant="outlined" onClick={copyPassword}>
          <ContentCopyIcon/>&nbsp;COPY
        </Button>
        <Button size="small" variant="outlined" onClick={generatePassword}>
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



function randomString(length){
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*'
  const charLength = chars.length

  let ints = new Uint32Array(length)
  crypto.getRandomValues(ints)
  ints = [...ints]

  let result = ''
  while(ints.length > 0){
    result += chars.charAt(ints.shift() % charLength)
  }
  return result
}
