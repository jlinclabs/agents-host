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
import IconButton from '@mui/material/IconButton'
import Button from '@mui/material/Button'
import SupportAgentIcon from '@mui/icons-material/SupportAgent'
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

import { useQuery, useCommand } from 'app-shared/client/hooks/cqrpc'
import Link from 'app-shared/client/components/Link'
import ErrorMessage from 'app-shared/client/components/ErrorMessage'
import Timestamp from 'app-shared/client/components/Timestamp'
import InspectObject from 'app-shared/client/components/InspectObject'

export default function NotificationsPage() {
  const query = useQuery('notifications.all')
  const deleteAllCmd = useCommand('notifications.deleteAll', {
    onSuccess(){ query.reload() }
  })
  console.log({ deleteAllCmd})
  return <Container sx={{p: 2}} maxWidth="sm">
    <Stack direction="row" justifyContent="space-between">
      <Typography variant="h4">Notifications</Typography>
      <IconButton onClick={() => { deleteAllCmd.call() }}>
        <DeleteForeverIcon/>
      </IconButton>
    </Stack>
    <Paper elevation={2}>
      <ErrorMessage error={query.error} />
      <NotificationsList {...{
        loading: query.loading,
        ...query.result,
      }}/>
    </Paper>
  </Container>
}


function NotificationsList({ loading, notifications }){
  console.log({ notifications })
  const members = notifications
    ? notifications.length === 0
      ? <Typography sx={{
        textAlign: 'center',
        fontStyle: 'italic',
      }}>you dont have any notifications</Typography>
      : notifications.map(n =>
        <ListItem key={n.id} disablePadding>
          <ListItemButton
            component={Link}
            to={`/login-attempts/${n.loginAttemptId}`}
          >
            <ListItemIcon>
              <NotificationsActiveIcon />
            </ListItemIcon>
            <ListItemText
              primary={`Attempt to login to ${n.host}`}
              secondary={<Timestamp at={n.createdAt}/>}
            />
          </ListItemButton>
        </ListItem>
      )
    : Array(6).fill().map((_, i) =>
      <Skeleton key={i} variant="rounded" width="auto" height={118} />
    )
  return <List>{members}</List>
}