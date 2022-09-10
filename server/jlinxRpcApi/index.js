
import Path from 'path'
import { fileURLToPath } from 'url'
import jayson from 'jayson/promise/index.js'
import Router from 'express-promise-router'
import readDirRecursive from 'recursive-readdir'
import Session from '../Session.js'

const procedures = {

  async __rpc_inspect (args, context) {
    return {
      procedures: Object.keys(procedures)
    }
  },

}

await (async () => {
  const imports = await importProcedures()

  console.log({imports})
  async function callImport(name, ...args){
    console.log(callImport, { name, import: imports[name] })
    console.log(`jlinx rpc call "${name}"`, args[0])
    try{
      let result = await imports[name](...args)
      if (process.env.NODE_ENV !== 'production'){
        result = JSON.parse(JSON.stringify(result))
      }
      return result
    }catch(error){
      console.error(`jlinx rpc error "${name}"`, error)
      const data = {}
      if (process.env.NODE_ENV === 'development'){
        data.message = error.message
        data.stack = error.stack
      }
      throw server.error(-32603, 'Internal error', data)
    }
  }

  for (const name in imports) {
    procedures[name] = (...args) => callImport.call(this, name, ...args)
  }
})()

console.log({ procedures })

const server = new jayson.server(procedures, {
  // all methods will receive a context object as the second arg
  useContext: true
});
// console.log(server.errorMessages)

const router = Router()

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




async function importProcedures(){
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
  paths.forEach(({path, parts}, index) => {
    const name = parts[1].replace('/', '.')
    let module = modules[index]
    if (typeof module.default === 'object'){
      module = module.default
    }
    for (const key in module){
      if (key === 'default'){
        procedures[name] = module.default
      }else{
        procedures[`${name}.${key}`] = module[key]
      }
    }
  })
  return procedures
}
