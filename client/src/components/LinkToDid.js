import * as React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import FindInPageIcon from '@mui/icons-material/FindInPage'
import LinkToCeramicApi from '../components/LinkToCeramicApi'
import CeramicStreamLink from '../components/CeramicStreamLink'
import Link from './Link'

export default function LinkToDid({
  did,
  children = <Mono>{did}</Mono>,
  ...props
}){
  // const streamId = did && did.split(':')[2]
  return <Box>
    <Link to={`/dids/${did}`}>{children}</Link>
    {/* <LinkToCeramicApi endpoint={did}/> */}
    {/* {streamId && <CeramicStreamLink streamId={streamId}/> } */}
    {/* // TODO dropdown */}
  </Box>
}

function Mono({children, ...props}){
  return <Typography {...{
    ...props,
    sx: {
      fontFamily: 'monospace',
      ...props.sx,
    }
  }}>{children}</Typography>
}
