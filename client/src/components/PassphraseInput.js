import * as React from 'react'
import TextField from '@mui/material/TextField'

export default function PassphraseInput(props) {
  const onKeyDown = React.useCallback(
    event => {
      if (event.code === "Enter") {
        event.preventDefault()
        event
          .currentTarget
          .closest('form')
          .querySelector('*[type=submit]')
          .click()
      }
    },
    []
  )
  return <>
    <input
      type="password"
      readOnly
      value={props.value}
      style={{
        position: 'absolute',
        visibility: 'hidden',
        top: '-999em',
        left: '-999em',
      }}
    />
    <TextField {...{
      InputProps: {
        sx: {
          whiteSpace: 'pre-wrap',
          fontSize: 'smaller',
          fontFamily: 'monospace',
          minWidth: '400px',
        }
      },
      label: "passphrase",
      autoComplete: "password",
      minLength: "128",
      margin: "normal",
      fullWidth: true,
      name: "password",
      multiline: true,
      rows: 3,
      onKeyDown,
      ...props
    }}/>
  </>
}

PassphraseInput.isValid = value =>
  typeof value === 'string' && value.length >= 128
