import { Routes, Route, useNavigate, useParams } from 'react-router-dom'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import CircularProgress from '@mui/material/CircularProgress'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'
import FormControlLabel from '@mui/material/FormControlLabel'
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile'

import { useQuery, useCommand } from 'app-shared/client/hooks/cqrpc'
import useToggle from 'app-shared/client/hooks/useToggle'

import Link from 'app-shared/client/components/Link'
import ButtonRow from 'app-shared/client/components/ButtonRow'
import ErrorMessage from 'app-shared/client/components/ErrorMessage'
import Timestamp from 'app-shared/client/components/Timestamp'
import LoadingList from 'app-shared/client/components/LoadingList'

import InspectObject from 'app-shared/client/components/InspectObject'


export default function DocsPage(props) {
  return <Container p={4}>
    <Routes>
      <Route path="/" element={<Index {...props}/>} />
      <Route path="/:id" element={<Show {...props}/>} />
    </Routes>
  </Container>
}

function Index(){
  return <>
    <Typography my={2} variant="h3">Documents</Typography>
    <Typography my={2} variant="h6">Decentralized Smart Documents protected by your agent 🕵</Typography>
    <MyDocumentsList />
  </>
}

function MyDocumentsList(){
  const query = useQuery('documents.getAll')
  return <LoadingList {...{
    loading: query.loading,
    error: query.error,
    members: (query.result?.documents || []).map(doc => ({
      key: doc.id,
      href: `/docs/${doc.id}`,
      icon: <InsertDriveFileIcon/>,
      text: doc.id,
      subtext: <>
        created: <Timestamp at={doc.createdAt}/><br/>
        updated: <Timestamp at={doc.updatedAt}/>
      </>
    })),
    onEmpty: <Box>
      You do not have any documents yet.
    </Box>,
    onLoading: <CircularProgress/>,
  }}/>
}

function Show({ }){
  const { id } = useParams()
  const query = useQuery('documents.getOne', { id })
  return <Paper sx={{p: 2, my: 1}}>
    <Typography variant="h6">Document</Typography>
    <ErrorMessage error={query.error}/>
    {query.pending ? <CircularProgress/> : <Document {...query.result}/>}
  </Paper>
}

function Document({ id, version, createdAt, updatedAt, value }) {
  return <>
    <dl>
      <dt>ID</dt>
      <dd>{id}</dd>
      <dt>VERSION</dt>
      <dd>{version}</dd>
      <dt>CREATED</dt>
      <dd>{createdAt}</dd>
      <dt>UPDATED</dt>
      <dd>{updatedAt}</dd>
    </dl>
    <InspectObject object={value}/>
  </>
}