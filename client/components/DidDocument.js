import * as React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import CircularProgress from '@mui/material/CircularProgress'
import InspectObject from 'app-shared/client/components/InspectObject'

import { useDidDocument } from '../resources/dids'

export default function DidDocument({did, ...props}) {
  const [didDocument, {loading, error} ] = useDidDocument(did)
  if (loading) return <CircularProgress/>
  if (error) return <ErrorMessage {...{error}}/>
  return <Box {...{
    ...props,
    sx: {
      // maxWidth: '50vw',
      ...props.sx,
    }
  }}>
    <InspectObject object={didDocument} sx={{p:1}}/>
  </Box>
}
