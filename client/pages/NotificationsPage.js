import { Observable } from 'rxjs'
import { useEffect } from 'react'

import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import SupportAgentIcon from '@mui/icons-material/SupportAgent'

import Link from 'app-shared/client/components/Link'
import backgroundVideo from 'raw:../media/pexels-ehab-el-gapry-6238188.mp4'

let eventSource
function connect(onEvent) {
  eventSource = new EventSource('/api/notifications')
  eventSource.onmessage = onEvent
}

//
const notifications$ = new Observable((subscriber) => {
  console.log('🎆 observer callback called')
  return () => {
    console.log('🎆 observer teardown')
  }
})

function useNotifications(){
  useEffect(
    () => {
      notifications$.subscribe({
        next(event) {
          console.error('🚒 sse event', event)
          event = JSON.stringify(event, null, 2)
          res.write(event + '\n\n')
        },
        error(error) {
          console.error('🚒 sse observer error', error)
          close()
        },
        complete() {
          console.log('🚒 observer completed')
          close()
        },
      })
    },
    [],
  )
  return notifications
}

export default function NotificationsPage() {
  const notifications = useNotifications()
  return <Box sx={{}}>
    notiications
  </Box>
}
