import { useRef, useEffect } from 'react'
import { Routes, Route, useNavigate, useParams } from 'react-router-dom'

import Container from '@mui/material/Container'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'

import RedirectPage from './RedirectPage'
import { useSignup } from '../resources/auth'
import ErrorMessage from '../components/ErrorMessage'
import Link from '../components/Link'
import LoginForm from '../components/LoginForm'

export default function AuthPage({ loading, error }) {
  return <Container>
    dev ceramic page
  </Container>
}
