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
    async add({ agent, did }){

    },
    async delete({ agent, did }){

    },
  },

  views: {
    'all': async ({ agent }) => {
      return await agent.contacts.all()
    },
    ':did': async ({ agent, did }) => {
      return await agent.contacts.get(did)
    }
  }
}

export default agreements
