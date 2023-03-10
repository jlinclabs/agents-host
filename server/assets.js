import Path from 'path'
import express from 'express'
import Router from 'express-promise-router'
import { createProxyMiddleware, responseInterceptor } from 'http-proxy-middleware'

import env from '../env.js'

const assetsRoutes = new Router

// proxy requests to `parcel serve` process
if (process.env.CLIENT_SERVER_PORT){
  const parcelUrl = `http://localhost:${process.env.CLIENT_SERVER_PORT}/`

  const parcelProxy = createProxyMiddleware({
    target: parcelUrl,
    changeOrigin: true, // ?
    pathFilter: '/socket',
    ws: true,
  })
  assetsRoutes.use('/assets', parcelProxy)
  assetsRoutes.get('*', function (req, res, next) {
    if (req.xhr || !req.accepts('html')) return next()
    res.set('Cache-Control', 'no-cache')
    req.originalUrl = req.url = '/assets/index.html'
    parcelProxy(req, res, next)
  })

// serve static files
}else{
  assetsRoutes.use(
    express.static(env.BUILD_PATH, {
      setHeaders(res, path, stat){
        console.log('GET ASSET', path)
        // res.setHeader("Cache-Control", "public, max-age=604800, immutable")
        res.set('Cache-Control', 'no-cache')
      }
    })
  )
  const indexPath = Path.join(env.BUILD_PATH, 'index.html')
  assetsRoutes.get('*', function (req, res, next) {
    if (req.xhr || !req.accepts('html')) return next()
    res.set('Cache-Control', 'no-cache')
    res.sendFile(indexPath)
  })
}

export { assetsRoutes }