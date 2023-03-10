import React from 'react'
import Container from '@mui/material/Container'

import DataPalBanner from '~/components/DataPalBanner'

export default function DashboardPage() {
  return <Container sx={{mt: 2, p: 4, maxWidth: 'sm'}}>
    <DataPalBanner sx={{m: 0, maxWidth: 'min(500px, 30vw)'}}/>
  </Container>
}
