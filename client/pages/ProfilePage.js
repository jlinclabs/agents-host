import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import CircularProgress from '@mui/material/CircularProgress'

import { useQuery, useCommand } from '../hooks/cqrpc'
import useStateObject from '../hooks/useStateObject.js'

import ButtonRow from '../components/ButtonRow'
import Form from '../components/Form'
import AvatarInput from '../components/AvatarInput'
import ErrorMessage from '../components/ErrorMessage'

export default function ProfilePage() {
  const { result: profile, loading, error, mutate } = useQuery(`profile.get`)
  return <Container sx={{p: 2}}>
    <Typography variant="h4">Public Profile</Typography>
    {loading
      ? <CircularProgress/>
      : <ProfileForm {...{
        profile,
        loading,
        loadingError: error,
        mutate,
      }}/>
    }
  </Container>
}

function ProfileForm({ profile, loading, loadingError, mutate }){
  const [changes, setChanges] = useStateObject({})
  const reset = () => { setChanges(undefined) }
  const updateProfile = useCommand('profile.update', {
    onSuccess(profile){
      reset()
      mutate(profile)
    }
  })
  const merged = {...profile, ...changes}
  const disabled = !!(loading || updateProfile.pending)
  const submittable = changes && (
    merged.avatar !== profile.avatar ||
    merged.displayName !== profile.displayName
  )
  return <Form {...{
    maxWidth: 'sm',
    disabled,
    onSubmit(){
      updateProfile.call(changes)
    },
  }}>
    <ErrorMessage error={loadingError || updateProfile.error}/>
    <Stack direction="row" spacing={2} alignItems="center" sx={{my: 2}}>
      <AvatarInput {...{
        disabled,
        value: merged.avatar,
        onChange(avatar){ setChanges({ avatar }) }
      }}/>
      <TextField
        autoFocus
        label="Public Display Name"
        autoComplete="name"
        disabled={disabled}
        margin="normal"
        fullWidth
        name="name"
        type="text"
        value={merged.displayName || ''}
        onChange={e => { setChanges({ displayName: e.target.value || null }) }}
      />
    </Stack>
    <ButtonRow>
      <Button
        type="submit"
        variant="contained"
        disabled={disabled || !submittable}
      >Update Profile</Button>
      <Button
        variant="text"
        disabled={disabled}
        onClick={reset}
      >reset</Button>
    </ButtonRow>
  </Form>
}