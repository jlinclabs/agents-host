import * as React from 'react'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import { copyText } from '../lib/clipboard.js'

export default function CopyButton({
  children,
  variant = 'button',
  value,
  icon = <ContentCopyIcon/>,
  ...props
}){
  const copy = React.useCallback(() => { copyText(value) }, [value])
  if (variant === 'icon'){
    return <IconButton
      color="primary"
      component="label"
      onClick={copy}
      {...props}
    >
      {children}
      {icon}
    </IconButton>
  }
  return <Button {...{
    onClick: copy,
  }}>
    {children}
  </Button>
}

