import { postJSON } from '../lib/http.js'
import db from '../../prisma/client.js'
import Agent from '../Agent/index.js'
import { JlinxClient } from '../jlinx.js'
// import identifiers from './identifiersResource.js'

const agreements = {
  queries: {
    async byId(id){
      console.log('agreements.queries.getAll', { id })
    }
  },

  commands: {
  },

  actions: {
    async create({ agent, parties, terms }){
      return await agent.agreements.create({
        parties,
        terms,
        signatureDropoffUrl: `${process.env.APP_ORIGIN}/api/jlinx/agreements/signatures`
      })
    },
    async sign({ agent, agreementId }){
      return await agent.agreements.sign(agreementId)
    },
    async ackSignature({ agent, agreementId, signatureId }){
      if (agent) throw new Error(`you cannot do this while logged in`)
      const jlinx = new JlinxClient()
      // const signature = await jlinx.get(signatureId)
      // console.log('ASK SIGNATURES', { signature }, signature.content)
      // const agreementId = signature?.content?.agreementId
      // if (!agreementId) {
      //   throw new Error(`unable to find agreement id in signature`)
      // }
      const agreement = await jlinx.get(agreementId)
      const did = agreement.metadata.controllers[0]
      // const did = agreement?.content?.details?.owner
      // if (!did) {
      //   throw new Error(`unable to find owner did in agreement`)
      // }
      agent = await Agent.find(did)
      return await agent.agreements.ackSignature(signatureId)
    },
  },

  views: {
    'mine': async ({ agent }) => {
      return await agent.agreements.all()
    },
    ':id': async ({ agent, id }) => {
      return await agent.agreements.get(id)
    }
  }
}

export default agreements
