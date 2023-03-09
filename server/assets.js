import Path from 'path'
import express from 'express'
import Router from 'express-promise-router'
import { createProxyMiddleware } from 'http-proxy-middleware'

import env from '../env.js'

let assetsRoutes, indexHtmlFallback

// proxy requests to `parcel serve` process
if (process.env.CLIENT_SERVER_PORT){
  const parcelUrl = `http://localhost:${process.env.CLIENT_SERVER_PORT}/`
  const parcelHTTPProxy = createProxyMiddleware('/assets', {
    target: parcelUrl,
    changeOrigin: true,
  })
  const parcelWSProxy = createProxyMiddleware({
    target: parcelUrl,
    changeOrigin: true, // ?
    pathFilter: '/socket',
    ws: true,
  })
  assetsRoutes = new Router
  assetsRoutes.use(parcelHTTPProxy)
  assetsRoutes.use(parcelWSProxy)
  // assetsRoutes.on('upgrade', parcelWSProxy.upgrade) // <-- subscribe to http 'upgrade'

  indexHtmlFallback = new Router
  indexHtmlFallback.get('*', function (req, res, next) {
    if (req.xhr || !req.accepts('html')) return next()
    res.set('Cache-Control', 'no-cache')
    req.originalUrl = req.url = '/assets/index.html'
    parcelProxy(req, res, next)
  })

// serve static files
}else{
  assetsRoutes = express.static(env.BUILD_PATH, {
    setHeaders(res, path, stat){
      console.log('GET ASSET', path)
      // res.setHeader("Cache-Control", "public, max-age=604800, immutable")
      res.set('Cache-Control', 'no-cache')
    }
  })
  const indexPath = Path.join(env.BUILD_PATH, 'index.html')
  const indexHtmlFallback = new Router()
  indexHtmlFallback.get('*', function (req, res, next) {
    if (req.xhr || !req.accepts('html')) return next()
    res.set('Cache-Control', 'no-cache')
    res.sendFile(indexPath)
  })
}

export { assetsRoutes, indexHtmlFallback }