import { openVault } from './vaults.js'
import { JlinxClient } from './jlinx.js'
const COOKIE_NAME = 'session-id'

export default class Agent {

  static async open({ did, didSecret, createdAt, vaultKey }){
    console.log('OPEN AGENT', { did, didSecret, createdAt, vaultKey })
    const jlinx = await JlinxClient.open(did, didSecret)
    const vault = await openVault(`agent-${did}`, vaultKey)
    return new Agent({ did, createdAt, jlinx, vault })
  }

  constructor({ did, createdAt, jlinx, vault }){
    this.did = did
    this.createdAt = createdAt
    this.jlinx = jlinx
    this.vault = vault
    this.dids = new Dids(this)
    this.contacts = new Contacts(this)
    this.agreements = new Agreements(this)
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

  async get(agreementId){

  }

  async all(){
    const agreements = await this.agent.vault.records('agreements').all()
    return new Promise.all(
      agreements.map(agreement =>
        this.agent.jlinx
      )
    )
  }
}
