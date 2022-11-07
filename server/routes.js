import uploads from 'app-shared/server/uploads.js'
import jlinxAgentApi from './jlinxAgentApi.js'
import jlinxApp from './jlinxApp.js'

export default router => {
  router.get('/.well-known/did.json', async (req, res) => {
    const didDocument = await jlinxApp.getDIDDocument()
    res.json(didDocument)
  })

  router.get('/agents/:publicKey/did.json', async (req, res) => {
    const { publicKey } = req.params
    const { didDocument } = await jlinxApp.resolveDID(`did:key:${publicKey}`)
    didDocument.id = `did:web:${req.host}:agents:${publicKey}`
    res.json(didDocument)
  })

  router.use(uploads({
    urlPathPrefix: '/api/uploads',
    storagePath: process.env.UPLOADS_PATH
  }))
  router.use('/api/jlinx/v1', jlinxAgentApi)
}
