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


import { useAction } from '../lib/actions'
import { useView, useReloadView } from '../lib/views'
import { useCurrentAgent } from '../resources/session'
import { useDidDocument } from '../resources/dids'

import Link from '../components/Link'
import ErrorMessage from '../components/ErrorMessage'
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
  const { currentAgent } = useCurrentAgent()

  return <Box>
    <Typography my={2} variant="h3">DIDs</Typography>
    <Typography my={2} variant="h6">Decentralized Identifiers</Typography>
    <Box>
      <Button
        variant="contained"
        component={Link}
        to={`/dids/${currentAgent.did}`}
      >View your Agent's DID</Button>
    </Box>

    <Typography my={2} variant="h6">View another DID:</Typography>
    <ResolveDidForm/>
  </Box>
}

function Show(){
  const { did } = useParams()
  const [didDocument, {loading, error} ] = useDidDocument(did)
  return <Box>
    <Typography variant="h5" sx={{my: 2}}>
      {`DID: ${did}`}
    </Typography>
    <ErrorMessage {...{error}}/>
    {loading && <CircularProgress />}
    {didDocument && <DidDocument didDocument={didDocument}/>}
  </Box>
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
        sx={{ flex: '1 1', mr: 2 }}
        label="DID"
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
