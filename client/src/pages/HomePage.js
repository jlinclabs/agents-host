import Container from '@mui/material/Container'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'

import { useCurrentAgent } from '../resources/session'
import Link from '../components/Link'
import LinkToDid from '../components/LinkToDid'
import Timestamp from '../components/Timestamp'

export default function HomePage() {
  const { currentAgent } = useCurrentAgent()
  return <Container maxWidth="md">
    {currentAgent &&
      <AgentDescription agent={currentAgent}/>}
  </Container>
}

function AgentDescription({ agent }){
  return <Paper sx={{mt:2, p: 2}}>
    <Typography variant="h3">Jlinx Agent</Typography>
    <Typography variant="h6">
      <LinkToDid did={agent.did}/>
    </Typography>
    <Typography variant="h6">
      {`Created: `}
      <Timestamp at={agent.createdAt}/>
    </Typography>
  </Paper>
}
