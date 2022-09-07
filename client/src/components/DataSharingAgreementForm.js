
function DataSharingAgreementForm({ agreement, setAgreement }){
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
      navigate(`/agreements/${agreement.id}`)
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
      Offer an Agreement
    </Typography>

    <FormControl fullWidth>
      <Typography variant="h7" sx={{mt: 2, mb: 1}}>
        Type:
      </Typography>
      <Select {...{
        name: 'agreementType',
        labelId: 'AgreementTypeInputLabel',
        disabled: true,
        value: 'jlinx-data-sharing-v1'
      }}>
        <MenuItem value="jlinx-data-sharing-v1">
          <Stack spacing={2} direction="row" alignItems="center">
            <Typography component="span" variant="body2">Data Sharing</Typography>
          </Stack>
        </MenuItem>
      </Select>
    </FormControl>

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
      Requested data
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

