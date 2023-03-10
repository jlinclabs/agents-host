import Path from 'path'
import express from 'express'
import Router from 'express-promise-router'
import multer from 'multer'
import { v1 as uuid } from 'uuid'

import env from '../../../env.js'

const urlPathPrefix = '/api/uploads'
const storagePath = env.UPLOADS_PATH
console.log({ storagePath })

const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, storagePath)
    },
    filename: function (req, file, cb) {
      const extension = Path.extname(file.originalname)
      const filename = `${uuid()}${extension}`
      console.log(`WRITING UPLOAD "${filename}"`)
      cb(null, filename)
    },
  })
})

const routes = new Router()

routes.post(`${urlPathPrefix}`,
  upload.single('file'),
  async function (req, res) {
    console.log('UPLOADING FILE', req.file)
    const url = `${req.get('origin')}${urlPathPrefix}/${req.file.filename}`
    console.log('CREATED UPLOAD', {url})
    res.json({url})
  }
)

routes.use(`${urlPathPrefix}`, express.static(storagePath))

export default routes
