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

async function waitForLock(path, timeout = 30000){
  console.log('LOCK WAIT', path)
  await new Promise((resolve, reject) => {
    lockFile.check(path, {wait: timeout}, (error) => {
      console.log('LOCK RELEASE', path, error)
      if (error) reject(error); else resolve();
    })
  })
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
      return openVault(name, vaultKey)
    }
    throw error
  }
  await encrypted.keystorePromise // catch bad key errors
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
  // getMany(...args){ return this._db.getMany(...args) }
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

  // async getMany(keys){
  //   return await this._db.getMany(
  //     keys.map(key => this._key(key)),
  //   )
  // }

  async put(key, value){
    return await this._db.put(this._key(key), value)
  }

  async del(key){
    return await this._db.del(this._key(key))
  }
  // async batch(key)
}



class VaultRecords {
  constructor(db){
    this._db = db
    this.ids = new VaultRecordIds(db)
  }

  // async ids(){
  //   return await this._db.get(`ids`) || []
  // }

  _recordKey(id){ return `record:${id}` }

  async get(id){
    return await this._db.get(this._recordKey(id))
  }

  // async getMany(ids){
  //   return await this._db.getMany(
  //     ids.map(id => this._recordKey(id))
  //   )
  // }

  async all(){
    const ids = await this.ids.all()
    console.log('vault records all', { ids })
    // return await this.getMany(ids)
    const records = await Promise.all(
      ids.map(id => this.get(id))
    )
    console.log('vault records all', { records })
    return records
  }

  async put(id, value){
    console.log('RECORD PUT', { id, value })
    await this.ids.add(id)
    console.log('RECORD PUT', { ids: await this.ids.all() })
    await this._db.put(this._recordKey(id), value)
    console.log('RECORD PUT', { value: await this.get(id) })
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
