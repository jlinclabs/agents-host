import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'

import LinkToDid from '../components/LinkToDid'
import InspectObject from 'app-shared/client/components/InspectObject'
import CopyBox from '../components/CopyBox'

export default function DashboardPage({ currentUser }) {
  return <Box p={2}>
    <Typography variant="h4">Your JLINX Agent</Typography>
    <Typography variant="body1">
      {`Your JLINX Agent is always online working for you!`}
    </Typography>


    <Typography variant="h5" mt={3}>Login with your Agent</Typography>
    <Typography variant="body1">
      {`You can login to participating websites using your JLINX Agent email`}
    </Typography>
    <CopyBox
      value={`${currentUser.publicKey}@${global.location.hostname}`}
      sx={{my:2}}
    />
  </Box>
}
