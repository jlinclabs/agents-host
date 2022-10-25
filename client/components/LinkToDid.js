import * as React from 'react'
import Typography from '@mui/material/Typography'
import Link from 'app-shared/client/components/Link'

export default function LinkToDid({
  did,
  children = <Mono>{did}</Mono>,
  ...props
}){
  return <Link {...props} to={`/dids/${did}`}>{children}</Link>
}

function Mono({children, ...props}){
  return <Typography {...{
    ...props,
    component: 'span',
    sx: {
      fontFamily: 'monospace',
      ...props.sx,
    }
  }}>{children}</Typography>
}
