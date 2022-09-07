import { useEffect } from 'react'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Alert from '@mui/material/Alert'

import { useCurrentAgent } from '../resources/session'
import { useVaultDump } from '../resources/vault'
import Layout from '../Layout'
import ErrorMessage from '../components/ErrorMessage'
import InspectObject from '../components/InspectObject'

export default function VaultPage() {
  const { currentAgent } = useCurrentAgent({ redirectToIfNotFound: '/' })
  const [vaultDump, { loading, error }] = useVaultDump()
  return <Container sx={{p: 2}}>
    <Typography variant="h3">VaultPage</Typography>
    <Alert severity="warning" sx={{my:2}}>
      {`
        Displaying this data exposes a lot of secrets and is ONLY
        for DEMO purposes.
      `}
    </Alert>
    <ErrorMessage error={error}/>
    <InspectObject object={vaultDump}/>
  </Container>
}
