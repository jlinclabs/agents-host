import { useState } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'

import ErrorMessage from 'app-shared/client/components/ErrorMessage'
import Link from 'app-shared/client/components/Link'
import PassphraseInput from './PassphraseInput'
import { useLogin } from '../resources/auth'

export default function LoginForm(props){
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)

  const login = useLogin({
    onSuccess(){
      setError(null)
    },
    onFailure(error){
      if (`${error}`.includes('email or password is invalid')){
        setError({message: 'email or password is invalid'})
      }else{
        setError(error)
      }
      // console.error(error)
      // debugger
    }
  })

  const onSubmit = event => {
    event.preventDefault()
    setError(null)
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
      <ErrorMessage error={error}/>
      <TextField
        autoFocus
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
