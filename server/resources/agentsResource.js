import { generateVaultKey } from '../vaults.js'
import env from '../../environment.js'
import prisma from '../../prisma/client.js'
import { createDid } from '../ceramic.js'

const users = {
  queries: {
    // async findByEmailAndPassword(email, password){
    //   const user = await prisma.user.findUnique({
    //     where: { email },
    //     select: {
    //       passwordSalt: true,
    //       passwordHash: true,
    //     }
    //   })
    //   if (!user) return
    //   const match = await bcrypt.compare(password, user.passwordHash)
    // },
    // async findBySecreyKey(secretKey){
    //   return await prisma.user.findUnique({
    //     where: { secretKey },
    //     select: {
    //       id: true,
    //       createdAt: true,
    //       email: true,
    //       secretKey: false,
    //     }
    //   })
    // }
  },

  commands: {
    async create({ password }){
      const vaultKey = await generateVaultKey()
      const { did, secretSeed } = await createDid()
      const data = {
        vaultKey,
        did: did.id,
        didSecret: secretSeed.toString('hex'),
      }
      if (password){
        data.passwordHash = await bcrypt.hash(
          password, data.passwordSalt, 10
        )
      }
      console.log('CREATING USER', {data})
      const { id } = await prisma.agent.create({
        data, select: { id: true }
      })
      return { id }
    }
  },

  actions: {

  },

  views: {
    ':id': async ({ id }) => {
      // session
    }
  }
}


export default users
