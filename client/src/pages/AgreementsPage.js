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
import FormGroup from '@mui/material/FormGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Switch from '@mui/material/Switch'
import HighlightOffIcon from '@mui/icons-material/HighlightOff'

import { useStateObject } from '../lib/reactStateHelpers'
import { useAction } from '../lib/actions'
import { useView } from '../lib/views'

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
import InspectObject from '../components/InspectObject'

export default function Agreements() {
  return <Container maxWidth="lg">
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/new" element={<New />} />
      <Route path="/:id" element={<Show />} />
    </Routes>
  </Container>
}

function Index(props) {
  return <Container maxwidth="lg">
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
        to="/agreements/sign"
        sx={{ml: 1}}
      >{`View An Agreement Offering`}</Button>
    </Stack>

    <MyAgreementsList />
  </Container>
}

function Show() {
  const { id } = useParams()
  const { view: agreement, loading, error } = useView(`agreements.${id}`)

  if (error) return <ErrorMessage {...{ error }}/>
  return <Container maxwidth="md">
    {
      error ? <ErrorMessage {...{ error }}/> :
      agreement ? <Agreement {...{ agreement }}/> :
      <CircularProgress/>
    }
  </Container>
}

function New({ router }) {
  const navigate = useNavigate()
  const [agreement, patchAgreement] = useStateObject({
    terms: '',
  })

  const createAgreement = useAction('agreements.create', {
    onSuccess(agreement){
      navigate(`/agreements/${agreement.id}`)
    }
  })
  console.log({ createAgreement })

  console.log(`AGREEMENT: ${JSON.stringify(agreement, null, 2)}`)

  return <Container maxwidth="lg">
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
      Offer an Agreement
    </Typography>

    <ErrorMessage error={error}/>

    <FormControl fullWidth>
      <TextField
        multiline
        label="Agreement Text"
        rows={4}
        maxRows={12}
        value={agreement.terms}
        onChange={e => patchAgreement({ terms: e.target.value })}
      />
    </FormControl>

    <ButtonRow mt={2}>
      <Button
        variant="contained"
        type="submit"
      >Offer</Button>
      <Button
        variant="text"
        component={Link}
        to="/agreements"
      >cancel</Button>
    </ButtonRow>
  </Paper>
}

function PreviewAgreementForm(){
  return <Paper>PREVIEW</Paper>
}

function Sign() {
  const [search, setSearch] = useSearchParams()
  const setId = id => { setSearch({ id }) }
  const sisaId = search.get('id')

  const navigate = useNavigate()
  return <Container maxWidth="lg">
    {sisaId
      ? <SignAgreementOfferingForm {...{ sisaId }}/>
      : <LookupAgreementOfferingForm {...{ setId }}/>
    }
  </Container>
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


function SignAgreementOfferingForm({ sisaId }){
  const navigate = useNavigate()
  const [identifierId, setIdentifierId] = useState('')

  const [sisa, { loading, error }] = useView(sisaId)
  const signAgreement = useSignAgreement({
    onSuccess({ signatureId }){
      console.log('SIGNED', { signatureId })
      navigate(`/agreements/${sisaId}`)
      // setSignatureId(signatureId)
    }
  })
  if (loading) return <span>Loading…</span>
  const disabled = signAgreement.pending
  if (sisa && sisa.state !== 'offered'){
    return <Paper {...{
      elevation: 3,
      sx: { p: 2, mt: 2 },
    }}>
      <Typography component="h1" variant="h3" mb={3}>
        Agreement Already Signed!
      </Typography>

      <InspectObject object={sisa}/>
    </Paper>
  }

  return <Paper {...{
    elevation: 3,
    component: 'form',
    sx: { p: 2, mt: 2 },
    onSubmit(event){
      event.preventDefault()
      signAgreement({
        sisaId,
        identifierId,
      })
    }
  }}>
    <ErrorMessage error={error}/>
    <Typography component="h1" variant="h3" mb={3}>
      Sign Agreement Offering
    </Typography>

    <Box>
      <LinkToCeramicApi endpoint={sisa.id}/>
    </Box>

    <Typography paragraph>
      <LinkToDid did={sisa.offerer}/>
      {`would like you to share:`}
    </Typography>

    <ul>
      {agreement.requestedData.map(({ type, description }) =>
        <Box component="li">
          <Typography component="span" variant="body1">{description}</Typography>
          <Typography component="span" variant="body1"> ({type})</Typography>
        </Box>
      )}
    </ul>

    {/* <Paper elevation={2} sx={{p: 2, m: 2}}>
      <IdentifierProfile identifierId={sisa.offerer}/>
    </Paper> */}


    <Typography variant="body1" sx={{my: 2}}>
      Which identifier do you want to sign this sisa as?
    </Typography>
    <IdentifierSelectInput {...{
      autoFocus: true,
      value: identifierId,
      onChange: setIdentifierId,
    }}/>
    <Box sx={{display: 'flex', justifyContent: 'flex-end'}}>
      <Button type="submit" variant="contained">{`Sign Agreement`}</Button>
    </Box>
  </Paper>
}


function Agreement({ agreement }){
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
      <Timestamp at={agreement.createdAt}/>
    </Box>

    <Typography variant="h6">Terms:</Typography>
    <FormControl
      fullWidth
      sx={{}}
    >
      <TextField
        multiline
        readOnly
        value={agreement.terms}
        rows={4}
      />
    </FormControl>

    {agreement.state === 'offered' &&
      <Box my={2}>
        <Typography variant="h6" sx={{mt: 2}}>
          Give this ID to the parties you want to sign this agreement:
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

    {agreement.state === 'signed' &&
      <>
        <Typography variant="h6">Signed by</Typography>
        <LinkToDid did={agreement.signer}/>

        {/* <Paper elevation={2}>
          <IdentifierProfile identifierId={sisa.signer}/>
        </Paper> */}
      </>
    }
  </Paper>
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

  console.log({ myAgreements })
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
