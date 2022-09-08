import * as React from 'react'
import FormControl from '@mui/material/FormControl'
import FormLabel from '@mui/material/FormLabel'
import TextField from '@mui/material/TextField'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import HighlightOffIcon from '@mui/icons-material/HighlightOff'

import { useCurrentAgent } from '../resources/session'
import ButtonRow from '../components/ButtonRow'


export default function AgreementPartiesInput({
  value,
  onChange,
  ...props
}){
  const parties = Array.from(value || [])
  const { currentAgent } = useCurrentAgent()
  return <FormControl fullWidth {...props}>
    <FormLabel required>Parties</FormLabel>
    <Stack>
      {parties.map((did, index) =>
        <Party
          key={index}
          did={did}
          dupliate={parties.indexOf(did) !== index}
          label={
            currentAgent.did === did
              ? "your agent"
              : "another agent's did"
          }
          readOnly={currentAgent.did === did}
          onChange={did => {
            const parties = Array.from(value)
            if (did === null) parties.splice(index, 1)
            else parties[index] = did
            onChange(parties)
          }}
        />
      )}
      <ButtonRow>
        <Button
          variant="outlined"
          size="small"
          onClick={() => {
            const parties = Array.from(value)
            onChange([...parties, ''])
          }}
        >Add Party</Button>
      </ButtonRow>
    </Stack>
  </FormControl>
}

function Party({ did, onChange, disabled, label, dupliate }){
  return <Stack flexDirection="row" my={1} alignItems="center">
    <DidInput {...{
      value: did,
      onChange,
      sx: {flex: '1 1'},
      label,
      dupliate,
    }}/>
    <Button
      tabIndex={-1}
      onClick={() => { onChange(null) }}
      disabled={disabled}
    >
      <HighlightOffIcon/>
    </Button>
  </Stack>
}

function DidInput({value, onChange, dupliate, ...props}){
  const valid = value && /did:(\w+):(\w+)$/.test(value)
  if (value && !valid){
    props.error = true
    props.helperText = `invalid did`
  }else if (dupliate){
    props.error = true
    props.helperText = `duplicate`
  }
  return <TextField {...{
    label: 'DID',
    placeholder: 'did:3:kjzl6cwe1jw146shgo0grgjfa41x1xi9zfhn7sy04pbcz2ux3moand8266h84vr',
    value,
    onChange: event => {
      onChange(event.target.value)
    },
    ...props,
  }}/>
}
