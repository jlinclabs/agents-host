import fs from 'node:fs'
import Path from 'node:path'
import { createServer } from 'vite'
import env from '../env.js'

export default async function createViteServer(app){
  const ROOT = env.APP_ROOT + '/client'
  console.log('using local Vite server', ROOT)

  const resolve = p => Path.resolve(ROOT, p)

  const indexProd = env.isProd
    ? fs.readFileSync(resolve('dist/client/index.html'), 'utf-8')
    : ''

  const vite = await createServer({
    root: env.APP_ROOT + '/client',
    logLevel: 'error', // 'info'
    server: {
      middlewareMode: true,
      watch: {
        // During tests we edit the files too fast and sometimes chokidar
        // misses change events, so enforce polling for consistency
        usePolling: true,
        interval: 100
      },
      // hmr: {
      //   port: hmrPort
      // }
    },
    appType: 'custom'
  })

  app.use(vite.middlewares)

  app.use('*', async (req, res) => {
    try {
      const url = req.originalUrl

      let template, render
      if (!env.isProd) {
        // always read fresh template in dev
        template = fs.readFileSync(resolve('index.html'), 'utf-8')
        template = await vite.transformIndexHtml(url, template)
        render = (await vite.ssrLoadModule('/src/entry-server.jsx')).render
      } else {
        template = indexProd
        // @ts-ignore
        render = (await import('./dist/server/entry-server.js')).render
      }

      const context = {}
      const appHtml = render(url, context)

      if (context.url) {
        // Somewhere a `<Redirect>` was rendered
        return res.redirect(301, context.url)
      }

      const html = template.replace(`<!--app-html-->`, appHtml)

      res.status(200).set({ 'Content-Type': 'text/html' }).end(html)
    } catch (e) {
      !env.isProd && vite.ssrFixStacktrace(e)
      console.log(e.stack)
      res.status(500).end(e.stack)
    }
  })

}
