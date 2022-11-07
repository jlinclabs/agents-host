import { Routes, Route, useNavigate, useParams } from 'react-router-dom'
import { useState, useCallback } from 'react'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import CircularProgress from '@mui/material/CircularProgress'

import { useQuery } from 'app-shared/client/hooks/cqrpc'
import Link from 'app-shared/client/components/Link'
import ErrorMessage from 'app-shared/client/components/ErrorMessage'
import CopyButton from 'app-shared/client/components/CopyButton'
import LinkToCerscan from '../components/LinkToCerscan'
import InspectObject from 'app-shared/client/components/InspectObject'

function useDidDocument(did){
  const { result: didDocument, ...state } = useQuery('dids.getDidDocument', { did })
  return [didDocument, state]
}

export default function DidsPage(props) {
  return <Container p={4}>
    <Routes>
      <Route path="/" element={<Index {...props}/>} />
      <Route path="/:did" element={<Show {...props}/>} />
    </Routes>
  </Container>
}

function Index({ currentUser }){
  return <>
    <Typography my={2} variant="h3">DIDs</Typography>
    <Typography my={2} variant="h6">Decentralized Identifiers</Typography>
    <Typography my={2} variant="h6">Resolve a DID:</Typography>
    <ResolveDidForm/>
    <MyAgentsDidsList {...{ currentUser }}/>
  </>
}

function Show(){
  const { did } = useParams()
  const [didDocument, {loading, error} ] = useDidDocument(did)
  return <>
    <Typography variant="h5" sx={{my: 2}}>
      <span>{`DID: ${did}`}</span>
      <CopyButton variant="icon" value={did} />
      {did && did.startsWith(`did:3:`) &&
        <LinkToCerscan id={did.split(':')[2]}/>
      }
    </Typography>
    <ErrorMessage {...{error}}/>
    {loading && <CircularProgress />}
    {didDocument &&
      <InspectObject object={didDocument}/>}
  </>
}

function ResolveDidForm({ disabled, ...props }){
  const navigate = useNavigate()
  const [did, setDid] = useState('')
  const submittable = did && /did:(.+):(.+)$/.test(did)
  return <Box
    {...props}
    component="form"
    onSubmit={event => {
      event.preventDefault()
      navigate(`/dids/${did}`)
    }}
  >
    <Stack flexDirection="row" alignItems="center">
      <TextField
        autoFocus
        sx={{
          flex: '1 1', mr: 2,
          input: {
            fontFamily: 'monospace',
          }
        }}
        label="DID"
        placeholder="did:3:kjzl6cwe1jw148wwvtzi1e70s28h18lpk4uobmum14fmev0imwebvodj8qkuc6l"
        variant="outlined"
        value={did}
        onChange={e => setDid(e.target.value)}
      />
      <Button
        type="submit"
        variant="contained"
        disabled={disabled || !submittable}
      >{`Resolve DID`}</Button>
    </Stack>
  </Box>
}

function MyAgentsDidsList({ currentUser, ...props }){
  return <Box {...props}>
    <Typography my={2} variant="h6">Your Agent's DIDs:</Typography>

    <Link
      to={`/dids/${currentUser.did}`}
      sx={{fontFamily: 'monospace'}}
    >{currentUser.did}</Link>
  </Box>
}
