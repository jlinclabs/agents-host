
import { promisify } from 'node:util'
import Path from 'path'
import express from 'express'
import Router from 'express-promise-router'
import bodyParser from 'body-parser'
import expressSession from 'express-session'
// import pinoHTTP from 'pino-http'

import env from '../environment.js'
import { renderErrorAsJSON } from './render.js'
// import Session from './sessions/Session.js'
// import sessionStore from './sessions/store.js'
// import { passport, routes as passportRoutes } from './passport.js'
// import { routes as CQRPCRoutes } from './cqrpc.js'
// import { routes as uploadsRoutes } from './uploads.js'
// import { routes as oidcProviderRoutes } from './oidcProvider.js'
// import './appWebhooks/service.js'

const app = express()
const routes = new Router
app.use(routes)
export { app, routes }

app.start = function(){
  app.server = app.listen(env.PORT, () => {
    const { port } = app.server.address()
    const host = `http://localhost:${port}`
    console.log(`Listening on port ${host}`)
  })
}

// app.use(pinoHTTP())
routes.use((req, res, next) => {
  res.set('Cache-Control', 'no-cache')
  next()
})

// Serve production build
if (env.NODE_ENV === 'production') {
  const buildPath = Path.join(env.APP_PATH, 'client-build')
  app.use(express.static(buildPath, {
    setHeaders(res, path, stat){
      // res.setHeader("Cache-Control", "public, max-age=604800, immutable")
      res.set('Cache-Control', 'no-cache')
    }
  }))
}

app.use('/api/', express.urlencoded({
  extended: true,
}))

app.use('/api/', bodyParser.json({
  limit: 102400 * 10,
}))

app.use('/api/', expressSession({
  name: 'SESSION',
  secret: env.SESSION_SECRET,
  resave: true,
  saveUninitialized: true,
  trustProxy: true,
  cookie: {
    sameSite: false,
    maxAge: 7 * 24 * 60 * 60 * 1000, // ms
    secure: false, // true unless behind reverse proxy
    httpOnly: true,
  },
  store: sessionStore,
}))

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

app.use(uploadsRoutes)

app.use('/api', passport.authenticate('session'))

app.use('/api', (req, res, next) => {
  req.context = new Session({
    id: req.session.id,
    value: req.user,
    readOnly: req.method !== 'POST',
    onLogout: promisify(req.logout.bind(req)),
    onLogin: promisify(req.login.bind(req)),
  })
  req.context.req = req
  req.context.res = res
  req.log('🍪', {
    // sessionId: req.session.id,
    // 'req.user': req.user,
    Session: req.context,
  })
  next()
})

app.use(passportRoutes)
// app.use(oidcProviderRoutes)
app.use(CQRPCRoutes)

// Serve production build
if (env.NODE_ENV === 'production') {
  const indexPath = Path.join(buildPath, 'index.html')
  app.get('/*', function (req, res, next) {
    if (req.xhr) return next()
    // TODO check accepts header for text/html
    res.setHeader("Cache-Control", "public, max-age=604800, immutable")
    res.sendFile(indexPath)
  })
}

app.use((error, req, res, next) => {
  console.error('EXPRESS ERROR', error)
  if (req.xhr) return renderErrorAsJSON(res, error)
  if (!res.headersSent) {
    res.status(500)
    if (req.accepts('json')){
      res.json({ error: { message: 'Something unexpected has happened :/' } })
    }else {
      res.send('Something unexpected has happened :/')
    }
  }else{
    console.error('UNREPORTED ERROR (headers already sent)', error)
  }
})
