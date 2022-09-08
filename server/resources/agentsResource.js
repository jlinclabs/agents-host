import { generateVaultKey } from '../vaults.js'
import env from '../../environment.js'
import prisma from '../../prisma/client.js'
import { createDid } from '../ceramic.js'
import Agent from '../Agent/index.js'

const agents = {
  queries: {
    async findByDid(did){
      const record = await prisma.agent.findUnique({
        where: { did },
        select: {
          id: true,
          createdAt: true,
          did: true,
          didSecret: true,
          vaultKey: true,
        }
      })
      if (record){
        record.didSecret = Buffer.from(record.didSecret, 'hex')
      }
      return record
    },
  },

  commands: {
    async create({ password }){
      const vaultKey = await generateVaultKey()
      const { did, secretSeed: didSecret } = await createDid()
      const data = {
        vaultKey,
        did: did.id,
        didSecret: didSecret.toString('hex'),
      }
      if (password){
        data.passwordHash = await bcrypt.hash(
          password, data.passwordSalt, 10
        )
      }
      console.log('CREATING USER', {data})
      const { id, createdAt } = await prisma.agent.create({
        data, select: { id: true, createdAt: true }
      })

      const agent = await Agent.open({
        id,
        did: did.id,
        didSecret,
        createdAt,
        vaultKey,
      })
      agent.vault.set('did', did.id, 'string')
      agent.vault.set('didSecret', didSecret, 'raw')
      return agent
    }
  },

  actions: {

  },

  views: {

  }
}


export default agents
