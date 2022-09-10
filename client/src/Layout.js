import * as React from 'react'
import { useLocation } from 'react-router-dom'
import { useMemo } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import List from '@mui/material/List'
import Divider from '@mui/material/Divider'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Skeleton from '@mui/material/Skeleton'
import PersonIcon from '@mui/icons-material/Person'
import AccountBoxOutlinedIcon from '@mui/icons-material/AccountBoxOutlined'
import ContactPageIcon from '@mui/icons-material/ContactPage'
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined'
import FingerprintIcon from '@mui/icons-material/Fingerprint'
import DriveFileMoveIcon from '@mui/icons-material/DriveFileMove'
import HomeIcon from '@mui/icons-material/Home'
import LockIcon from '@mui/icons-material/Lock'
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn'

import { useCurrentAgent } from './resources/auth'
import Link from './components/Link'
import AppError from './components/AppError'

export default function Layout(props) {
  const {
    children,
    currentAgent,
    // title = 'JLINX Demo',
    // description = 'JLINX Demo',
    // favicon = '/favicon.ico',
    requireNotLoggedIn = false,
    requireLoggedIn = false,
  } = props
  const location = useLocation()

  return (
    <Container maxWidth={false} disableGutters>
        {/* <Head>
          <title>{title}</title>
          <meta name="description" content={description} />
          <link rel="icon" href={favicon} />
        </Head> */}
      <Box sx={{
        display: 'flex',
        flexDirection: 'row',
        minHeight: '100vh',
        minWidth: '100vw',
      }}>
        <SideNav {...{ currentAgent }}/>
        <Box sx={{
          flex: '1 1'
        }}>
          <ErrorBoundary
            key={location.pathname}
            FallbackComponent={AppError}
          >
            {children}
          </ErrorBoundary>
        </Box>
      </Box>
    </Container>
  )
}


function SideNav({ loading, currentAgent }) {
  const navButtons = (
    loading ? (
      Array(3).fill().map((_, i) =>
        <Skeleton key={i} animation="wave" height="100px" />
      )
    ) :
    currentAgent ? <>
      {/* <NavButton {...{
        icon: <AccountBoxOutlinedIcon/>,
        text: 'Identifiers',
        to: '/identifiers',
      }}/>
      <NavButton {...{
        icon: <PersonIcon/>,
        text: 'Profiles',
        to: '/profiles',
      }}/>
      <NavButton {...{
        icon: <ArticleOutlinedIcon/>,
        text: 'Contracts',
        to: '/contracts',
      }}/> */}
      <NavButton {...{
        icon: <FingerprintIcon/>,
        text: 'DIDs',
        to: '/dids',
      }}/>
      <NavButton {...{
        icon: <ContactPageIcon/>,
        text: 'Contacts',
        to: '/contacts',
      }}/>
      <NavButton {...{
        icon: <AssignmentTurnedInIcon/>,
        text: 'Agreements',
        to: '/agreements',
      }}/>
      <NavButton {...{
        icon: <DriveFileMoveIcon/>,
        text: 'Data Sharing',
        to: '/data-sharing',
      }}/>
      <Box sx={{ flex: '1 1'}}/>
      <Divider />
      <NavButton {...{
        icon: <LockIcon/>,
        text: 'Vault',
        to: '/vault',
      }}/>
      <ListItem disablePadding>
        <ListItemButton component={Link} to="/settings">
          <ListItemText {...{
            primary: (
              <ShortDid did={currentAgent.did}/>
            ),
            primaryTypographyProps: {
              sx: {
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }
            }
          }}/>
        </ListItemButton>
      </ListItem>
      <NavButton {...{
        icon: <LogoutOutlinedIcon/>,
        text: 'Logout',
        to: '/logout',
      }}/>
    </> :
    <>
      <NavButton {...{
        icon: <HomeIcon/>,
        text: 'Home',
        to: '/',
      }}/>
    </>
  )
  return <Box sx={{
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'primary.dark',
    minWidth: `max(10vw, 175px)`,
    maxWidth: `max(20vw, 400px)`,
    overflowX: 'auto',
  }}>
    <Typography
      variant="h7"
      component="div"
      sx={{
        position: 'absolute',
        top: '10px',
        left:  '0px',
        color: 'orange',
        textShadow: '0 0 4px black',
        transform: 'rotate(320deg)',
      }}
    >
      {'ALPHA'}
    </Typography>

    <Link
      underline="none"
      variant="h6"
      to="/"
      sx={{
        mt: 3,
        mb: 1,
        textAlign: 'center',
        // color: 'primary.light',
        color: 'inherit',
        // textShadow: '0 0 4px black',
        // color: 'black',
      }}
    >
      JLINX Agent
    </Link>

    <List sx={{
      display: 'flex',
      flexDirection: 'column',
      flex: '1 1',
      padding: '0',
    }}>{navButtons}</List>
  </Box>
}

function NavButton({ text, to, icon }){
  return <ListItem key={text} disablePadding>
    <ListItemButton component={Link} to={to}>
      <ListItemIcon sx={{minWidth: '30px'}}>
        {icon}
      </ListItemIcon>
      <ListItemText primary={text} />
    </ListItemButton>
  </ListItem>
}

function ShortDid({ did }){
  const shortDid = useMemo(
    () => `${did.slice(0, 10)}…${did.slice(-6)}`,
    [did]
  )
  console.log({ did, shortDid })
  return <Box sx={{
    maxWidth: '140px',
    textOverflow: 'ellipsis',
    overflow: 'scroll',
  }}>{shortDid}</Box>
}
