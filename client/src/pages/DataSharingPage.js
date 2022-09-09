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
import CeramicStreamEvents from '../components/CeramicStreamEvents'
import InspectObject from '../components/InspectObject'

export default function Agreements() {
  return <Container maxwidth="lg">
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/request" element={<Offer />} />
      <Route path="/sign" element={<Sign />} />
      <Route path="/:id" element={<Show />} />
    </Routes>
  </Container>
}

function Index(props) {
  return <Container maxwidth="md">
    <Container maxWidth="sm">
      <Typography my={2} variant="h3">Data Sharing Agreements</Typography>
      <Typography my={2} variant="h6">Share data with other JLINX agents</Typography>
      <Stack spacing={2} sx={{maxWidth: '400px'}}>
        <Button
          variant="contained"
          component={Link}
          to="/data-sharing/request"
        >{`Request Data`}</Button>
        <Button
          variant="contained"
          component={Link}
          to="/data-sharing/sign"
          sx={{ml: 1}}
        >{`View An Data Request`}</Button>
      </Stack>

      <MyDataSharingAgreementsList />
    </Container>
  </Container>
}

function Show() {
  const { id } = useParams()
  const [sisa, { loading, error, reload: reloadAgreement }] = useAgreement(id)

  if (error) return <ErrorMessage {...{ error }}/>
  return <Container maxwidth="md">
    {
      error ? <ErrorMessage {...{ error }}/> :
      sisa ? <Agreement {...{ sisa }}/> :
      <CircularProgress/>
    }
  </Container>
}

function Offer({ router }) {
  const [agreement, setAgreement] = useStateObject({
    requestedData: [
      { description: 'Name', type: 'text' },
      { description: 'Email', type: 'email' },
      { description: 'Mobile', type: 'phone number' },
    ]
  })

  console.log(`AGREEMENT: ${JSON.stringify(agreement, null, 2)}`)

  return <Container maxwidth="lg">
    <OfferAgreementForm {...{
      router,
      agreement,
      setAgreement,
    }}/>
    <PreviewAgreementForm {...{
      router,
      agreement
    }}/>
  </Container>
}

