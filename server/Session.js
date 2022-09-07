import Cookies from 'cookies'
import sessionResource from './resources/sessionResource.js'
import Agent from './Agent.js'
import { openVault } from './vaults.js'
const COOKIE_NAME = 'session-id'

export default class Session {

  static async open(req, res){
    const session = new Session(req, res)
    if (session.id) await session.reload()
    if (!session.createdAt) {
      console.log('Session create', this.id)
      session._value = await sessionResource.commands.create()
      session._id = session._value.id
      session._cookies.set(COOKIE_NAME, session.id, { httpOnly: true })
    }else{
      await session.touch()
    }
    return session
  }

  constructor(req, res){
    this._cookies = new Cookies(req, res)
    this._id = this._cookies.get(COOKIE_NAME)
  }

  get id(){ return this._id }

  close () {
    if (this._vault) this._vault.close()
  }

  async reload(){
    console.log('Session reload', this.id)
    const sessionRecord = await sessionResource.queries.get(this.id)
    if (!sessionRecord){
      throw new Error(`invalid session id=${this.id}`)
    }
    this._createdAt = sessionRecord.createdAt
    this._lastSeenAt = sessionRecord.lastSeenAt
    this._agentId = sessionRecord.agentId
    if (sessionRecord.agent){
      const { did, didSecret, createdAt, vaultKey } = sessionRecord.agent
      this._agent = await Agent.open({
        did, didSecret, createdAt, vaultKey
      })
    }
  }

  get createdAt(){ return this._createdAt }
  get lastSeenAt(){ return this._lastSeenAt }
  get agent(){ return this._agent }
  // get agentId(){ return this._agentId }
  // get userCreatedAt(){ return this._userCreatedAt }
  // get vault () { return this._vault }
  // get jlinx () { return this._jlinx }

  async touch(){
    console.log('Session touch', this.id)
    await sessionResource.commands.touch(this.id)
  }

  async delete(){
    console.log('Session delete', this.id)
    await sessionResource.commands.delete(this.id)
    this._cookies.set(COOKIE_NAME, undefined)
  }

  async setAgentId(agentId){
    if (this.agentId){ throw new Error(`please logout first`) }
    await sessionResource.commands.setAgentId(this.id, agentId)
    await this.reload()
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
    if (this.agentId) return
    throw new Error(`not logged in`)
  }

  // async useVault(handler){
  //   await this.ensureLoggedIn()
  //   const vault = await openVault(
  //     `user-${this.agentId}`,
  //     this._vaultKey
  //   )
  //   try{
  //     return await handler(vault)
  //   }catch(error){
  //     throw error
  //   // }finally{
  //   //   await vault.close()
  //   }
  // }
}

