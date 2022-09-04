import * as React from 'react'
import FindInPageIcon from '@mui/icons-material/FindInPage'

import Link from '../components/Link'

export default function CeramicStreamLink({ streamId, children, ...props }){
  const to = `https://cerscan.com/testnet-clay/stream/${streamId}`
  return <Link {...props} to={to} target="_blank">
    {children ?? <FindInPageIcon/>}
  </Link>
}

