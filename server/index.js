import Path from 'path'
import express from 'express'
import env from '../environment.js'
import routes from './routes.js'

const app = express()

export default app

app.start = function(){
  app.server = app.listen(env.PORT, () => {
    const { port } = app.server.address()
    const host = `http://localhost:${port}`
    console.log(`Listening on port ${host}`)
  })
}

app.use(async (req, res, next) => {
  console.log(`${req.method} ${req.url}`)
  next()
})

app.use(routes)

router.use((error, req, res, next) => {
  console.error('ERROR', error)
  res.status(error.statusCode || 500).json({
    error: {
      message: error.message,
      stack: error.stack,
    }
  })
})
