import { postJSON } from '../lib/http.js'
import db from '../../prisma/client.js'
import { JlinxClient } from '../jlinx.js'
// import identifiers from './identifiersResource.js'

const dids = {
  queries: {

  },

  commands: {

  },

  actions: {

  },

  views: {
    ':did': async ({ agent, did }) => {
      return await agent.dids.resolve(did)
    }
  }
}

export default dids
