import jayson from 'jayson/promise/index.js'
import Router from 'express-promise-router'
import bodyParser from 'body-parser'

import Agent from '../Agent/index.js'
import { JlinxClient } from '../jlinx.js'

const procedures = {

  async status (){
    return { ok: true }
  },

  async ping (args) {
    return { pong: args }
  },

  async throw (errorMessage) {
    console.log('???', this.error(-32602))
    throw new Error(`${errorMessage}`)
  },

  async fail(){
    return this.error(-32602)
  },
}

const server = new jayson.server(procedures, {
  // all methods will receive a context object as the second arg
  useContext: true
});

console.log(server.errorMessages)

const router = Router()

router.use(bodyParser.json({
  limit: 102400 * 10,
}))

router.post('/', function(req, res, next) {
  console.log('RPC', req.method, req.url)
  server.call(
    req.body,
    {
      headers: req.headers
    },
    (error, result) => {
      console.log('RPC', { error, result })
      if (error) {
        // return next(error)
        res.status(400)
        res.send({ error })
      }else{
        res.send(result || {})
      }
    }
  )
})

router.post('/', async (req, res) => {
  res.json({ success: true })
})

export default router


