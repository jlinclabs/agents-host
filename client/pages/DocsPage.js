import { Routes, Route, useNavigate, useParams } from 'react-router-dom'

import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { Observable } from 'rxjs'
import { useEffect } from 'react'
import createState from 'zustand'

import CircularProgress from '@mui/material/CircularProgress'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Skeleton from '@mui/material/Skeleton'
import CircularProgress from '@mui/material/CircularProgress'
import Button from '@mui/material/Button'
import SupportAgentIcon from '@mui/icons-material/SupportAgent'
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';

import { useQuery, useCommand } from 'app-shared/client/hooks/cqrpc'
import useToggle from 'app-shared/client/hooks/useToggle'

import Link from 'app-shared/client/components/Link'
import ButtonRow from 'app-shared/client/components/ButtonRow'
import ErrorMessage from 'app-shared/client/components/ErrorMessage'
import Timestamp from 'app-shared/client/components/Timestamp'
import InspectObject from 'app-shared/client/components/InspectObject'

import LoadingList from '..//components/LoadingList'

export default function DocsPage(props) {
  return <Container p={4}>
    <Routes>
      <Route path="/" element={<Index {...props}/>} />
      <Route path="/:id" element={<Show {...props}/>} />
    </Routes>
  </Container>
}

function Index({ currentUser }){
  return <>
    <Typography my={2} variant="h3">Documents</Typography>
    <Typography my={2} variant="h6">Decentralized Smart Documents protected by your agent 🕵</Typography>
    <MyDocumentsList />
  </>
}





function MyDocumentsList(){
  const query = useQuery('documents.all')
  return <LoadingList {...{
    loading: query.loading,
    error: query.error,
    members: query.results?.documents,
    onEmpty: <Box>
      You do not have any documents yet.
    </Box>,
    onLoading: <CircularProgress/>,
  }}/>
}


function Show({ }){
  const { id } = useParams()

}