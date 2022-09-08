import * as React from 'react'
import TextareaAutosize from '@mui/material/TextareaAutosize'
import TextField from '@mui/material/TextField'

export default function TermsTextField({
  minRows = 3,
  maxRow,
  readOnly = false,
  spellCheck = !readOnly,
  ...props
}) {
  return <TextField {...{
    label: "terms",
    name: "terms",
    ...props,
    multiline: true,
    InputProps: {
      inputComponent: TextareaAutosize,
      inputProps: {
        minRows,
        maxRow,
        spellCheck,
      }
    },
    readOnly,
  }}/>
}
