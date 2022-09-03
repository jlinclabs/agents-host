import prisma from '../../prisma/client.js'

const users = {
  queries: {
    async findByEmail(email){
      return await prisma.user.findUnique({
        where: { email },
        select: {
          id: true,
          createdAt: true,
          email: true,
          secretKey: false,
        }
      })
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
    async create({ email, secretKey }){
      return await prisma.user.create({
        data: { email, secretKey }
      })
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
