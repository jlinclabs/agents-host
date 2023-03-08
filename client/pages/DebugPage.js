import * as React from 'react'
import { useEffect, useState, useCallback } from 'react'
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import { ErrorBoundary } from 'react-error-boundary'

import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Skeleton from '@mui/material/Skeleton'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
import KeyboardCommandKeyTwoToneIcon from '@mui/icons-material/KeyboardCommandKeyTwoTone'
import CottageIcon from '@mui/icons-material/Cottage'

import AppError from '../components/AppError'
import Link from '../components/Link'
import Form from '../components/Form'
import ButtonRow from '../components/ButtonRow'
import ErrorMessage from '../components/ErrorMessage'
import { useQuery, useCommandOnMount } from '../hooks/cqrpc.js'
import InspectObject from '../components/InspectObject'

const searchToString = object => (new URLSearchParams(object)).toString()
const searchToObject = search => Object.fromEntries((new URLSearchParams(search)).entries())

export default function DebugPage({ appName }) {
  const location = useLocation()
  const name = location.pathname.split('/').reverse()[0]
  const search = searchToObject(location.search)
  const optionsJson = search.opts
  useEffect(
    () => { document.title = `Debug ${appName}: ${name}(${optionsJson || ''})` },
    [name, optionsJson]
  )
  const { result: spec, error } = useQuery('debug.getQueriesAndCommands')
  const props = { spec, name, optionsJson }
  return <Container maxWidth={false} disableGutters>
    <Box sx={{
      display: 'flex',
      flexDirection: 'row',
      minHeight: '100vh',
      minWidth: '100vw',
    }}>
      <SideNav {...{appName, spec}}/>
      <Box sx={{ flex: '1 1', p: 2 }}>
        <ErrorMessage {...{error}}/>
        <ErrorBoundary onError={AppError}>
          <Routes>
            <Route
              path="/q/:name"
              element={<ExecForm key={name} {...props} type="query"/>}
              title="do a query"
            />
            <Route
              path="/c/:name"
              element={<ExecForm key={name} {...props} type="command"/>}
              title="do a command"
            />
          </Routes>
        </ErrorBoundary>
      </Box>
    </Box>
  </Container>
}

function SideNav({ appName, spec }){
  return <Box sx={{
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'primary.dark',
    minWidth: `max(10vw, 175px)`,
    maxWidth: `max(20vw, 400px)`,
    overflowX: 'auto',
  }}>
    <Typography variant="h6"
      sx={{
        my: 2,
        textAlign: 'center',
      }}
    >Debug {appName}</Typography>
    <SideNavButton {...{
      to: `/`,
      icon: <CottageIcon/>,
      title: 'Home',
    }}/>
    <SideNavButtonList {...{
      name: 'Queries',
      tree: spec?.queries,
      icon: <HelpOutlineIcon/>,
      linkPrefix: '/debug/q/',
    }}/>
    <SideNavButtonList {...{
      name: 'Commands',
      tree: spec?.commands,
      icon: <KeyboardCommandKeyTwoToneIcon/>,
      linkPrefix: '/debug/c/',
    }}/>
  </Box>
}

function SideNavButton({ icon, title, subtitle, ...props }){
  if (props.to) props.component = Link
  return <ListItem disablePadding>
    <ListItemButton {...props}>
      <ListItemIcon sx={{minWidth: '30px'}}>
        {icon}
      </ListItemIcon>
      <ListItemText primary={title} secondary={subtitle} />
    </ListItemButton>
  </ListItem>
}

function SideNavButtonList({ name, tree, icon, linkPrefix }){
  const objectToNodes = obj => {
    const nodes = []
    for (const key in obj){
      if (key.startsWith('__')) continue;
      const value = obj[key]
      const node = (value && value.name && value.source)
        ? <SideNavButton {...{
          key,
          to: `${linkPrefix}${key}`,
          icon,
          title: key,
          subtitle: value.args,
        }}/>
        : <div>DOWN</div>
      nodes.push(node)
    }
    return nodes
  }
  const list = tree
    ? objectToNodes(tree)
    : Array(3).fill('').map((_, i) =>
      <Skeleton key={i} animation="wave" height="40px" />
    )
  return <Box>
    <Typography variant="h6" sx={{pl: 1}}>{name}</Typography>
    <List dense sx={{pt: 0}}>{list}</List>
  </Box>
}

