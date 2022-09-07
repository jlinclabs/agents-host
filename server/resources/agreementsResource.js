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
    async create({ agent, agreement }){
      console.log('agreements.create', { agent, agreement })
      agreement = await agent.agreements.create(agreement)
      console.log('agreements.create', { agreement })
      return agreement
      // agreement.offererDid
      // // const identifiers = await identifiers.queries.getByDid(agreement.offererDid)
      // console.log('OFFER', { identifiers })
      // JlinxClient.open(
      //   identifiers.did,
      //   identifiers.secretKey
      // )

    },
    async sign({ currentAgent, sisaId, identifierId }){

    },
    async ackSignature({ sisaId, signatureId }){

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
