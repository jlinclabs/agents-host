import Cookies from 'cookies'
import sessionResource from './resources/sessionResource.js'
import { Vault } from './vaults.js'
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

  async reload(){
    console.log('Session reload', this.id)
    const sessionRecord = await sessionResource.queries.get(this.id)
    if (!sessionRecord){
      throw new Error(`invalid session`)
    }
    this._createdAt = sessionRecord.createdAt
    this._lastSeenAt = sessionRecord.lastSeenAt
    this._userId = sessionRecord.userId
    if (sessionRecord.user){
      this._userCreatedAt = sessionRecord.user.createdAt
      this._vaultKey = sessionRecord.user.vaultKey
    }
  }

  get createdAt(){ return this._createdAt }
  get lastSeenAt(){ return this._lastSeenAt }
  get userId(){ return this._userId }
  get userCreatedAt(){ return this._userCreatedAt }

  async touch(){
    console.log('Session touch', this.id)
    await sessionResource.commands.touch(this.id)
  }

  async delete(){
    console.log('Session delete', this.id)
    await sessionResource.commands.delete(this.id)
    this._cookies.set(COOKIE_NAME, undefined)
  }

  async setUserId(userId){
    if (this.userId){ throw new Error(`please logout first`) }
    await sessionResource.commands.setUserId(this.id, userId)
    await this.reload()
  }

  [Symbol.for('nodejs.util.inspect.custom')] (depth, opts) {
    let indent = ''
    if (typeof opts.indentationLvl === 'number') { while (indent.length < opts.indentationLvl) indent += ' ' }

    return this.constructor.name + '(\n' +
      indent + '  id: ' + opts.stylize(this.id, 'string') + '\n' +
      indent + '  createdAt: ' + opts.stylize(this.createdAt, 'date') + '\n' +
      indent + '  lastSeenAt: ' + opts.stylize(this.lastSeenAt, 'date') + '\n' +
      indent + '  userId: ' + opts.stylize(this.userId, 'number') + '\n' +
      indent + ')'
  }

  // // usage: await session.vault.get(key)
  // get vault () {
  //   if (this._vault) return this._vault
  //   throw new Error(`not logged in (no vault)`)
  // }
  async useVault(handler){
    const vault = await Vault.open(
      `user-${this.userId}`,
      this._vaultKey
    )
    try{
      return await handler(vault)
    }catch(error){
      throw error
    }finally{
      await vault.close()
    }
  }
}

