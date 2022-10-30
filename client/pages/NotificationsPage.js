import { Observable } from 'rxjs'
import { useEffect } from 'react'
import createState from 'zustand'

import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import SupportAgentIcon from '@mui/icons-material/SupportAgent'

import Link from 'app-shared/client/components/Link'
import InspectObject from 'app-shared/client/components/InspectObject'
import backgroundVideo from 'raw:../media/pexels-ehab-el-gapry-6238188.mp4'

let eventSource
let subscriptionsCount = 0
function subscribe() {
  if (!eventSource){
    console.log('CONNECTING TO NOTIFICATIONS')
    eventSource = new EventSource('/api/notifications')
    // eventSource.addEventListener('message', (message: MessageEvent) => {
    //   this.events.push(message.data);
    //   console.log(message);
    // });
    //
    // eventSource.addEventListener('streamEnd', (message: MessageEvent) => {
    //   this.events.push(`${message.data} (it was the last one)`);
    //   eventSource.close();
    // });
    //
    // eventSource.addEventListener('hello', (message: MessageEvent) => {
    //   this.events.push(`Hello Message => ${message.data}`);
    // });
    //
    // eventSource.addEventListener('open', (open: Event) => {
    //   console.log(open);
    // });
    //
    // eventSource.addEventListener('error', (error: Event) => {
    //   console.log(error);
    // });
    eventSource.onmessage = event => {
      console.log(event)
      useNotificationsStore.setState(state => ({
        ...state,
        notifications: [...state.notifications, event.data]
      }))
    }
    eventSource.onerror = error => {
      console.error('notifications event source error', errir)
    }

  }
  subscriptionsCount++
  return () => {
    subscriptionsCount--
    if (subscriptionsCount === 0 && eventSource){
      // TODO: schedule shutdown debounced for 100ms
      console.log('DISCONNECTING FROM NOTIFICATIONS')
      eventSource.close()
      eventSource = undefined
    }
  }
}

const useNotificationsStore = createState(set => ({
  notifications: [],
}))

const useNotifications = () => {
  useEffect(subscribe)
  return useNotificationsStore(x => x.notifications)
}


export default function NotificationsPage() {
  const notifications = useNotifications()
  return <Box sx={{}}>
    <InspectObject object={{notifications}}/>
  </Box>
}
