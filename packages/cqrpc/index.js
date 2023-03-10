import Path from 'path'
import Router from 'express-promise-router'
import { packageDirectory } from 'pkg-dir'
import { glob, globSync, globStream, globStreamSync, Glob } from 'glob'

export default class CQRPC {

  constructor({ actions }){
    this.__actions = actions
    this.routes = new Router()
  }

}

export async function globActions(expression){
  const rootPath = await packageDirectory()
  const globPath = Path.join(rootPath, expression) // TODO check for abs path before join
  const paths = await glob(globPath, { ignore: 'node_modules/**' })
  console.log({ paths })

  const actions = {}

  for (const path of paths) {
    const rel = Path.relative(rootPath, path)
    let _module
    try{ _module = await import(path) }catch(error){
      throw new Error(`failed to CQRPC action at ${rel}: ${error}`)
    }
    const _function = _module.default
    if (typeof _function !== 'function'){
      throw new Error(`CQRPC action at ${rel} did not export a default function`)
    }
    const filename = Path.basename(path).split(Path.extname(path))[0]
    if (_function.name !== filename){
      throw new Error(
        `CQRPC action at ${rel} exported a default function ` +
        `with the wrong name. Got "${_function.name}" expected "${filename}"`
      )
    }

    actions[rel] = _module.default
  }
  console.log({ actions })
  return actions
}