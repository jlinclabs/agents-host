import uploads from 'app-shared/server/uploads.js'
import ceramicRestApi from './ceramicRestApi.js'
import jlinxAgentApi from './jlinxAgentApi.js'
import jlinxApp from './jlinxApp.js'

export default router => {
  router.get('/.well-known/did.json', async (req, res) => {
    res.json(await jlinxApp.getDIDDocument())
  })
  router.use(uploads({
    urlPathPrefix: '/api/uploads',
    storagePath: process.env.UPLOADS_PATH
  }))
  router.use('/api/jlinx/v1', jlinxAgentApi)
  router.use('/api/ceramic', ceramicRestApi)
  router.get('/api/custom/route', (req, res, next) => {
    res.json({ this_was: 'a custom route', now: Date.now() })
  })
}
