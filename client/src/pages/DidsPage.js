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
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import Avatar from '@mui/material/Avatar'
import Paper from '@mui/material/Paper'
import CircularProgress from '@mui/material/CircularProgress'


import { useAction } from '../lib/actions'
import { useView, useReloadView } from '../lib/views'
import { useDidDocument } from '../resources/dids'
import Layout from '../Layout'
import Link from '../components/Link'
import ErrorMessage from '../components/ErrorMessage'
import InspectObject from '../components/InspectObject'

export default function DidsPage() {
  return <Container p={4}>
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/add" element={<Add />} />
      <Route path="/:did" element={<Show />} />
      <Route path="/:did/did-document" element={<ShowDidDocument />} />
      <Route path="/:did/edit" element={<Edit />} />
    </Routes>
  </Container>
}

function Index(){
  return <Box>
    <Typography mt={2} variant="h3">My Identifiers</Typography>
    <Stack spacing={2} sx={{maxWidth: '400px'}}>
      <Button
      variant="contained"
        component={Link}
        to="/identifiers/new"
      >{`New Identifier`}</Button>
    </Stack>
    <MyContactsList />
  </Box>
}


function Add(){

}

function Show(){
  const { did } = useParams()
  const [didDocument, ] = useDidDocument(did)
  return <Box>
    <Typography variant="h5" sx={{my: 2}}>
      {`DID: ${did}`}
    </Typography>
    <DidDocument didDocument={didDocument}/>
  </Box>
}

function ShowDidDocument(){

}

function Edit(){

}




function MyContactsList(){
  const {view: contacts, error, loading } = useView('contacts.all')

  if (error){
    return <ErrorMessage {...{error}}/>
  }

  if (loading) {
    return Array(3).fill().map((_, i) =>
      <Skeleton key={i} animation="wave" height="100px" />
    )
  }

  if (contacts.length === 0){
    return <span>you dont have any contacts</span>
  }
  return <List sx={{
    width: '100%',
  }}>
    {contacts.map(contact =>
      <MyContact {...{ key: contact.did, contact }}/>
    )}
  </List>
}


function MyContact({ did }){
  return <Box>{`did: ${did}`}</Box>
}


function DidDocument({ didDocument }){
  // TODO display nicer than json dump
  return <Paper sx={{p: 2}}>
    <InspectObject object={didDocument}/>
  </Paper>
}
