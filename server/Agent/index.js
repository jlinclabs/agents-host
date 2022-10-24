import { openVault, generateVaultKey } from '../vaults.js'
import { JlinxClient } from '../jlinx.js'
import { createDid } from '../ceramic.js'
import Dids from './dids.js'
import Agreements from './agreements.js'
import Contacts from './contacts.js'

export default class Agent {

  static generateVaultKey() {
    return generateVaultKey()
  }

  static async create() {
    const vaultKey = await generateVaultKey()
    const { did, secretSeed: didSecret } = await createDid()
    const agent = await Agent.open({
      did: did.id,
      didSecret,
      vaultKey,
    })
    agent.vault.set('did', did.id, 'string')
    agent.vault.set('didSecret', didSecret, 'raw')
    return { agent, did: agent.did, didSecret, vaultKey }
  }

  static async open({ did, didSecret, vaultKey }){
    const jlinx = await JlinxClient.open(did, didSecret)
    const vault = await openVault(did, vaultKey)
    return new Agent({ did, jlinx, vault })
  }

  constructor({ did, jlinx, vault }){
    this.did = did
    this.jlinx = jlinx
    this.vault = vault
    this.dids = new Dids(this)
    // this.contacts = new Contacts(this)
    this.agreements = new Agreements(this)
    this.contacts = new Contacts(this)
  }

  get now() { return new Date().toISOString() }

  async createJWS(signable, metadata = {}){
    const jws = await this.jlinx.createJWS(signable)
    console.log('\n\nJWS->\n', jws)
    const id = jws.signatures[0].signature
    this.vault.records('signatures').set(id, {
      signedAt: this.now, jws, metadata,
    })
    return jws
  }

}
