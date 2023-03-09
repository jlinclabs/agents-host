
import { promisify } from 'node:util'
import Path from 'path'
import express from 'express'
import Router from 'express-promise-router'
import bodyParser from 'body-parser'
// import expressSession from 'express-session'
// import pinoHTTP from 'pino-http'

import env from '../env.js'
import { renderErrorAsJSON } from './render.js'
import { assetsRoutes, indexHtmlFallback } from './assets.js'
import expressErrorHandler from './http/express-error-handler.js'
import didRoutes from './modules/dids/routes.js'
import authRoutes from './modules/auth/routes.js'
import uploadsRoutes from './modules/uploads/routes.js'

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

// app.use(pinoHTTP())
routes.use((req, res, next) => {
  res.set('Cache-Control', 'no-cache')
  next()
})

routes.use(didRoutes)
routes.use(assetsRoutes)

routes.get('/api/status', (req, res, next) => {
  res.json({ ok: true })
})
// app.use('/api/', express.urlencoded({
//   extended: true,
// }))

// app.use('/api/', bodyParser.json({
//   limit: 102400 * 10,
// }))


let requestIdSequence = 0
app.use((req, res, next) => {
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

app.use(authRoutes)
app.use(uploadsRoutes)

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

app.use(indexHtmlFallback)
app.use(expressErrorHandler)

