import { useState } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'

import Link from './Link'
import ErrorMessage from './ErrorMessage'
import { useLogin } from '../resources/session'

export default function LoginForm(props){
  const [email, setEmail] = useState('')

  const login = useLogin()

  const onSubmit = event => {
    event.preventDefault()
    login({ email })
  }

  const submitOnEnter = event => {
    if (event.key === 'Enter') {
      event.preventDefault()
      login({ email })
    }
  }
  const disabled = !!login.pending
  return <Box {...props}>
    <Typography variant="h4">Login</Typography>
    <Box {...{
      component: 'form',
      onSubmit,
    }}>
      <ErrorMessage error={login.error}/>
      <TextField
        label="passphrase"
        autoComplete="password"
        disabled={disabled}
        margin="normal"
        fullWidth
        name="password"
        type="password"
        value={email}
        onChange={e => { setEmail(e.target.value) }}
      />
      <Stack spacing={2} direction="row-reverse" alignItems="center" mt={2}>
        <Button type="submit" variant="contained" >Login</Button>
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
