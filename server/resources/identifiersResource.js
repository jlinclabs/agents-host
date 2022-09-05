import { createDid } from '../ceramic.js'
import { JlinxClient } from '../jlinx.js'
import profiles from './profilesResource.js'

const identifiers = {
  queries: {
    // async getSecretSeed({ userId, did }){
    //   console.log('GET SECRET SEED', { userId, did })
    //   if (!userId) throw new Error(`userId is required`)
    //   if (!did) throw new Error(`did is required`)
    //   const record = await db.identifier.findUnique({
    //     where: {
    //       // userId,
    //       id: did,
    //     },
    //     select: {
    //       userId: true,
    //       secretSeed: true,
    //     }
    //   })
    //   if (record && record.userId === userId) {
    //     return Buffer.from(record.secretSeed, 'hex')
    //   }
    // },

    async byId({ id, userId }){
      const record = await db.identifier.findUnique({
        where: { id },
        select: {
          id: true,
          userId: true,
          createdAt: true,
          secretSeed: true,
        }
      })
      const did = await getDidFromCeramic({ userId, id, record })
      return identifierToJSON({ userId, record, did })
    },

    async forUser(userId){
      const records = await db.identifier.findMany({
        where: { userId },
        select: {
          id: true,
          userId: true,
          createdAt: true,
          secretSeed: true,
        }
      })
      return await Promise.all(
        records.map(async record => {
          const did = await getDidFromCeramic({ userId, id: record.id, record })
          return identifierToJSON({ userId, record, did })
        })
      )
    }
  },

  commands: {
    async create(){
      console.log('identifiers.commands.create')
      const jlinx = new JlinxClient()
      const didDocument = await jlinx.dids.create()
      console.log('identifiers.commands.create', { didDocument })
      // await db.identifier.create({
      //   data: {
      //     id: did.id,
      //     userId,
      //     secretSeed: did.secretSeed.toString('hex'),
      //   }
      // })
      return {
        id: didDocument.id,
        secretSeed: didDocument.secretSeed.toString('hex'),
        didDocument,
      }
      // console.log({ record })
      // return identifierToJSON({ identifier, record })
    },
  },

  actions: {
    async create({ session }){
      await session.ensureLoggedIn()
      const { id, secretSeed } = await identifiers.commands.create()
      await session.useVault(async vault => {
        await vault.records('identifiers').put(id, {
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
        // return await jlinx.dids.get(id, secretSeed)
      })
    },
    ':id': async ({ session, id }) => {
      // return await identifiers.queries.byId({ id, userId: currentUser.id })
      console.log({ id })
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
  return await jlinx.dids.get(id, Buffer.from(secretSeed, 'hex'))
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
