import * as React from 'react'
import Container from '@mui/material/Container'
import CircularProgress from '@mui/material/CircularProgress'

export default function FullPageLoading(){
  return <Container
    fixed
    sx={{
      height: '100vh',
      width: '100vw',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    <CircularProgress size={140}/>
  </Container>
}