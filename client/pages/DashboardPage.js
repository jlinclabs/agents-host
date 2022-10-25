import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'

import LinkToDid from '../components/LinkToDid'
import InspectObject from '../components/InspectObject'

export default function DashboardPage({ currentUser }) {
  return <Box p={2}>
    <Typography>dashboard home page</Typography>
    <InspectObject object={{currentUser}}/>
  </Box>
}
