import Path from 'node:path'
import levelErrors from 'level-errors'
import levelup from 'levelup'
import leveldown from 'leveldown'
import encryptdown from '@adorsys/encrypt-down'
import encodingdown from 'encoding-down'
import lockFile from 'lockfile'
import jose from 'node-jose'
import env from '../environment.js'

export async function generateVaultKey(){
  const keystore = jose.JWK.createKeyStore()
  const jwk = await keystore.generate('oct', 256, {
    alg: 'A256GCM',
    use: 'enc'
  })
  return jwk.kid
}

waitForLock.__debug_id_itr = 0
async function waitForLock(path, timeout = 30000){
  const __debug_id = waitForLock.__debug_id_itr++
  console.log('LOCK WAIT', __debug_id, path)
  await new Promise((resolve, reject) => {
    lockFile.check(path, {wait: timeout}, (error) => {
      console.log('LOCK RELEASE', __debug_id, path, error)
      if (error) reject(error); else resolve();
    })
  })
}

async function openDb(name, vaultKey){
  // console.log('OPENING VAULT', { name })
  const path = Path.resolve(env.VAULTS_PATH, `${name}.vault`)
  const base = leveldown(path)
  const jwk = {
    kty: 'oct',
    alg: 'A256GCM',
    use: 'enc',
    k: vaultKey,
  }
  const encrypted = encryptdown(base, { jwk })
  const encoded = encodingdown(encrypted, { valueEncoding: 'json' })
  let db
  const openPromise = new Promise((resolve, reject) => {
    db = levelup(encoded, {}, error => {
      if (error) reject(error); else resolve();
    })
  })

  try{
    await openPromise
  }catch(error){
    if (error instanceof levelErrors.OpenError){
      const matches = error.message.match(/lock (.+): already held by process/)
      if (!matches) throw error
      const path = matches[1]
      await waitForLock(path)
      return openDb(name, vaultKey)
    }
    throw error
  }
  await encrypted.keystorePromise // catch bad key errors
  return db
}

const OPEN_VAULTS = new Map

export class Vault {

  static async open(vaultName, vaultKey){
    let promiseForDb = OPEN_VAULTS.get(vaultName)
    if (!promiseForDb) {
      console.log('opening vault [fresh]', vaultName)
      promiseForDb = (async () => {
        const leveldb = await openDb(vaultName, vaultKey)
        const db = new LevelDbWrapper(
          leveldb,
          () => {
            console.log('uncaching vault', vaultName)
            OPEN_VAULTS.delete(vaultName)
          }
        )
        return db
      })()
      OPEN_VAULTS.set(vaultName, promiseForDb)

    }else{
      console.log('opening vault [cache]', vaultName)
    }
    const db = await promiseForDb
    return new Vault(db)
  }

  constructor(db){
    this._db = db
    this._close = db.open()
  }

  async close(){
    await this._close()
  }

  get(key){ return this._db.get(key) }
  put(key, value){ return this._db.get(key, value) }
  del(key){ return this._db.get(key) }

  namespace(namespace){
    return new VaultNamespace(this._db, namespace)
  }

  records(namespace){
    return new VaultRecords(this.namespace(namespace))
  }

  async dangerously_dump(){
    const dump = {
      createdAt: await this.get('createdAt'),
    }
    dump.identifiers = {
      ids: await this.records('identifiers').ids.all(),
      all: await this.records('identifiers').allById(),
    }
    return dump
  }
}


class LevelDbWrapper {
  constructor(db, onClose){
    this._db = db
    this._users = new Set
    this._onClose = onClose
  }

  open(){
    if (this.closed){
      throw new Error(`leveldb wrapper refusing to open. already closed!!!`)
    }
    console.log('leveldb wrapper "opening"', this._users.size)
    const close = async () => {
      this._users.delete(close)
      console.log('leveldb wrapper "closing"', this._users.size)
      if (this._users.size === 0) await this._close()
    }
    this._users.add(close)
    return close
  }

  async _close(){
    console.log('CLOSING VAULT')
    this.closed = true
    if (this._onClose) this._onClose()
    await this._db.close()
  }

  async get(...args){
    try{
      return await this._db.get(...args)
    }catch(error){
      if (error instanceof levelErrors.NotFoundError) return undefined
      throw error
    }
  }
  put(...args){ return this._db.put(...args) }
  del(...args){ return this._db.del(...args) }
}

class VaultNamespace {
  constructor(db, namespace){
    this._db = db
    this._namespace = namespace
  }
  _key(key){ return `${this._namespace}→${key}`}
  namespace(namespace){ return new VaultNamespace(this, namespace) }
  get(key){ return this._db.get(this._key(key)) }
  put(key, value){ return this._db.put(this._key(key), value) }
  del(key){ return this._db.del(this._key(key)) }
}

class VaultRecords {
  constructor(db){
    this._db = db
    this.ids = new VaultRecordIds(db)
  }

  _recordKey(id){ return `record:${id}` }

  async get(id){
    return await this._db.get(this._recordKey(id))
  }

  async all(){
    const ids = await this.ids.all()
    if (ids.length === 0) return ids
    return await Promise.all(
      ids.map(id => this.get(id))
    )
  }

  async allById(){
    const all = await this.all()
    const byId = {}
    all.forEach(record => { byId[record.id] = record })
    return byId
  }

  async put(id, value){
    await this.ids.add(id)
    await this._db.put(this._recordKey(id), value)
  }

  async del(id){
    await this.ids.del(id)
    await this._db.del(this._recordKey(id))
  }
}

class VaultRecordIds {
  constructor(db){
    this._db = db
  }

  async all(){
    return await this._db.get(`ids`) || []
  }

  async add(id){
    let ids = await this.all()
    ids = new Set(ids)
    ids.add(id)
    await this._db.put(`ids`, [...ids])
  }

  async del(id){
    let ids = await this.all()
    ids = new Set(ids)
    ids.delete(id)
    await this._db.put(`ids`, [...ids])
  }
}