function OfferAgreementForm({ agreement, setAgreement }){
  const navigate = useNavigate()
  // const [sisaUrl, setAgreementUrl] = useState('https://sisas.io/sisa-suyF9tPmVrtuuLn3R4XdzGXMZN6aFfCIXuXwGpAHtCw.md')
  // const [identifierId, setIdentifierId] = useState('')
  const identifierId = agreement.offererDid
  const setIdentifierId = did =>
    setAgreement(agreement => {
      agreement.offererDid = did
      return agreement
    })
  // const [requestedDataFields, setRequestedDataFields] = useState([
  //   { description: 'Name', type: 'text' },
  //   { description: 'Email', type: 'email' },
  //   { description: 'Mobile', type: 'phone number' },
  // ])

  const addRequestedDataField = () => {
    setAgreement(agreement => {
      agreement.requestedData = [
        ...agreement.requestedData,
        {
          description: `field #${agreement.requestedData.length}`,
          type: 'text',
        }
      ]
      return agreement
    })
    // TODO focus new field
  }

  const removeRequestedDataField = (index) => {
    setAgreement(agreement => {
      agreement.requestedData = [...agreement.requestedData]
      agreement.requestedData.splice(index, 1)
      return agreement
    })
  }

  const updateRequestedDataField = (index, changes) => {
    setAgreement(agreement => {
      agreement.requestedData = [...agreement.requestedData]
      const rd = agreement.requestedData[index]
      agreement.requestedData[index] = {...rd, ...changes}
      return agreement
    })
  }

  // const offerAgreement = useOfferAgreement({
  const offerAgreement = useAction('agreements.offer', {
    onSuccess(agreement){
      setAgreement(undefined, true)
      navigate(`/data-sharing/${agreement.id}`)
    },
  })

  const disabled = offerAgreement.pending

  const addNewFieldButton = (
    <Button
      variant="contained"
      onClick={addRequestedDataField}
    >ADD NEW FIELD</Button>
  )

  return <Paper {...{
    elevation: 3,
    component: 'form',
    sx: { p: 2, m: 1 },
    onSubmit(event){
      event.preventDefault()
      offerAgreement({agreement})
    }
  }}>
    <Typography component="h1" variant="h3" sx={{mb: 3}}>
      Request Data
    </Typography>

    <Typography variant="body1" sx={{mt: 2}}>
      Conditions
    </Typography>

    <Stack spacing={2} direction="column" alignItems="flex-start">
      {AGREEMENT_CONDITONS.map((con, index) =>
        <Box key={index}>
          <Stack direction="row" alignItems="center">
            <Switch />
            <Box>
              <Typography variant="h6">{con.title}</Typography>
              <Typography variant="body2">{con.description}</Typography>
            </Box>
          </Stack>
        </Box>
      )}
    </Stack>

    <Typography variant="body1" sx={{mt: 2}}>
      Requested data fields:
    </Typography>

    {agreement.requestedData.length === 0 &&
      <Stack alignItems="center" sx={{my: 2}}>
        <Typography variant="h6">
          Click {addNewFieldButton} to define the data you request
        </Typography>
      </Stack>
    }

    {agreement.requestedData.map((requestedDataField, index) =>
      <Stack flexDirection="row" my={1} alignItems="center">
        <TextField
          sx={{flex: '3 3', mr: 1}}
          value={requestedDataField.description}
          onChange={event => { updateRequestedDataField(index, {description: event.target.value}) }}
        />
        <RequestedDataFieldTypeSelect
          sx={{flex: '1 1'}}
          value={requestedDataField.type}
          onChange={event => { updateRequestedDataField(index, {type: event.target.value}) }}
        />
        <Button
          tabIndex={-1}
          onClick={() => { removeRequestedDataField(index) }}
        >
          <HighlightOffIcon/>
        </Button>
      </Stack>
    )}

    <Stack flexDirection="row-reverse" sx={{mb: 2}}>
      {addNewFieldButton}
    </Stack>

    {offerAgreement.error && <ErrorMessage error={offerAgreement.error} />}
    <Box sx={{display: 'flex', justifyContent: 'flex-end'}}>
      <Button type="submit" variant="contained">{`Create`}</Button>
    </Box>
  </Paper>
}

const AGREEMENT_CONDITONS = [
  {
    title: 'Will delete upon request',
    description: (
      `The offerer of this agreement agrees to ` +
      `delete this data entierly upon request. ` +
      `Quis tempor aliquip nostrud consequat cupidatat cupidatat eiusmod ` +
      `velit elit nisi magna duis voluptate. Consectetur aliqua cupidatat ` +
      `exercitation culpa incididunt proident aliquip veniam deserunt enim ` +
      `exercitation veniam aliquip.`
    )
  },
  {
    title: 'Data will be sold to highest bidder',
    description: (
      `The offerer of this agreement has the right ` +
      `to sell your data to whomever they want whenever. ` +
      `Tempor aliquip cupidatat cupidatat eiusmod ` +
      `velit elit nisi magna duis voluptate. Consectetur aliqua cupidatat ` +
      `exercitation culpa veniam deserunt enim ` +
      `exercitation veniam aliquip.`
    )
  },
  {
    title: 'Can share anonymously',
    description: (
      `The offerer of this agreement has the right ` +
      `to sell your data to whomever they want whenever. ` +
      `Lupidatat cupidatat eiusmod ` +
      `velit elit nisi magna duis voluptate. Consectetur aliqua cupidatat ` +
      `exercitation culpa incididunt proident aliquip veniam deserunt enim ` +
      `exercitation veniam aliquip.`
    )
  },
  {
    title: 'Can share agregate',
    description: (
      `The offerer of this agreement has the right ` +
      `to sell your data to whomever they want whenever. ` +
      `Consectetur aliqua cupidatat ` +
      `exercitation culpa incididunt proident aliquip veniam deserunt enim ` +
      `exercitation veniam aliquip.`
    )
  },
]

