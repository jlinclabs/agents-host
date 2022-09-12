import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'

import { useCurrentAgent } from '../resources/auth'
import LinkToDid from '../components/LinkToDid'
import CopyButton from '../components/CopyButton'

export default function HomePage() {
  const { currentAgent } = useCurrentAgent()
  return <Box p={2}>
    {currentAgent &&
      <AgentDescription agent={currentAgent}/>}
  </Box>
}

function AgentDescription({ agent }){
  return <>
    <Typography variant="h3">Jlinx Agent</Typography>
    <Typography variant="h6" sx={{mt: 2}}>
      <LinkToDid did={agent.did}/>
      <CopyButton variant="icon" value={agent.did} />
    </Typography>
  </>
}
