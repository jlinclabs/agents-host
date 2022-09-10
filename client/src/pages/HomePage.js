import Container from '@mui/material/Container'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'

import { useCurrentAgent } from '../resources/auth'
import LinkToDid from '../components/LinkToDid'

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
    <Typography variant="h6" sx={{mt: 2}}>
      <LinkToDid did={agent.did}/>
    </Typography>
  </Paper>
}
