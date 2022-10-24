import { useEffect } from 'react'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Alert from '@mui/material/Alert'
import CircularProgress from '@mui/material/CircularProgress'

import { useQuery, useCommand } from 'app-shared/client/hooks/cqrpc'
import { useStateObject } from '../lib/reactStateHelpers.js'
import Link from 'app-shared/client/components/Link'
import ButtonRow from 'app-shared/client/components/ButtonRow'
import Form from 'app-shared/client/components/Form'
import ErrorMessage from '../components/ErrorMessage'
import InspectObject from '../components/InspectObject'

export default function ProfilePage() {
  const { result: profile, loading, error, mutate } = useQuery(`profile.get`)
  return <Container sx={{p: 2}}>
    <Typography variant="h3">ProfilePage</Typography>
    <ProfileForm {...{
      profile,
      loading,
      loadingError: error,
      mutate,
    }}/>
    <InspectObject object={{ profile, loading, error }}/>
  </Container>
}

function ProfileForm({ profile, loading, loadingError, mutate }){
  const [changes, setChanges] = useStateObject({})
  const updateProfile = useCommand('profile.update', {
    onSuccess(profile){
      setChanges(undefined)
      mutate(profile)
    }
  })
  const merged = {...profile, ...changes}
  const disabled = !!(loading || updateProfile.pending)
  const submittable = true
  return <Form {...{
    disabled,
    onSubmit(){
      updateProfile.call(changes)
    },
  }}>
    <ErrorMessage error={loadingError || updateProfile.error}/>
    <TextField
      autoFocus
      label="Public Display Name"
      autoComplete="name"
      disabled={disabled}
      margin="normal"
      fullWidth
      name="name"
      type="text"
      value={merged.publicDisplayName || ''}
      onChange={e => { setChanges({ publicDisplayName: e.target.value || null }) }}
    />
    <ButtonRow>
      <Button
        type="submit"
        variant="contained"
        disabled={disabled || !submittable}
      >Update Profile</Button>
      <Button
        variant="text"
        disabled={disabled}
      >reset</Button>
    </ButtonRow>
  </Form>
}