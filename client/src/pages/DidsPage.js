import { Routes, Route, useNavigate, useParams } from 'react-router-dom'
import { useState, useCallback } from 'react'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import Skeleton from '@mui/material/Skeleton'
import Box from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import TextField from '@mui/material/TextField'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import Avatar from '@mui/material/Avatar'
import Paper from '@mui/material/Paper'
import CircularProgress from '@mui/material/CircularProgress'

import { useCurrentAgent } from '../resources/auth'
import { useDidDocument } from '../resources/dids'

import Link from '../components/Link'
import ErrorMessage from '../components/ErrorMessage'
import CopyButton from '../components/CopyButton'
import InspectObject from '../components/InspectObject'

export default function DidsPage() {
  return <Container p={4}>
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/:did" element={<Show />} />
    </Routes>
  </Container>
}

function Index(){
  return <Container maxWidth="sm">
    <Typography my={2} variant="h3">DIDs</Typography>
    <Typography my={2} variant="h6">Decentralized Identifiers</Typography>
    <Typography my={2} variant="h6">Resolve a DID:</Typography>
    <ResolveDidForm/>
    <MyAgentsDidsList/>
  </Container>
}

function Show(){
  const { did } = useParams()
  const [didDocument, {loading, error} ] = useDidDocument(did)
  return <Container>
    <Typography variant="h5" sx={{my: 2}}>
      <span>{`DID: ${did}`}</span>
      <CopyButton variant="icon" value={did} />
    </Typography>
    <ErrorMessage {...{error}}/>
    {loading && <CircularProgress />}
    {didDocument && <DidDocument didDocument={didDocument}/>}
  </Container>
}

function DidDocument({ didDocument }){
  // TODO display nicer than json dump
  return <Paper sx={{p: 2}}>
    <InspectObject object={didDocument}/>
  </Paper>
}

function ResolveDidForm({ disabled, ...props }){
  const navigate = useNavigate()
  const [did, setDid] = useState('')
  const submittable = did && /did:(\w+):(\w+)$/.test(did)
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
        sx={{ flex: '1 1', mr: 2 }}
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

function MyAgentsDidsList(props){
  const { currentAgent } = useCurrentAgent()
  return <Box {...props}>
    <Typography my={2} variant="h6">Your Agent's DIDs:</Typography>

    <Link
      to={`/dids/${currentAgent.did}`}
    >{currentAgent.did}</Link>
  </Box>
}
