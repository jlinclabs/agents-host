import { postJSON } from '../lib/http.js'
import db from '../../prisma/client.js'
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
    async offer({ session, agreement }){
      console.log('OFFER', { session, agreement })
      agreement.offererDid
      // const identifiers = await identifiers.queries.getByDid(agreement.offererDid)
      console.log('OFFER', { identifiers })
      JlinxClient.open(
        identifiers.did,
        identifiers.secretKey
      )

    },
    async sign({ currentAgent, sisaId, identifierId }){

    },
    async ackSignature({ sisaId, signatureId }){

    },
  },

  views: {
    'mine': async ({ agent }) => {
      const agreements = await agent.agreements.all()
    },
    ':id': async ({ id }) => {
      return await session.vault.records('agreements').get(id)
    }
  }
}

export default agreements
