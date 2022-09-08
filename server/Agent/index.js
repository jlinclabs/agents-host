import { openVault } from '../vaults.js'
import { JlinxClient } from '../jlinx.js'
import agentsResource from '../resources/agentsResource.js'
import Dids from './dids.js'
import Agreements from './agreements.js'

export default class Agent {

  static async find(did){
    const record = await agentsResource.queries.findByDid(did)
    if (!record) throw new Error(`agent not hosted here`)
    return await Agent.open(record)
  }

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
    // this.contacts = new Contacts(this)
    this.agreements = new Agreements(this)
  }

  get now() { return new Date().toISOString() }

  async createJWS(signable, metadata = {}){
    const jws = await this.jlinx.createJWS(signable)
    const id = jws.signatures[0].signature
    this.vault.records('signatures').set(id, {
      signedAt: this.now, jws, metadata,
    })
    return jws
  }

}
