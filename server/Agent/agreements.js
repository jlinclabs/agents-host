import { randomBytes } from 'jlinx-util'
import { postJSON } from '../lib/http.js'
import AgentPlugin from './plugin.js'

export default class Agreements extends AgentPlugin {

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
      createdAt: this.agent.now,
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
        signedAt: this.agent.now,
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
