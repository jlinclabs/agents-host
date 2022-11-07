import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { ErrorBoundary } from 'react-error-boundary'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import createStore from 'zustand'

import { fetchQuery, useQuery } from 'app-shared/client/hooks/cqrpc'
import AppError from 'app-shared/client/components/AppError'
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

  useNewNotificationToast()

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

function useNewNotificationToast(){
  const navigate = useNavigate()
  const [seen] = useState(new Set())
  useEffect(
    () => {
      let timeoutId;
      let requestCount = 0
      const refresh = async () => {
        const { notifications } = await fetchQuery('notifications.getAll')
        requestCount++
        console.log({ requestCount })
        const newNotifications = notifications.filter(n => !seen.has(n.id))
        if (requestCount > 1){
          newNotifications.forEach(n => {
            toast.success(`Attempt to login to ${n.host}`, {
              onClick(){
                navigate(`/login-attempts/${n.loginAttemptId}`)
              }
            })
          })
        }
        newNotifications.forEach(n => seen.add(n.id))
        console.log({ newNotifications })
        timeoutId = setTimeout(refresh, 1000)
      }
      timeoutId = setTimeout(refresh, 10)
      return () => { clearTimeout(timeoutId) }
    },
    []
  )
}