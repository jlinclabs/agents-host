import * as React from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'

// import { uploadFile } from '../lib/ipfs'
import InspectObject from './InspectObject'

export default function TermsUploadField({
  value,
  onChange,
  buttonProps = {},
  ...props
}) {

  return <Box>
    { value && <ShowTerms {...{value}}/>}
    <UploadButton {...{...buttonProps, value, onChange }}/>
  </Box>
}

function ShowTerms({ value }){
  return <InspectObject object={value}/>
}

function UploadButton({value, onChange, ...props}){
  const onFileSelect = React.useCallback(
    event => {
      const input = event.target
      const file = input.files[0]
      input.value = ''
      console.log('FILE SELECT', file)
    }
  )

  return <Button {...{
    variant: 'contained',
    ...props,
    // todo change color if value
    component: 'label',
    type: 'file',
  }}>
    {value ? `Upload New Terms` : `Upload Terms`}
    <input
      type="file"
      hidden
      onChange={onFileSelect}
      accept="text/*"
    />
  </Button>
}