function RequestedDataFieldTypeSelect(props){
  const types = ['text', 'number', 'email', 'phone number']
  return <Select {...props}>
    {types.map(type => {
      return <MenuItem key={type} value={type}>
        <Stack spacing={2} direction="row" alignItems="center">
          <Typography component="span" variant="body2">{type}</Typography>
        </Stack>
      </MenuItem>
    })}
  </Select>
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
      // navigate(`/sisas/sign?id=${encodeURIComponent(sisaId)}`)
      setId(sisaId)
    }
  }}>
    <Typography component="h1" variant="h3">
      Sign a Agreement
    </Typography>
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
    <Box sx={{display: 'flex', justifyContent: 'flex-end'}}>
      <Button type="submit" variant="contained">{`Lookup Data Request`}</Button>
    </Box>
  </Paper>
}


function SignAgreementOfferingForm({ sisaId }){
  const navigate = useNavigate()
  const [identifierId, setIdentifierId] = useState('')

  const [sisa, { loading, error }] = useAgreement(sisaId)
  const signAgreement = useSignAgreement({
    onSuccess({ signatureId }){
      console.log('SIGNED', { signatureId })
      navigate(`/sisas/${sisaId}`)
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
      Sign Data Request
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


function Agreement({ sisa }){

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


    <Box my={2}>
      <Typography variant="h6">ID</Typography>
      <Link to={`/sisas/${sisa.id}`}>{sisa.id}</Link>
      <LinkToCeramicApi endpoint={sisa.id}/>
    </Box>

    <Box my={2}>
      <Typography variant="h6">Offered by</Typography>
      <LinkToDid did={sisa.offerer}/>
    </Box>


    {/* <Box my={2}>
      <Typography variant="h6">Offered at</Typography>
      <Timestamp at={sisa.createdAt}/>
    </Box> */}

    <Box my={2}>
      <Typography variant="h6">Requested Data</Typography>

      <ul>
        {agreement.requestedData.map(({ type, description }) =>
          <Box component="li">
            <Typography component="span" variant="body1">{description}</Typography>
            <Typography component="span" variant="body1"> ({type})</Typography>
          </Box>
        )}
      </ul>
    </Box>


    {sisa.state === 'offered'
      ? <Box my={2}>
        <Typography variant="h6" sx={{mt: 2}}>
          Give this ID to the parties you want to sign this sisa:
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
          <input type="text" readOnly value={sisa.id} onClick={e => { e.target.select() }}/>
        </Box>
      </Box>
      : null
    }

    {sisa.state === 'signed' && <>
      <Typography variant="h6">Signed by</Typography>
      <LinkToDid did={sisa.signer}/>

      {/* <Paper elevation={2}>
        <IdentifierProfile identifierId={sisa.signer}/>
      </Paper> */}
    </>}

    {/* <InspectObject object={sisa}/> */}
    {/* <Typography variant="h6">Events</Typography>
    <CeramicStreamEvents id={sisa.id}/> */}
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


function MyDataSharingAgreementsList(){
  const {view: myAgreements, error} = useView('agreements.mine')

  return (
    <List sx={{
      width: '100%',
      // bgcolor: 'background.paper',
      // flexGrow: 1,
    }}>
      <ErrorMessage {...{error}}/>
      {myAgreements ||
        Array(3).fill().map((_, i) =>
          <Skeleton key={i} animation="wave" height="100px" />
        )
      }
      {myAgreements && (
        myAgreements.length === 0
          ? <span>You dont have any agreements</span>
          : [...myAgreements].sort(sorter).map(sisa =>
            <MyAgreement key={sisa.id} sisa={sisa}/>
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

function MyAgreement({ sisa }){
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
      to: `/sisas/${sisa.id}`
    }}>
      <ListItemIcon><ArticleOutlinedIcon/></ListItemIcon>
      <ListItemText {...{
        primaryTypographyProps: {
          sx: {
            fontFamily: 'monospace',
            whiteSpace: 'nowrap',
          },
        },
        primary: `${sisa.id}`,
        secondary: <span>
          created <Timestamp at={sisa.createdAt}/>
        </span>
      }}/>
    </ListItemButton>
  </ListItem>
}
