import { useState } from 'react'
import { useParams } from 'react-router-dom'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import Button from '@mui/material/Button'

import { useQuery, useCommand } from '../hooks/cqrpc'
import useCountdown from '../hooks/useCountdown'

import Link from '../components/Link'
import ButtonRow from '../components/ButtonRow'
import ErrorMessage from '../components/ErrorMessage'
import Timestamp from '../components/Timestamp'

export default function LoginAttemptPage() {
  const { id } = useParams()
  const query = useQuery('loginAttempts.getById', { id })
  return <Container sx={{p: 2}} maxWidth="sm">
    <Paper elevation={2} sx={{p: 2}}>
      <Typography variant="h4" mb={2}>Login Attempt</Typography>
      {query.loading && <CircularProgress />}
      <ErrorMessage error={query.error} />
      {query.result && <LoginAttempt {...{
        ...query.result,
        key: query.result.id,
        reload: query.reload,
      }}/>}
    </Paper>
  </Container>
}


function LoginAttempt({
  id, createdAt, host, accepted, resolved, reload
}){
  const url = `https://${host}`
  return <Box>
    <Stack spacing={1}>
      <div>{`An attempt to login to `}</div>
      <Link to={url}>{url}</Link>
      <div>{` was requested at `}</div>
      <Timestamp at={createdAt}/>
      {resolved
        ? <div>{`and was ${accepted ? 'accepted' : 'rejected'} by you`}</div>
        : <Controls {...{ id, reload }} />
      }
    </Stack>
  </Box>
}



function Controls({ id, reload }) {
  const secondsUntilUnlocked = useCountdown(3000)
  const resolveCmd = useCommand('loginAttempts.resolve', {
    onSuccess(){
      reload()
    }
  })
  const disabled = secondsUntilUnlocked > 0 || resolveCmd.pending

  const makeHandler = accepted =>
    () => { resolveCmd.call({id, accepted}) }

  return <Box>
    <ErrorMessage error={resolveCmd.error} />
    <ButtonRow>
      <Button
        disabled={disabled}
        variant="contained"
        onClick={makeHandler(true)}
      >{secondsUntilUnlocked > 0
        ? `wait ${secondsUntilUnlocked}`
        : 'Accept'
      }</Button>
      <Button
        disabled={disabled}
        variant="text"
        onClick={makeHandler(false)}
      >Reject</Button>
    </ButtonRow>
  </Box>
}
