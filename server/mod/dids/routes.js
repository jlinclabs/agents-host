import Router from 'express-promise-router'
// import jlinxApp from './jlinxApp.js'

const routes = new Router()
export default routes

routes.get('/.well-known/did.json', async (req, res) => {
  // const didDocument = await jlinxApp.getDIDDocument()
  // res.json(didDocument)
  res.json({
    id: 'did:fake:xxxxxx',
  })
})

routes.get('/dids/:id/did.json', async (req, res) => {
  const { id } = req.params
  // TODO support alias too
  const publicKey = id
  const did = `did:key:${publicKey}`
  const record = await req.context.queries.agents.getDIDDocument({ did })
  if (!record) res.status(404).json({})
  const { didDocument } = record
  didDocument.id = `did:web:${req.host}:agents:${publicKey}`
  res.json(didDocument)
})
