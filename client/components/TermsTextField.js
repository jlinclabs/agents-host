import * as React from 'react'
import TextareaAutosize from '@mui/material/TextareaAutosize'
import TextField from '@mui/material/TextField'

export default function TermsTextField({
  minRows = 3,
  maxRows,
  readOnly = false,
  spellCheck = !readOnly,
  ...props
}) {
  return <TextField {...{
    name: "terms",
    ...props,
    multiline: true,
    InputProps: {
      inputComponent: TextareaAutosize,
      inputProps: {
        minRows,
        maxRows,
        spellCheck,
      }
    },
    readOnly,
  }}/>
}
