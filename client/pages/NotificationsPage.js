import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import Paper from '@mui/material/Paper'
import IconButton from '@mui/material/IconButton'
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'

import { useQuery, useCommand } from '../hooks/cqrpc'
import Link from '../components/Link'
import ErrorMessage from '../components/ErrorMessage'
import Timestamp from '../components/Timestamp'
import LoadingList from '../components/LoadingList'

export default function NotificationsPage() {
  const query = useQuery('notifications.getAll')
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
  return <LoadingList {...{
    loading,
    emptyMessage: `you dont have any notifications`,
    members: notifications && notifications.map(n => ({
      key: n.id,
      href: `/login-attempts/${n.loginAttemptId}`,
      icon: <NotificationsActiveIcon />,
      text: `Attempt to login to ${n.host}`,
      subtext: <Timestamp at={n.createdAt}/>,
    }))
  }}/>

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