import { createDid } from '../ceramic.js'
import { JlinxClient } from '../jlinx.js'
import profiles from './profilesResource.js'

const identifiers = {
  queries: {

  },

  commands: {
    async create(){
      console.log('identifiers.commands.create')
      const jlinx = new JlinxClient()
      const didDocument = await jlinx.dids.create()
      return {
        id: didDocument.id,
        secretSeed: didDocument.secretSeed.toString('hex'),
        didDocument,
      }
    },
  },

  actions: {
    async create({ session }){
      await session.ensureLoggedIn()
      const { id, secretSeed } = await identifiers.commands.create()
      await session.useVault(async vault => {
        await vault.records('identifiers').set(id, {
          id,
          secretSeed,
          createdAt: new Date,
        })
      })
      return { id }
    },
  },

  views: {
    'mine': async ({ session }) => {
      return await session.useVault(async vault => {
        return await vault.records('identifiers').all()
      })
    },
    ':id': async ({ session, id }) => {
      return await session.useVault(async vault => {
        const record = await vault.records('identifiers').get(id)
        const did = await getDidFromCeramic(id, record?.secretSeed)
        if (did) return identifierToJSON(id, did, record)
      })
    }
  }
}

export default identifiers

async function getDidFromCeramic(id, secretSeed){
  const jlinx = new JlinxClient()
  if (typeof secretSeed === 'string')
    secretSeed = Buffer.from(secretSeed, 'hex')
  return await jlinx.dids.get(id, secretSeed)
}

function identifierToJSON(id, did, record){
  let data = { id }
  if (record){
    data.createdAt = record.createdAt
    data.ours = true
  }
  if (did){
    data.didDocument = did.didDocument
  }
  return data
}
