import Router from 'express-promise-router'
import bodyParser from 'body-parser'

import Agent from './Agent/index.js'
import { JlinxClient } from './jlinx.js'

const router = Router()

router.use(bodyParser.json({
  limit: 102400 * 10,
}))

router.post('/', async (req, res) => {
  res.json({ success: true })
})

export default router
