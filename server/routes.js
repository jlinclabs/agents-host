import bodyParser from 'body-parser'
import express from 'express'
import Router from 'express-promise-router'
import env from '../environment.js'

const router = Router()

export default router

router.use(bodyParser.json({
  limit: 102400 * 10,
}))

router.use(async (req, res, next) => {
  req.session = await Session.open(req, res)
  next()
})

router.get('/api/status', (req, res) => {
  res.send({ ok: true })
})

// router.get('/api/views/*', async (req, res) => {
//   const viewId = req.params[0]
//   const value = await getView({ viewId, session: req.session })
//   res.json({ value })
// })

// router.post('/api/actions/*', async (req, res) => {
//   const actionId = req.params[0]
//   const options = req.body || {}
//   const result = await takeAction({ actionId, session: req.session, options })
//   res.json({ result })
// })


if (env.NODE_ENV === 'production') {
  router.use(express.static('client/build'))
  router.get('/*', function (req, res) {
    res.sendFile(Path.join(env.BUILD_PATH, 'index.html'));
  })
}else{
  // proxy to the dev server
}
