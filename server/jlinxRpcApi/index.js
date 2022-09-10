import Path from 'path'
import { fileURLToPath } from 'url'
import jayson from 'jayson/promise/index.js'
import Router from 'express-promise-router'
import bodyParser from 'body-parser'
import readDirRecursive from 'recursive-readdir'

import Agent from '../Agent/index.js'
import { JlinxClient } from '../jlinx.js'
import Session from '../Session.js'


const procedures = await (async () => {
  // TODO reduce this function to some helpers
  const __dirname = Path.dirname(fileURLToPath(import.meta.url))
  const root = __dirname + '/procedures'
  const paths = (await readDirRecursive(root))
    .map(path => Path.relative(root, path))
    .map(path => ({
      path,
      parts: path.match(/(.+).js$/),
    }))
    .filter(({parts}) => parts)
  const modules = await Promise.all(
    paths.map(({path}) => import('./procedures/' +  path))
  )
  const procedures = {}

  const set = (name, func) => {
    procedures[name] = async (...args) => {
      console.log(`jlinx rpc call "${name}"`, args)
      try{
        return await func(...args)
      }catch(error){
        console.error(`jlinx rpc error "${name}"`, error)
        throw error
      }
    }
  }

  paths.forEach(({path, parts}, index) => {
    const name = parts[1].replace('/', '.')
    const module = modules[index]
    for (const key in module){
      if (key === 'default'){
        // procedures[name] = module.default
        set(name, module.default)
      }else{
        // procedures[`${name}.${key}`] = module[key]
        set(`${name}.${key}`, module[key])
      }
    }
  })
  return procedures
})()

console.log({ procedures })


const server = new jayson.server(procedures, {
  // all methods will receive a context object as the second arg
  useContext: true
});

// console.log(server.errorMessages)

const router = Router()

router.use(bodyParser.json({
  limit: 102400 * 10,
}))

router.post('/', async function(req, res, next) {

  const session = await Session.open(req, res)
  console.log('RPC', req.body, session)
  server.call(
    req.body,
    {
      headers: req.headers,
      session: session,
      agent: session.agent,
    },
    (error, result) => {
      console.log('RPC', { error, result })
      if (error) {
        // return next(error)
        res.status(400)
        res.send({ error })
      }else{
        res.send(result || {})
      }
    }
  )
})

router.post('/', async (req, res) => {
  res.json({ success: true })
})

export default router


