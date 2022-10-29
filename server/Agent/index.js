import { JlinxAgent } from 'app-shared/jlinx/agent.js'
import { generateKeyPairSeed } from 'app-shared/jlinx/crypto.js'
import { openDidKey } from 'app-shared/jlinx/dids.js'
import { openVault, generateVaultKey } from '../vaults.js'
// import { JlinxClient } from '../jlinx.js'
// import { createDid } from '../ceramic.js'
import Dids from './dids.js'
import Agreements from './agreements.js'
import Contacts from './contacts.js'

export default class Agent extends JlinxAgent {

  static generateVaultKey() {
    return generateVaultKey()
  }

  static async create() {
    const vaultKey = await generateVaultKey()
    // const { did, secretSeed: didSecret } = await createDid()
    const didSecret = generateKeyPairSeed()
    // const { did, secretSeed: didSecret } = await generateDidKey()
    const agent = await Agent.open({
      didSecret,
      vaultKey,
    })
    agent.vault.set('did', agent.did, 'string')
    agent.vault.set('didSecret', didSecret, 'raw')
    return { agent, did: agent.did, didSecret, vaultKey }
  }

  static async open({ didSecret, vaultKey }){
    const did = await openDidKey(didSecret)
    const vault = await openVault(did.id, vaultKey)
    // return JlinxAgent.open.call(this, {
    //   secretSeed: didSecret, vault })
    // const did = await openDidKey(did)
    // // const jlinx = await JlinxClient.open(did.id, didSecret)
    return new this({ did, vault })
  }

  constructor({ did, vault }){
    super({ did })
    console.log('Agent constructor', { did, vault })
    console.log('Agent._did', this._did)
    console.log('agent', this)
    console.log('agent.did', this.did)
    console.log('agent.__inspectFields', this.__inspectFields)
    this.vault = vault
    this.dids = new Dids(this)
    // this.contacts = new Contacts(this)
    this.agreements = new Agreements(this)
    this.contacts = new Contacts(this)
  }

  // get now() { return new Date().toISOString() }
  //
  // async createJWS(signable, metadata = {}){
  //   const jws = await this.jlinx.createJWS(signable)
  //   console.log('\n\nJWS->\n', jws)
  //   const id = jws.signatures[0].signature
  //   this.vault.records('signatures').set(id, {
  //     signedAt: this.now, jws, metadata,
  //   })
  //   return jws
  // }

}
