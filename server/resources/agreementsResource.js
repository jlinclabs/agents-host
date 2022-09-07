import { postJSON } from '../lib/http.js'
import db from '../../prisma/client.js'
import { JlinxClient } from '../jlinx.js'

const agreements = {
  queries: {

  },

  commands: {
  },

  actions: {
    async offer({ currentUser, ...options }){

    },
    async sign({ currentUser, sisaId, identifierId }){

    },
    async ackSignature({ sisaId, signatureId }){

    },
  },

  views: {
    'mine': async ({ session }) => {
      return await session.vault.records('agreements').all()
    },
    ':id': async ({ id }) => {
      return await session.vault.records('agreements').get(id)
    }
  }
}

export default agreements
