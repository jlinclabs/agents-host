import { useState, useEffect } from 'react'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import Box from '@mui/material/Box'
import List from '@mui/material/List'
import Skeleton from '@mui/material/Skeleton'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import PersonIcon from '@mui/icons-material/Person'
import DeleteIcon from '@mui/icons-material/Delete'

import { useCurrentAgent } from '../resources/auth'
import { useRemoteQuery, useRemoteCommand } from '../lib/rpc'
import Layout from '../Layout'
import ErrorMessage from '../components/ErrorMessage'
import Link from '../components/Link'
import Timestamp from '../components/Timestamp'
import InspectObject from '../components/InspectObject'

export default function ContactsPage() {
  const {
    view: contacts = [],
    loading,
    error,
    reload: reloadContacts,
  } = useRemoteQuery('contacts.getAll')

  return <Box p={2}>
      <Typography variant="h3">Contacts</Typography>
      <Typography variant="h6" sx={{my:2}}>ADD NEW CONTACT:</Typography>
      <AddContactForm {...{ reloadContacts }}/>
      <Typography variant="h6" sx={{my:2}}>YOUR CONTACTS:</Typography>
      <ContactsList {...{contacts, loading, error}} />
  </Box>
}

function AddContactForm({ reloadContacts, ...props }){
  const [did, setDid] = useState('')
  const submittable = did && /did:(\w+):(\w+)$/.test(did)
  const addContact = useRemoteCommand('contacts.add', {
    onSuccess(){
      setDid('')
      reloadContacts()
    }
  })
  const disabled = addContact.pending
  return <Box
    {...props}
    component="form"
    onSubmit={event => {
      event.preventDefault()
      addContact.call({ did })
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
      >{`Add Contact`}</Button>
    </Stack>
  </Box>
}

function ContactsList({ contacts, loading, error }){
  // const {view: contacts = [], loading, error} = useRemoteQuery('contacts.getAll')

  return (
    <List sx={{ width: '100%' }}>
      <ErrorMessage {...{error}}/>
      {loading
        ? Array(3).fill().map((_, i) =>
          <Skeleton key={i} animation="wave" height="100px" />
        )
        : (
          contacts.length === 0
            ? <Typography variant="h7">{`You dont have any contacts`}</Typography>
            : [...contacts].sort(sorter).map(contact =>
              <ContactListMember key={contact.did} contact={contact}/>
            )
        )
      }
    </List>
  )
}
const sorter = (a, b) => {
  a = a.addedAt
  b = b.addedAt
  return a < b ? 1 : a > b ? -1 : 0
}

function ContactListMember({ contact }){
  const did = contact.did

  const confirmDelete = () => {}
  return <ListItem {...{
    sx: {px: 0},
    secondaryAction: (
      <IconButton edge="end" aria-label="delete" onClick={confirmDelete}>
        <DeleteIcon />
      </IconButton>
    ),
  }}>
    <ListItemButton {...{
      role: undefined,
      dense: true,
      component: Link,
      to: `/dids/${did}`
    }}>
      <ListItemIcon><PersonIcon/></ListItemIcon>
      <ListItemText {...{
        primaryTypographyProps: {
          sx: {
            fontFamily: 'monospace',
            whiteSpace: 'nowrap',
          },
        },
        primary: `${did}`,
        secondary: <span>
          added <Timestamp at={contact?.addedAt}/>
        </span>
      }}/>
    </ListItemButton>
  </ListItem>
}
