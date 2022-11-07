import uploads from 'app-shared/server/uploads.js'
import wait from 'app-shared/shared/wait.js'
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
  //
  //
  // router.get('/api/notifications/next', async (req, res) => {
  //   const ids = new Set()
  //   const getNew = async () => {
  //     const { notifications } = await req.context.queries.notifications.getAll()
  //     console.log({ notifications })
  //     const newNotifications = notifications.filter(n => !ids.has(n.id))
  //     newNotifications.forEach(n => ids.add(n.id))
  //     console.log({ newNotifications })
  //     return newNotifications
  //   }
  //   await getNew()
  //   let newNotifications = []
  //   while (newNotifications.length === 0) {
  //     newNotifications = await getNew()
  //     if (newNotifications.length > 0) {
  //       res.json({ newNotifications })
  //       break;
  //     }
  //     await wait(500)
  //   }
  // })
}
