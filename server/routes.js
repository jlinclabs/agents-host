import uploads from 'app-shared/server/uploads.js'
import ceramicRestApi from './ceramicRestApi.js'
import jlinxAgentApi from './jlinxAgentApi.js'

export default router => {
  router.use(uploads({
    urlPathPrefix: '/api/uploads',
    storagePath: process.env.UPLOADS_PATH
  }))
  router.use('/api/jlinx', jlinxAgentApi)
  router.use('/api/ceramic', ceramicRestApi)
  router.get('/api/custom/route', (req, res, next) => {
    res.json({ this_was: 'a custom route', now: Date.now() })
  })
}
