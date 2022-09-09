import { postJSON } from '../lib/http.js'
import db from '../../prisma/client.js'
import Agent from '../Agent/index.js'
import { JlinxClient } from '../jlinx.js'

const agreements = {
  queries: {
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
  },

  views: {
    'all': async ({ agent }) => {
      return await agent.agreements.all()
    },
    ':id': async ({ agent, id }) => {
      return await agent.agreements.get(id)
    }
  }
}

export default agreements
