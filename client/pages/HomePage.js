import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import SupportAgentIcon from '@mui/icons-material/SupportAgent'

import Link from 'app-shared/client/components/Link'
import backgroundVideo from 'raw:../media/pexels-ehab-el-gapry-6238188.mp4'

export default function HomePage() {
  return <Box sx={{
    position: 'relative',
    with: '100vw',
    minHeight: '100vh',
  }}>
    <Box component="video" autoPlay muted loop sx={{
      width: '100vw',
      height: '100vh',
      objectFit: 'cover',
      position: 'fixed',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      zIndex: -1,
      opacity: 0.3,
    }}>
      <source src={backgroundVideo} type="video/mp4"/>
    </Box>
    <Stack
      direction={{ xs: 'column', sm: 'row' }}
      spacing={{ xs: 1, sm: 2, md: 4 }}
      alignItems="center"
      justifyContent="center"
      sx={{
        width: '100vw',
        minHeight: '100vh',
      }}
    >
      <SupportAgentIcon sx={{fontSize: 300}}/>
      <Box sx={{
        textAlign: { xs: 'center', sm: 'left' },
        p: 2
      }}>
        <Typography
          variant="h3"
          component="h1"
        >Agents!</Typography>
        <Typography
          variant="h6"
          component="h2"
          sx={{my: 2}}
        >
          <span>Brought to you by </span>
          <a href="https://jlinc.com" target="_blank">Jlinc Labs</a>
        </Typography>
        <Box>
          <Button {...{
            variant: 'contained',
            component: Link,
            to: '/signup',
          }}>Activate Your Agent</Button>
        </Box>
        <Box>
          <Button {...{
            variant: 'text',
            component: Link,
            to: '/login',
            sx: {
              fontSize: 'smaller',
              color: 'white',
              textTransform: 'lowercase',
              p: 0,
              minWidth: 'auto',
            },
          }}>login</Button>
        </Box>
      </Box>
    </Stack>
  </Box>
}
