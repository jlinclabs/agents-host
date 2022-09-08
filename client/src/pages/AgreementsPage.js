import { Routes, Route, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { useState, useCallback } from 'react'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import ListItemIcon from '@mui/material/ListItemIcon'
import Skeleton from '@mui/material/Skeleton'
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined'
import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import InputLabel from '@mui/material/InputLabel'
import CircularProgress from '@mui/material/CircularProgress'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import FormLabel from '@mui/material/FormLabel'
import FormGroup from '@mui/material/FormGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Switch from '@mui/material/Switch'
import HighlightOffIcon from '@mui/icons-material/HighlightOff'
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'

import { useStateObject } from '../lib/reactStateHelpers'
import { useAction } from '../lib/actions'
import { useView } from '../lib/views'
import { useCurrentAgent } from '../resources/session'

import Link from '../components/Link'
import LinkToCeramicApi from '../components/LinkToCeramicApi'
import Timestamp from '../components/Timestamp'
import ErrorMessage from '../components/ErrorMessage'
import IdentifierProfile from '../components/IdentifierProfile'
import IdentifierSelectInput from '../components/IdentifierSelectInput'
import LinkToDid from '../components/LinkToDid'
import CeramicStreamLink from '../components/CeramicStreamLink'
import CeramicStreamEvents from '../components/CeramicStreamEvents'
import ButtonRow from '../components/ButtonRow'
import TermsTextField from '../components/TermsTextField'
import AgreementPartiesInput from '../components/AgreementPartiesInput'
import InspectObject from '../components/InspectObject'

export default function Agreements(props) {
  return <Container maxWidth="lg">
    <Routes>
      <Route path="/" element={<Index {...props} />} />
      <Route path="/new" element={<New {...props} />} />
      <Route path="/find" element={<Find {...props} />} />
      <Route path="/:id" element={<Show {...props} />} />
    </Routes>
  </Container>
}

function Index(props) {
  return <Container maxWidth="sm">
    <Typography my={2} variant="h3">Agreements</Typography>
    <Typography my={2} variant="h6">Standard Information Sharing Agreemnts</Typography>

    <Stack spacing={2}>
      <Button
        variant="contained"
        component={Link}
        to="/agreements/new"
      >{`Create an Agreement`}</Button>

      <Button
        variant="contained"
        component={Link}
        to="/agreements/find"
      >{`View an Agreement`}</Button>
    </Stack>

    <MyAgreementsList />
  </Container>
}

function New({ currentAgent, router }) {
  const navigate = useNavigate()
  const [agreement, patchAgreement] = useStateObject({
    parties: [
      currentAgent.did,
      '',
    ],
    terms: '',
  })

  const createAgreement = useAction('agreements.create', {
    onSuccess(agreement){
      navigate(`/agreements/${agreement.id}`)
    }
  })

  return <Container maxWidth="md">
    <AgreementForm {...{
      router,
      agreement,
      patchAgreement,
      submitting: createAgreement.pending,
      error: createAgreement.error,
      onSubmit(){
        createAgreement({ agreement })
      }
    }}/>
    <PreviewAgreementForm {...{
      router,
      agreement
    }}/>
  </Container>
}


function Show({ currentAgent }) {
  const { id } = useParams()
  const { view: agreement, loading, error } = useView(`agreements.${id}`)

  if (error) return <ErrorMessage {...{ error }}/>
  return <Container maxwidth="md">
    {
      error ? <ErrorMessage {...{ error }}/> :
      agreement ? <Agreement {...{ currentAgent, agreement }}/> :
      <CircularProgress/>
    }
  </Container>
}



function Find() {
  const navigate = useNavigate()
  return <Container maxWidth="sm">FormLabel
    <Paper sx={{p:2, m:2}}>
      <Typography variant="h4">Find Agreement</Typography>
      <LookupAgreementForm
        onSubmit={id => { navigate(`/agreements/${id}`) }}
      />
    </Paper>
  </Container>
}


function AgreementForm({
  router,
  agreement,
  patchAgreement,
  submitting,
  error,
  onSubmit,
}){
  return <Paper {...{
    elevation: 3,
    component: 'form',
    sx: { p: 2, m: 1 },
    onSubmit(event){
      event.preventDefault()
      onSubmit()
    }
  }}>
    <Typography component="h1" variant="h3" sx={{mb: 3}}>
      Create an Agreement
    </Typography>

    <ErrorMessage error={error}/>

    <AgreementPartiesInput
      sx={{mb: 2}}
      value={agreement.parties}
      onChange={parties => patchAgreement({ parties })}
    />

    <FormControl fullWidth>
      <FormLabel required>Terms</FormLabel>
      <TermsTextField
        label=""
        value={agreement.terms}
        onChange={e => patchAgreement({ terms: e.target.value })}
      />
    </FormControl>

    <ButtonRow mt={2}>
      <Button
        variant="contained"
        type="submit"
      >Create</Button>
      <Button
        variant="outlined"
        onClick={() => { patchAgreement(undefined) }}
      >reset</Button>
      <Button
        variant="text"
        component={Link}
        to="/agreements"
      >cancel</Button>
    </ButtonRow>
  </Paper>
}

function PreviewAgreementForm({ agreement }){
  return <Paper sx={{p:2}}>
    <InspectObject object={agreement}/>
  </Paper>
}

function LookupAgreementOfferingForm({ setId }){
  const [ sisaId, setAgreementId ] = useState('')
  return <Paper {...{
    elevation: 3,
    component: 'form',
    sx: { p: 2, mt: 2 },
    onSubmit(event){
      event.preventDefault()
      // navigate(`/agreement/sign?id=${encodeURIComponent(sisaId)}`)
      setId(sisaId)
    }
  }}>
    <Typography component="h1" variant="h3">
      Sign a Agreement
    </Typography>
    <FormControl fullWidth>
      <TextField
        label="Agreement Id"
        margin="normal"
        required
        fullWidth
        name="sisaUrl"
        placeholder="lGavv2LbRjEPqiLUX1af_DvOz5Qy03PbuWw1I1kcFGs"
        value={sisaId}
        onChange={e => { setAgreementId(e.target.value) }}
      />
    </FormControl>
    <Box sx={{display: 'flex', justifyContent: 'flex-end'}}>
      <Button type="submit" variant="contained">{`Lookup Agreement Offering`}</Button>
    </Box>
  </Paper>
}

function Agreement({ currentAgent, agreement }){
  return <Paper
    sx={{
      m: 4,
      p: 2,
    }}
    component="div"
  >
    <Stack flexDirection="row" justifyContent="space-between">
      <Typography variant="h4">
        {`Agreement`}
      </Typography>
    </Stack>

    <Stack my={2} spacing={2} direction="row" alignItems="center">
      <Typography variant="h6">ID</Typography>
      <Link to={`/agreements/${agreement.id}`}>{agreement.id}</Link>
      <CeramicStreamLink streamId={agreement.id}/>
    </Stack>

    <Box my={2}>
      <Typography variant="h6">Created:</Typography>
      <Timestamp at={agreement.details.createdAt}/>
    </Box>

    <Box my={2}>
      <Typography variant="h6">Offered by:</Typography>
      <LinkToDid did={agreement.details.owner}/>
    </Box>

    <Typography variant="h6">Terms:</Typography>
    <FormControl fullWidth>
      <TermsTextField
        multiline
        readOnly
        value={agreement.details.terms}
      />
    </FormControl>

    <Typography variant="h6">Parties:</Typography>
    <Stack>
      {agreement.details.parties.map(did =>
        <Stack key={did} spacing={2} direction="row" alignItems="center">
          {agreement.signatures[did]
            ? <CheckCircleOutlineIcon/>
            : <RadioButtonUncheckedIcon/>
          }
          <LinkToDid {...{did}}/>
        </Stack>
      )}
    </Stack>

    <AgreementActions {...{currentAgent, agreement}}/>
    <InspectObject object={agreement}/>
  </Paper>
}

function AgreementActions({ currentAgent, agreement }){
  if (agreement.details.owner === currentAgent.did){
    const everyoneHasSigned = false
    if (everyoneHasSigned){

    }

    return <Box my={2}>
      <Typography variant="h6" sx={{mt: 2}}>
        Share this Agreement ID with other parties:
      </Typography>
      <Box sx={{
        '> input': {
          outline: 'none',
          width: '100%',
          fontFamily: 'monospace',
          fontSize: '20px',
          p: 1,
        }
      }}>
        <input type="text" readOnly value={agreement.id} onClick={e => { e.target.select() }}/>
      </Box>
    </Box>
  }
  if (agreement.details.parties.includes(currentAgent.did)){
    const signature = agreement.signatures[currentAgent.did]
    if (signature){
      return <Box>you signed!</Box>
    }else{
      return <SignAgreementForm {...{ currentAgent, agreement }} />
    }
  }
}

function SignAgreementForm({ currentAgent, agreement }){
  const navigate = useNavigate()

  const signAgreement = useAction('agreements.sign', {
    // onSuccess({ signatureId }){
    //   console.log('SIGNED', { signatureId })
    //   navigate(`/agreements/${sisaId}`)
    //   // setSignatureId(signatureId)
    // }
  })

  const disabled = signAgreement.pending
  return <Box {...{
    mt: 2,
    component: 'form',
    onSubmit(event){
      event.preventDefault()
      signAgreement({ agreementId: agreement.id })
    }
  }}>
    <ErrorMessage error={signAgreement.error}/>
    <ButtonRow>
      <Button type="submit" variant="contained">{`Sign Agreement`}</Button>
    </ButtonRow>
  </Box>
}


function AckAgreementSignatureForm({ sisa, reloadAgreement }){
  const [signatureId, setSignatureId] = useState('')

  const ackAgreementSignature = useAckAgreementSignature({
    onSuccess(){
      reloadAgreement()
    },
  })
  const disabled = ackAgreementSignature.pending
  return <Box {...{
    elevation: 3,
    component: 'form',
    sx: { mt: 2 },
    onSubmit(event){
      event.preventDefault()
      ackAgreementSignature({
        sisaId: sisa.id,
        signatureId,
      })
    }
  }}>
    <Typography variant="h6" mb={3}>
      Enter Their Agreement Signature ID here
    </Typography>
    <TextField
      label="Agreement Signature ID"
      disabled={disabled}
      margin="normal"
      required
      fullWidth
      value={signatureId}
      onChange={e => { setSignatureId(e.target.value) }}
    />
    <Box sx={{display: 'flex', justifyContent: 'flex-end'}}>
      <Button type="submit" variant="contained">{`Record Signature`}</Button>
    </Box>
  </Box>
}


function MyAgreementsList(){
  const {view: myAgreements, loading, error} = useView('agreements.mine')
  return (
    <List sx={{
      width: '100%',
      // bgcolor: 'background.paper',
      // flexGrow: 1,
    }}>
      <ErrorMessage {...{error}}/>
      {loading
        ? Array(3).fill().map((_, i) =>
          <Skeleton key={i} animation="wave" height="100px" />
        )
        : (
          myAgreements.length === 0
            ? <span>You dont have any agreements</span>
            : [...myAgreements].sort(sorter).map(agreement =>
              <MyAgreement key={agreement.id} agreement={agreement}/>
            )
        )
      }
    </List>
  )
}
const sorter = (a, b) => {
  a = a.createdAt
  b = b.createdAt
  return a < b ? 1 : a > b ? -1 : 0
}

function MyAgreement({ agreement }){
  return <ListItem {...{
    sx: {px: 0},
    secondaryAction: (
      undefined
      // <IconButton edge="end" aria-label="delete" {...{onClick}}>
      //   <DeleteIcon />
      // </IconButton>
    ),
  }}>
    <ListItemButton {...{
      role: undefined,
      dense: true,
      component: Link,
      to: `/agreements/${agreement.id}`
    }}>
      <ListItemIcon><ArticleOutlinedIcon/></ListItemIcon>
      <ListItemText {...{
        primaryTypographyProps: {
          sx: {
            fontFamily: 'monospace',
            whiteSpace: 'nowrap',
          },
        },
        primary: `${agreement.id}`,
        secondary: <span>
          created <Timestamp at={agreement.createdAt}/>
        </span>
      }}/>
    </ListItemButton>
  </ListItem>
}



function LookupAgreementForm({ disabled, ...props }){
  const [id, setId] = useState('')
  const submittable = id && /^[a-z0-9]{63}$/.test(id)
  return <Box
    {...props}
    component="form"
    onSubmit={event => {
      event.preventDefault()
      props.onSubmit(id)
    }}
  >
    <FormControl fullWidth sx={{my: 2}}>
      <TextField
        autoFocus
        label="Agreement ID"
        placeholder="kjzl6cwe1jw148qlksigdqvn0ho7p81buk9370isxq0xi4kbbaczgvxfkpopikt"
        variant="outlined"
        value={id}
        onChange={e => setId(e.target.value)}
      />
    </FormControl>

    <ButtonRow>
      <Button
        type="submit"
        variant="contained"
        disabled={disabled || !submittable}
      >{`Lookup`}</Button>
    </ButtonRow>
  </Box>
}
