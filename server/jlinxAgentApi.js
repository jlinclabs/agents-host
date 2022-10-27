import Debug from 'debug'
import fetch from 'node-fetch'
import Router from 'express-promise-router'

const debug = Debug('jlinx.api')
const router = Router()
export default router

router.post('/login', async (req, res) => {
  console.log('JLINC LOGIN', {
    headers: req.headers,
    body: req.body,
  })
  const domain = req.headers.referer // TODO strip pathname
  const payload = req.body
  console.log('\n\n\n1!!!!!!POST /v1/login', { domain, payload })

  const appIdResponse = await fetch(`https://${domain}/api/jlinx/v1/id`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
  })
  if (!appIdResponse.ok){
    console.log(appIdResponse)
    throw new Error(`failed to get id of requesting app`)
  }
  const appId = await appIdResponse.json()
  console.log({ appId })

  res.json({
    successSoFar: ':D',
    domain,
    payload,
    appId,
  })
})