function ExecForm({ spec, type, name, optionsJson = '{}' }){
  const location = useLocation()
  const navigate = useNavigate()
  const isCommand = type === 'command'
  const options = safeJsonParse(optionsJson)
  const optionsJsonIsValid = !(options instanceof Error)
  const submittable = !!(name && optionsJsonIsValid)

  const [execution, setExecution] = useState(
    (type === 'query' && submittable)
      ? { name, options }
      : null
  )
  const [executionDone, setExecutionDone] = useState(false)

  const setOptionsJson = useCallback(
    (optionsJson, replace = false) => {
      // TODO include other existing search params
      const params = {}
      if (optionsJson) params.opts = optionsJson
      const newSearch = searchToString(params)
      let url = location.pathname
      if (newSearch) url += '?' + newSearch
      navigate(url, { replace })
    },
    [],
  )

  const reset = useCallback(
    () => {
      setOptionsJson(undefined, false)
      setExecution(null)
      setExecutionDone(false)
    },
    [setOptionsJson],
  )

  const onSubmit = useCallback(
    () => { if (submittable) setExecution({ id: Date.now(), options }) },
    [name, options],
  )

  const procedures = spec && Object.values(isCommand ? spec.commands : spec.queries) || []
  const disabled = !!(execution && !executionDone)
  const Exec = isCommand ? ExecuteCommand : ExecuteQuery

  return <Box>
    <Form {...{disabled, onSubmit}}>
      <Stack spacing={2}>
        <Stack direction="row" spacing={2}>
          <Typography variant="h4">{type}</Typography>
          <Select value={name} autoWidth>
            {procedures.map(({name}) =>
              <MenuItem
                key={name}
                value={name}
                component={Link}
                to={`/debug/${isCommand ? 'c': 'q'}/${name}`}
              >{name}</MenuItem>)
            }
          </Select>
        </Stack>
        <TextField
          disabled={disabled}
          label="options (JSON)"
          fullWidth
          multiline
          value={optionsJson}
          onChange={e => { setOptionsJson(e.target.value, true) }}
          error={!optionsJsonIsValid}
        />
        <ButtonRow sx={{mt: 2}}>
          <Button
            disabled={disabled || !submittable}
            variant="contained"
            type="submit"
            autoFocus
          >{isCommand ? 'execute' : 'query'}</Button>

          <Button
            disabled={disabled}
            variant="text"
            onClick={reset}
          >{'reset'}</Button>
        </ButtonRow>
      </Stack>
    </Form>
    <hr/>
    <Box>
      {execution
        ? <Exec {...{
          key: execution.id,
          id: execution.id,
          name,
          options: execution.options,
          onComplete(){ setExecutionDone(true) }
        }}/>
        : null
      }
    </Box>
  </Box>
}

function ExecuteQuery({ name, options, onComplete }){
  const results = useQuery(name, options, {
    dedupingInterval: 0,
    revalidateOnMount: true,
    revalidateOnFocus: true,
  })
  useEffect(
    () => { if (!results.loading) onComplete() },
    [results.loading]
  )
  return <Execution {...{ ...results, name, options, }}/>
}

function ExecuteCommand({ name, options, onComplete }){
  const results = useCommandOnMount(name, options, { onComplete })
  return <Execution {...{ ...results, name, options, }}/>
}

function Execution({ /*name, options,*/ result, loading, error }){
  return <Box>
    {
      loading
        ? <CircularProgress/>
        : error
          ? <ErrorMessage error={error}/>
          : <InspectObject
            object={result}
            sx={{
              m: 0,
              backgroundColor: '#232323',
              // backgroundColor: t => t.palette.grey[800],
            }}
          />
    }
  </Box>
}


function safeJsonParse(json){
  try{
    return JSON.parse(json)
  } catch(error){
    return error
  }
}
