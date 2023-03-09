import Path from 'path'
import Router from 'express-promise-router'

import sessionMiddleware from './sessionMiddleware.js'

const routes = new Router()
export default routes

routes.use('/api/', sessionMiddleware)
