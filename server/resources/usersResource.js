import { generateVaultKey } from '../vaults.js'
import env from '../../environment.js'
import prisma from '../../prisma/client.js'

const users = {
  queries: {
    async findByEmailAndPassword(email, password){
      const user = await prisma.user.findUnique({
        where: { email },
        select: {
          passwordSalt: true,
          passwordHash: true,
        }
      })
      if (!user) return
      const match = await bcrypt.compare(password, user.passwordHash)
    },
    async findBySecreyKey(secretKey){
      return await prisma.user.findUnique({
        where: { secretKey },
        select: {
          id: true,
          createdAt: true,
          email: true,
          secretKey: false,
        }
      })
    }
  },

  commands: {
    async create({ password }){
      const data = {}

      data.vaultKey = await generateVaultKey()
      if (password){
        data.passwordHash = await bcrypt.hash(
          password, data.passwordSalt, 10
        )
      }
      console.log('CREATING USER', {data})
      const { id } = await prisma.user.create({
        data, select: { id: true }
      })
      return { id }
    }
  },

  actions: {

  },

  views: {
    'current': async ({ currentUser }) => {
      return currentUser || null
    },
    ':id': async ({ id }) => {
      // session
    }
  }
}


export default users
