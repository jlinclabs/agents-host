import uploads from 'app-shared/server/uploads.js'
import ceramicRestApi from './ceramicRestApi.js'
import jlinxAgentApi from './jlinxAgentApi.js'
import jlinxApp from './jlinxApp.js'
import { subscribeToNotificationsForUser } from './notifications.js'

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

  router.get('/api/notifications', async (req, res) => {
    const observable = await subscribeToNotificationsForUser(req.context.userId, req.context)
    streamServerSentEvents(req, res, observable)
  })
}



function streamServerSentEvents(req, res, observable){
  console.log('🚒 STARTING SSE STREAM!')
  let closed = false
  let subscription
  const close = () => {
    closed = true
    res.end()
    if (subscription) subscription.unsubscribe();
  }

  req.on('end', () => {
    console.log('🚒 http request end')
  })
  req.on('close', () => {
    console.log('🚒 http request closed')
    close()
  })
  res.socket.on('close', function () {
    // res.on('close', () => {
    console.log('🚒 res.socket closed')
    close()
  })

  res.set({
    'Cache-Control': 'no-cache',
    'Content-Type': 'text/event-stream',
    Connection: 'keep-alive'
  })
  res.flushHeaders()
  try{
    setInterval( // keep alice
      () => {
        res.write(`: keepalive\n\n`)
      },
      1000
    )
    subscription = observable.subscribe({
      next(event) {
        console.error('🚒 sse event', event)
        // console.log('CLOSED?', [res.socket])
        res.write(`data: ${JSON.stringify(event)}\n\n`)
      },
      error(error) {
        console.error('🚒 sse observer error', error)
        // console.log('CLOSED?', [res.socket])
        close()
      },
      complete() {
        console.log('🚒 observer completed')
        close()
      },
    })
  }catch (error) {
    console.error('🚒 ERRRRR', error)
    close()
  }
}