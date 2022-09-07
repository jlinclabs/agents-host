import { useEffect } from 'react'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Alert from '@mui/material/Alert'

import { useCurrentAgent } from '../resources/session'
import { useVaultDump } from '../resources/vault'
import Layout from '../Layout'
import ErrorMessage from '../components/ErrorMessage'
import InspectObject from '../components/InspectObject'

export default function ContactsPage() {
  return <Container sx={{p: 2}}>
    <Typography variant="h3">Contacts</Typography>
  </Container>
}
