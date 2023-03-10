

import { promisify } from 'node:util'
import Path from 'path'
import express from 'express'
import Router from 'express-promise-router'
import bodyParser from 'body-parser'
// import expressSession from 'express-session'
// import pinoHTTP from 'pino-http'

import env from '../env.js'
import { renderErrorAsJSON } from './render.js'
import { routes as cqprcRoutes } from './cqrpc.js'
import { assetsRoutes } from './assets.js'
import expressErrorHandler from './http/express-error-handler.js'
import didRoutes from './mod/dids/routes.js'
import authRoutes from './mod/auth/routes.js'
import uploadsRoutes from './mod/uploads/routes.js'

const app = express()
const routes = new Router
app.use(routes)
export { app, routes }

app.start = function(){
  app.server = app.listen(env.PORT, () => {
    const { port } = app.server.address()
    // const host = `http://localhost:${port}`
    console.log(`Listening on port ${env.ORIGIN}`)
  })
}

let requestIdSequence = 0
routes.use((req, res, next) => {
  req.uuid = requestIdSequence++
  req.log = (...args) => {
    console.log(`http.req(${req.uuid})`, ...args)
  }
  req.logError = (...args) => {
    console.error(`http.req(${req.uuid})`, ...args)
  }
  req.log(`${req.protocol} ${req.method} ${req.url}`, {
    // headers: req.headers,
    body: req.body,
    query: req.query,
    params: req.params,
    // sessionId: req.session.id,
    // session: {...req.session},
  })
  next()
})

// app.use(pinoHTTP())
routes.use((req, res, next) => {
  res.set('Cache-Control', 'no-cache')
  next()
})

routes.get('/api/status', (req, res, next) => {
  res.json({ ok: true })
})

routes.use('/api/cqrpc', cqprcRoutes)

// `
// /api/get/session
// /api/sub/session
// /api/sub/notifications
// /api/call/session.signOut
// /api/call/notifications.clear
// /api/get/notifications.byId?o={id:'xyz'}
// /api/sub/documents.byId?o={id:'xyz'}

// -- OR --

// GET /api/session
// POST /api/session.signIn {"email":"x@example.com"}
// GET /api/things.byId?o={"id":"asdsdadsadasdsa"}
// GET /api/things.byId?o={"id":"asdsdadsadasdsa"}&sub=1 // subscribe via SSE
// `

// routes.use('/api/', express.urlencoded({
//   extended: true,
// }))

// routes.use('/api/', bodyParser.json({
//   limit: 102400 * 10,
// }))
// routes.use(didRoutes)
// app.use(authRoutes)
// app.use(uploadsRoutes)

routes.use('/api', (req, res, next) => {
  res.status(404).send({
    error: 'resource not found',
    success: false,
  })
})
// app.use('/api', passport.authenticate('session'))

// app.use('/api', (req, res, next) => {
//   req.context = new Session({
//     id: req.session.id,
//     value: req.user,
//     readOnly: req.method !== 'POST',
//     onLogout: promisify(req.logout.bind(req)),
//     onLogin: promisify(req.login.bind(req)),
//   })
//   req.context.req = req
//   req.context.res = res
//   req.log('🍪', {
//     // sessionId: req.session.id,
//     // 'req.user': req.user,
//     Session: req.context,
//   })
//   next()
// })

// app.use(passportRoutes)
// // app.use(oidcProviderRoutes)
// app.use(CQRPCRoutes)


routes.use(assetsRoutes)
routes.use(expressErrorHandler)

