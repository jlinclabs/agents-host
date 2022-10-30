import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { Observable } from 'rxjs'
import { useEffect } from 'react'
import createState from 'zustand'

import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Skeleton from '@mui/material/Skeleton'
import CircularProgress from '@mui/material/CircularProgress'
import Button from '@mui/material/Button'
import SupportAgentIcon from '@mui/icons-material/SupportAgent'
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';

import { useQuery, useCommand } from 'app-shared/client/hooks/cqrpc'
import useToggle from 'app-shared/client/hooks/useToggle'

import Link from 'app-shared/client/components/Link'
import ButtonRow from 'app-shared/client/components/ButtonRow'
import ErrorMessage from 'app-shared/client/components/ErrorMessage'
import Timestamp from 'app-shared/client/components/Timestamp'
import InspectObject from 'app-shared/client/components/InspectObject'

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
  const [unlocked, unlock] = useToggle()
  const resolveCmd = useCommand('loginAttempts.resolve', {
    onSuccess(){
      reload()
    }
  })
  const disabled = !unlocked || resolveCmd.pending
  useEffect( // TODO make useDelayedEffect hook
    () => {
      const id = setTimeout(unlock, 2000)
      return () => clearTimeout(id)
    },
    []
  )
  const makeHandler = accepted =>
    () => { resolveCmd.call({id, accepted}) }

  return <Box>
    <ErrorMessage error={resolveCmd.error} />
    <ButtonRow>
      <Button
        disabled={disabled}
        variant="contained"
        onClick={makeHandler(true)}
      >Accept</Button>
      <Button
        disabled={disabled}
        variant="text"
        onClick={makeHandler(false)}
      >Reject</Button>
    </ButtonRow>
  </Box>
}
