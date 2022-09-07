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
      <Route path="/offer" element={<Offer />} />
      <Route path="/sign" element={<Sign />} />
      <Route path="/:id" element={<Show />} />
    </Routes>
  </Container>
}

function Index(props) {
  return <Container maxwidth="lg">
    <Typography my={2} variant="h3">Agreements</Typography>
    <Typography my={2} variant="h6">Standard Information Sharing Agreemnts</Typography>

    <Stack spacing={2} sx={{maxWidth: '400px'}}>
      <Button
        variant="contained"
        component={Link}
        to="/agreements/offer"
      >{`Offer An Agreement`}</Button>
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
    agreementType: 'jlinx-data-sharing-v1',
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

function OfferAgreementForm(){
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
      Offer an Agreement
    </Typography>
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
      <Button type="submit" variant="contained">{`Lookup Agreement Offering`}</Button>
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


function MyAgreementsList(){
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
