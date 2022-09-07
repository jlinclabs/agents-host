import { openVault } from './vaults.js'
import { JlinxClient } from './jlinx.js'
const COOKIE_NAME = 'session-id'

export default class Agent {

  static async open({ id, did, didSecret, createdAt, vaultKey }){
    console.log('OPEN AGENT', { did, didSecret, createdAt, vaultKey })
    const jlinx = await JlinxClient.open(did, didSecret)
    const vault = await openVault(`agent-${id}`, vaultKey)
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

  async create(agreement){
    console.log('creating agreement', { agreement })
    const doc = await this.agent.jlinx.create(
      {
        offererDid: this.agent.did,
        terms: agreement.terms,
        createdAt: Date.now(),
        state: 'offered',
      },
      {
        // schema: //TODO
      }
    )
    const id = doc.id.toString()
    await this.agent.vault.records('agreements').set(id, { id })
    return { id }
  }

  async get(id){
    // const { createdAt } = await this.agent.vault.records('agreements').get(id)
    const doc = await this.agent.jlinx.get(id)
    console.log({ doc })
    // TODO check schema matches
    return {
      ...doc.content,
      id,
    }
  }

  async all(){
    const agreements = await this.agent.vault.records('agreements').all()
    console.log({ agreements })
    return Promise.all(
      agreements.map(async agreement =>
        this.get(agreement.id)
      )
    )
  }
}
