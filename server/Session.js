import Debug from 'debug'
import Cookies from 'cookies'
import sessionResource from './resources/sessionResource.js'
import Agent from './Agent.js'
import { openVault } from './vaults.js'
const COOKIE_NAME = 'session-id'

const debug = Debug('session')

export default class Session {

  static async open(req, res){
    debug('OPEN', req.method, req.url)
    const session = new Session(req, res)
    debug('OPEN', 'session.id', session.id)
    if (session.id) await session.load()
    else await session.create()
    return session
  }

  constructor(req, res){
    this._cookies = new Cookies(req, res)
    this._id = this._cookies.get(COOKIE_NAME)
  }

  get id(){ return this._id }

  async create(){
    debug('create')
    const record = await sessionResource.commands.create()
    debug('created', record.id)
    this._cookies.set(COOKIE_NAME, record.id, { httpOnly: true })
    this._id = record.id
    this._createdAt = record.createdAt
    this._lastSeenAt = record.lastSeenAt
  }
  async load(){
    debug('load', this.id)
    const record = await sessionResource.commands.touch(this.id)
    debug('loaded', record)
    this._createdAt = record.createdAt
    this._lastSeenAt = record.lastSeenAt
    if (record.agent){
      const { did, didSecret, createdAt, vaultKey } = record.agent
      this._agent = await Agent.open({
        did, didSecret, createdAt, vaultKey
      })
    }
  }

  async delete(){
    debug('delete', this.id)
    await sessionResource.commands.delete(this.id)
    this._cookies.set(COOKIE_NAME, undefined)
  }

  get createdAt(){ return this._createdAt }
  get lastSeenAt(){ return this._lastSeenAt }
  get agent(){ return this._agent }

  async setAgentId(agentId){
    if (this.agentId){ throw new Error(`please logout first`) }
    await sessionResource.commands.setAgentId(this.id, agentId)
    await this.load()
  }

  [Symbol.for('nodejs.util.inspect.custom')] (depth, opts) {
    let indent = ''
    if (typeof opts.indentationLvl === 'number') { while (indent.length < opts.indentationLvl) indent += ' ' }

    return this.constructor.name + '(\n' +
      indent + '  id: ' + opts.stylize(this.id, 'string') + '\n' +
      indent + '  createdAt: ' + opts.stylize(this.createdAt, 'date') + '\n' +
      indent + '  lastSeenAt: ' + opts.stylize(this.lastSeenAt, 'date') + '\n' +
      indent + '  agentId: ' + opts.stylize(this.agentId, 'number') + '\n' +
      indent + ')'
  }

  async ensureLoggedIn(){
    if (!this.agent) throw new Error(`not logged in`)
  }

}

