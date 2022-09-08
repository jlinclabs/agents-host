import { randomBytes } from 'jlinx-util'
import { openVault } from './vaults.js'
import { JlinxClient } from './jlinx.js'

const COOKIE_NAME = 'session-id'

export default class Agent {

  static async open({ id, did, didSecret, createdAt, vaultKey }){
    const jlinx = await JlinxClient.open(did, didSecret)
    const vault = await openVault(`agent-${id}`, vaultKey)
    return new Agent({ id, did, createdAt, jlinx, vault })
  }

  constructor({ id, did, createdAt, jlinx, vault }){
    this.id = id
    this.did = did
    this.createdAt = createdAt
    this.jlinx = jlinx
    this.vault = vault
    this.dids = new Dids(this)
    this.contacts = new Contacts(this)
    this.agreements = new Agreements(this)
  }

  async sign(signable, metadata = {}){
    console.log('SIGNING!', signable)
    const signature = await this.jlinx.sign(signable, this.did)
    this.vault.records('signatures').set(signature, {
      ...metadata,
      signedAt: now(),
    })
    if (signature === 'jlinx'){
      throw new Error(`HOW THE FUCK IS THIS HAPPENING!?!?`)
    }
    console.log('SIGNED!', { signature })
    return signature
  }

}


class Plugin {
  constructor(agent){
    this.agent = agent
  }
}

class Dids extends Plugin {
  async resolve(did){
    const didDocument = await this.agent.jlinx.dids.resolve(did)
    return didDocument
  }
}

class Contacts extends Plugin {
  async add(did){

  }
  async delete(did){

  }
  async get(did) {

  }
  async all() {

  }
}

class Agreements extends Plugin {

  get _records () {
    return this.__records ??= this.agent.vault.records('agreements')
  }

  async create({ parties, terms }){
    console.log('creating agreement', { parties, terms })
    if (!parties.includes(this.agent.did)){
      parties.unshift(this.agent.did)
    }
    const details = {
      "@context": "https://agents.jlinx.io/agreement.json", // FAKE
      owner: this.agent.did,
      unique: randomBytes(16).toString('hex'),
      parties,
      terms,
      createdAt: now(),
    }

    const agreement = {
      details,
      signatures: {
        [this.agent.did]: await this.agent.sign(details),
      },
    }
    console.log({ agreement })
    const doc = await this.agent.jlinx.create(
      agreement,
      {
        // schema: //TODO
      }
    )
    const id = doc.id.toString()
    await this._records.set(id, { id })
    return { id }
  }

  async get(id){
    // const { createdAt } = await this._records.get(id)
    const doc = await this.agent.jlinx.get(id)
    console.log({ doc })
    // TODO check schema matches
    return {
      ...doc.content,
      id,
    }
  }

  async sign(id){
    const agreement = await this.get(id)
    if (!agreement.details?.parties?.includes(this.agent.did)){
      throw new Error(`you are not a party of this agreement`)
    }
    await this._records.set(id, { id })
  }

  async all(){
    const agreements = await this._records.all()
    console.log({ agreements })
    return Promise.all(
      agreements.map(async agreement =>
        this.get(agreement.id)
      )
    )
  }
}


const now = () => new Date().toISOString()
