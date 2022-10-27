import Debug from 'debug'
import Router from 'express-promise-router'

const debug = Debug('jlinx.api')
const router = Router()
export default router

router.post('/v1/login', async (req, res) => {
  const domain = req.headers // TODO strip pathname
  const payload = req.body
  console.log('\n\n\n1!!!!!!POST /v1/login', { domain, payload })
  res.json({
    loginViaJlinxTBD: 12121,
  })
})

