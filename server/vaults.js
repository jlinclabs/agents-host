import Path from 'node:path'
import levelErrors from 'level-errors'
import levelup from 'levelup'
import leveldown from 'leveldown'
import encryptdown from '@adorsys/encrypt-down'
import encodingdown from 'encoding-down'
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

export async function openVault(name, vaultKey){
  console.log('OPENING VAULT', { name })
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
  const db = levelup(encoded)
  // OPEN_VAULTS.set(name, new WeakRef(db))
  console.log('DONE OPENING VAULT!', { name })
  await encrypted.keystorePromise // catch bad key errors

  const closedPromise = new Promise(resolve => {
    db.on('closed', () => {
      console.log('VAULT CLOSED!', { name })
      resolve()
    })
  })

  // TODO handle these errors
  // [SERVER] Error [OpenError]: IO error: lock /Volumes/Work/jlinc/agents.jlinx.io/vaults/user-4.vault/LOCK: Resource temporarily unavailable

  return db
}

export class Vault {

  static async open(vaultName, vaultKey){
    const leveldb = await openVault(vaultName, vaultKey)
    return new Vault(new LevelDbWrapper(leveldb))
  }

  constructor(db){
    this._db = db
  }

  async close(){
    await this._db.close()
  }

  namespace(namespace){
    return new VaultNamespace(this._db, namespace)
  }

  records(namespace){
    return new VaultRecords(this.namespace(namespace))
  }

  // TODO locks and transactions?
}


class LevelDbWrapper {
  constructor(db){
    this._db = db
  }

  async get(...args){
    try{
      return await this._db.get(...args)
    }catch(error){
      if (error instanceof levelErrors.NotFoundError) return undefined
      throw error
    }
  }
  close(...args){ return this._db.close(...args) }
  getMany(...args){ return this._db.getMany(...args) }
  put(...args){ return this._db.put(...args) }
  del(...args){ return this._db.del(...args) }
}

class VaultNamespace {
  constructor(db, namespace){
    this._db = db
    this._namespace = namespace
  }

  _key(key){ return `${this._namespace}→${key}`}

  async namespace(namespace){
    return new VaultNamespace(this, namespace)
  }

  get(key){ return this._db.get(this._key(key)) }

  async getMany(keys, options){
    return await this._db.getMany(
      keys.map(key => this._key(key)),
      options
    )
  }

  async put(key, value){
    return await this._db.put(this._key(key), value, options)
  }

  async del(key){
    return await this._db.del(this._key(key), options)
  }
  // async batch(key)
}

class VaultRecords {
  constructor(db){
    this._db = db
  }

  async ids(){
    return await this._db.get(`ids`) || []
  }

  _recordKey(id){ return `record:${id}` }

  async get(id){
    this._db.get(this._recordKey(id))
  }

  async getMany(ids){
    return await this._db.getMany(
      ids.map(id => this._recordKey(id))
    )
  }

  async all(){
    const ids = await this.ids()
    return await this.getMany(ids)
  }

  async put(id, value){
    this._db.put(this._recordKey(id), value)
  }
}
