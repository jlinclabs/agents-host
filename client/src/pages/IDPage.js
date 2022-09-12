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
import DidDocument from '../components/DidDocument'
import LinkToDid from '../components/LinkToDid'
import InspectObject from '../components/InspectObject'

export default function DidsPage() {
  const { currentAgent } = useCurrentAgent()
  return <Container maxWidth="sm">
    <Paper sx={{p:2, my: 2}}>
      <Typography variant="h3">JLINX Agent</Typography>
      <Box
        sx={{
          overflow: 'hidden',
          whiteSpace: 'nowrap',
          textOverflow: 'ellipsis',
        }}
      ><LinkToDid did={currentAgent.did}/></Box>
    </Paper>
  </Container>
}
