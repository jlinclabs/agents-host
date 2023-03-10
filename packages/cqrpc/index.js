import Path from 'path'
import Router from 'express-promise-router'
import { packageDirectory } from 'pkg-dir'
import { pathToRegexp, match, parse, compile } from 'path-to-regexp'
import { glob } from 'glob'
import Debug from 'debug'

const debug = Debug('cqrpc')

export default class CQRPC {

  constructor({ actions }){
    this.actions = actions
    this.routes = generateRoutes(this)
  }

  async get(actionName, options){

  }

  async sub(actionName, options){
    throw new Error(`sub not implemented yet`)
  }

  async call(actionName, options){
    const handler = findAction(this, queryName, 'query')
    if (typeof handler !== 'function')
      throw new InvalidArgumentError('queryName', queryName)
    return await handler.call(this, options)
  }


  createSession(){

  }
}

export async function importActions(opts){
  const rootPath = await packageDirectory()
  const matcher = pathToRegexp(opts.match)
  const paths = await glob(opts.glob, { ignore: 'node_modules/**' })
  const actions = {}
  for (const path of paths) {
    const absPath = Path.join(rootPath, path)
    let _module
    try{ _module = await import(absPath) }catch(error){
      throw new Error(`failed to import CQRPC action at ${path}: ${error}`)
    }
    const _function = _module.default
    if (typeof _function !== 'function'){
      throw new Error(`CQRPC action at ${path} did not export a default function`)
    }
    const filename = Path.basename(path).split(Path.extname(path))[0]
    if (_function.name !== filename){
      throw new Error(
        `CQRPC action at ${path} exported a default function ` +
        `with the wrong name. Got "${_function.name}" expected "${filename}"`
      )
    }
    const [_, namespace, actionName] = matcher.exec(path)
    actions[namespace] ||= {}
    actions[namespace][actionName] = _function
    // actions[path].schema = _module.schema // TODO consider supporting other exports
  }
  return actions
}

function generateRoutes(cqrpc){
  // cqrpc.actions
  const routes = new Router()

  routes.use('/:actionName', async function(req, res, next) {
    res.setHeader("Cache-Control", "no-cache, must-revalidate")

    const { actionName } = req.params

    let action // 'get' | 'call' | 'sub'
    let options
    if (req.method === 'GET'){
      options = JSON.parse(req.query.o || '{}')
      if (req.query.sub){
        action = 'sub'
      }else{
        action = 'get'
      }
    }else if (req.method === 'POST'){
      action = 'call'
      options = req.body
    }else{
      return next()
    }
    const desc = (
      // req.context.actorType + '.' +
      // (isQuery ? 'queries' : 'commands') + '.' +
      action + `(${JSON.stringify(options)})`
    )

    debug('CQRPC: Start', desc)
    try{
      // if (isPrivateAction(action)) return next()
      // const methodName = isQuery ? 'get' : 'do'
      // const result = await req.context[methodName](action, options)
      if (action === 'sub'){
        throw new Error(`sub via SSE not implemented yet`)
      }
      const result = await cqrpc[action](action, options)
      debug(`CQRPC: Success`, desc)
      if (!res.headersSent) res.status(200).json({ result })
    }catch(error){
      debug(`CQRPC: Error`, desc, error)
      next(error)
    }
  })

  return routes
}


class Session {

}


