import { useEffect } from 'react'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Alert from '@mui/material/Alert'
import CircularProgress from '@mui/material/CircularProgress'

import { useQuery } from '../hooks/cqrpc'
import ErrorMessage from '../components/ErrorMessage'
import InspectObject from '../components/InspectObject'

export default function VaultPage() {
  const { result: vaultDump, loading, error } = useQuery(`vault.getDump`)
  return <Container sx={{p: 2}}>
    <Typography variant="h3">VaultPage</Typography>
    <Alert severity="warning" sx={{my:2}}>
      {`
        Displaying this data exposes a lot of secrets and is ONLY
        for DEMO purposes.
      `}
    </Alert>
    <ErrorMessage error={error}/>
    {loading
      ? <CircularProgress/>
      : <InspectObject object={vaultDump}/>
    }
  </Container>
}
