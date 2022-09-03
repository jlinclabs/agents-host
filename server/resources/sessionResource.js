import bcrypt from 'bcrypt'
import prisma from '../../prisma/client.js'
import { InvalidArgumentError } from '../errors.js'
import { createDid } from '../ceramic.js'
import { JlinxClient } from '../jlinx.js'
import users from './usersResource.js'
import identifiers from './identifiersResource.js'

const sessionResource = {

  queries: {
    async get(sessionId){
      return await prisma.session.findUnique({
        where: { id: sessionId },
        select: {
          id: true,
          createdAt: true,
          lastSeenAt: true,
          userId: true,
          user: {
            select: {
              id: true,
              // did: true,
              // secretKey: false, // !
              email: true,
              // name: true,
              createdAt: true,
            }
          },
        }
      })
    }
  },

  commands: {
    async create(){
      return await prisma.session.create({ data: {} })
    },
    async touch(id){
      return await prisma.session.update({
        where: { id },
        data: { lastSeenAt: new Date }
      })
    },
    async setUserId(id, userId){
      console.log('setUserId', {id, userId})
      return await prisma.session.update({
        where: { id },
        data: { userId }
      })
    },
    async delete(id){
      return await prisma.session.delete({
        where: { id }
      })
    }
  },

  actions: {

    async signup({ session, email, secretKey }){
      if (
        !secretKey ||
        typeof secretKey !== 'string' ||
        secretKey.length < 128
      ) throw new InvalidArgumentError('secretKey', secretKey)

      console.log('signup', { session, email, secretKey })
      if (session.userId){
        throw new Error(`please logout first`)
      }
      const user = await users.commands.create({ email, secretKey })
      const userId = user.id
      // await identifiers.commands.create({ userId })
      await session.setUserId(userId)
      // await session.save();
      return { userId, email }
    },

    async login({ session, secretKey }){
      const user = await users.queries.findBySecreyKey(secretKey)
      // const match = await bcrypt.compare(password, user.passwordHash)
      if (!user){ throw new Error(`invalid secretKey`)}
      await session.setUserId(user.id)
    },

    async logout({ session }){
      await session.delete()
    }
  },

  views: {
    'current': async ({ session }) => {
      return {...session}
    },

    'currentUser': async ({ session }) => {
      return session.user || null
      // if (!session.userId) return null
      // return await prisma.user.findUnique({
      //   where: { id: session.userId },
      //   select: {
      //     id: true,
      //     email: true,
      //     name: true,
      //     createdAt: true,
      //   }
      // })
    },
  }
}


export default sessionResource
