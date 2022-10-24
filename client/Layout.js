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

import LogoutButton from 'app-shared/client/components/LogoutButton'
// import { useCurrentAgent } from './resources/auth'
import Link from './components/Link'
import AppError from './components/AppError'
import SideNav from './components/SideNav'

export default function Layout(props) {
  const {
    children,
    currentUser,
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
        <SideNav {...{ currentUser }}/>
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

