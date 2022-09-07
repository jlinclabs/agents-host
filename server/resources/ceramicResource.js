import db from '../../prisma/client.js'
import { loadStream } from '../ceramic.js'

const ceramicResource = {
  queries: {
    async getEventsById({ id }){
      const stream = await loadStream(id)
      const { allCommitIds } = stream
      console.log({ allCommitIds })
      const events = []
      for (const commitId of allCommitIds){
        const stream = await loadStream(commitId)
        events.push({
          id: commitId.toString(),
          content: stream.content,
          timestamp: null,
        })
      }
      return events
    },
  },

  commands: {

  },

  actions: {

  },

  views: {
    'events.:id': async ({ currentAgent, id }) => {
      return await ceramicResource.queries.getEventsById({
        userId: currentAgent.id, id
      })
    }
  }
}

export default ceramicResource
