import Path from 'path'
import Router from 'express-promise-router'
import { packageDirectory } from 'pkg-dir'
import { pathToRegexp, match, parse, compile } from 'path-to-regexp'
import { glob } from 'glob'

export default class CQRPC {

  constructor({ actions }){
    this.__actions = actions
    this.routes = new Router()
  }

  createSession(){

  }
}

export async function importActions(opts){
  const rootPath = await packageDirectory()
  const matcher = pathToRegexp(opts.match)
  const paths = await glob(opts.glob, { ignore: 'node_modules/**' })
  console.log({ paths })

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
  console.log({ actions })
  return actions
}

class Session {

}