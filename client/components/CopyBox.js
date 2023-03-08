import { useCallback } from 'react'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'

import { copyText } from '../lib/clipboard.js'

export default function CopyBox({
  value,
  inputProps,
  iconProps,
  ...props
}){
  const copy = useCallback(
    () => { copyText(value) },
    [value]
  )
  const selectAll = useCallback(e => {
    e.target.setSelectionRange(0, 999999)
  }, [])
  const onFocus = useCallback(e => {
    selectAll(e)
  }, [])
  const onMouseDown = useCallback(e => {
    e.preventDefault()
    selectAll(e)
    e.target.focus()
    return false
  }, [])


  return <Stack direction="row" spacing={1} {...props}>
    <TextField {...{
      fullWidth: true,
      ...inputProps,
      sx: {
        width: 'auto',
        flex: '1 1',
        ...inputProps?.sx,
      },
      value,
      readOnly: true,
      onFocus,
      onMouseDown,
    }}/>
    <IconButton onClick={copy} sx={{display: 'flex', width: '56px'}}>
      <ContentCopyIcon {...iconProps}/>
    </IconButton>
  </Stack>
}