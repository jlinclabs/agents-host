import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'

import Link from 'app-shared/client/components/Link'
import InspectObject from 'app-shared/client/components/InspectObject'
import CopyBox from 'app-shared/client/components/CopyBox'

export default function DashboardPage({ currentUser }) {
  const didWeb = `did:web:${global.location.hostname}:agents:${currentUser.publicKey}`

  return <Box p={2}>
    <Typography variant="h4">Your JLINX Agent</Typography>
    <Typography variant="body1">
      {`Your JLINX Agent is always online working for you!`}
    </Typography>

    <Typography variant="h5" mt={3}>Your Agent's DID</Typography>
    <p>
      <Link to={`/dids/${currentUser.did}`}>{currentUser.did}</Link>
    </p>
    <p>
      <Link to={`/dids/${didWeb}`}>{didWeb}</Link>
    </p>

    {currentUser.publicKey && <>
      <Typography variant="h5" mt={3}>Login with your Agent</Typography>
      <Typography variant="body1">
        {`You can login to participating websites using your JLINX Agent email`}
      </Typography>
      <CopyBox
        value={`${currentUser.publicKey}@${global.location.hostname}`}
        sx={{my:2}}
      />
    </>}
  </Box>
}
