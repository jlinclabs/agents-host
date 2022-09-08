import { randomBytes } from 'jlinx-util'
import { openVault } from '../vaults.js'
import { JlinxClient } from '../jlinx.js'
import { postJSON } from '../lib/http.js'
import { base64ToObject } from '../lib/encoding.js'
import agentsResource from '../resources/agentsResource.js'

const COOKIE_NAME = 'session-id'

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
    this.contacts = new Contacts(this)
    this.agreements = new Agreements(this)
  }

  async createJWS(signable, metadata = {}){
    console.log('SIGNING!', signable)
    const jws = await this.jlinx.createJWS(signable)
    console.log('SIGNED!', { jws })
    const id = jws.signatures[0].signature
    this.vault.records('signatures').set(id, {
      signedAt: now(), jws, metadata,
    })
    return jws
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

  async create({ parties, terms, signatureDropoffUrl }){
    console.log('creating agreement', { parties, terms })
    if (!parties.includes(this.agent.did)){
      parties.unshift(this.agent.did)
    }
    const details = {
      '@context': 'https://agents.jlinx.io/agreement.json',
      owner: this.agent.did,
      unique: randomBytes(16).toString('hex'),
      parties,
      terms,
      createdAt: now(),
    }

    const jws = await this.agent.createJWS(details)
    const agreement = {
      details,
      signableDetails: jws.payload,
      signatures: {
        [this.agent.did]: jws.signatures[0],
      },
      signatureDropoffUrl,
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

  async _get(id){
    const agreement = await this.agent.jlinx.get(id)
    console.log({ agreement })
    // TODO check schema matches
    return agreement
  }

  async get(id){
    return { ...(await this._get(id)).content, id }
  }


  async sign(id){
    const agreement = await this._get(id)
    const {
      details,
      signableDetails,
      signatureDropoffUrl,
    } = agreement.content

    if (!details?.parties?.includes(this.agent.did))
      throw new Error(`you are not a party of this agreement`)

    const jws = await this.agent.createJWS(details)
    if (jws.payload !== signableDetails)
      throw new Error(`jws payload mismatch`)

    const signature = await this.agent.jlinx.create(
      {
        '@context': 'https://agents.jlinx.io/agreement-signature.json',
        agreement: id,
        signature: {
          ...jws.signatures[0],
        }
      },
      {
        // schema: //TODO
      }
    )

    await postJSON(
      signatureDropoffUrl,
      {
        signatureId: signature.id.toString(),
      }
    )
    await agreement.sync()

    const sig = agreement.content.signatures[this.agent.did]
    console.log('GOT SIG ACKd', sig)

    await this._records.set(id, { id })
    return {
      agreementId: id,
      signatureId: signature.id.toString(),
    }
  }

  async ackSignature(signatureId){
    const signature = await this.agent.jlinx.get(signatureId)
    // todo check signature schema
    console.log('~~~ signature', signature)
    console.log('~~~ signature.content', signature.content)
    console.log('~~~ signature.metadata', signature.metadata)
    const signerDid = signature.metadata.controllers[0]
    const agreementId = signature?.content?.agreement
    if (!agreementId) {
      throw new Error(`unable to find agreement id in signature`)
    }
    // const agreement = await this.get(agreementId)
    const agreement = await this.agent.jlinx.get(agreementId)
    // TODO ensure agreement schema
    const { details, signatures } = agreement.content
    console.log('agreement', agreement.content)
    // if (!agreement.details.parties.includes(this.agent.did))
    if (!details.parties.includes(signerDid))
      throw new Error(`not party to agreement. did="${signerDid}"`)

    if (signatures[signerDid])
      throw new Error(`party already signed agreement. did="${signerDid}"`)

    const jws = await this.agent.jlinx.createJWS(details)
    await agreement.update({
      ...agreement.content,
      signatures: {
        ...signatures,
        [signerDid]: jws.signatures[0],
      }
    })
    console.log('ACKd Signature', {
      signature: signature.content,
      agreement: agreement.content,
    })
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
