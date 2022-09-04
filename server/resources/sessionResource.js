import prisma from '../../prisma/client.js'
import { InvalidArgumentError } from '../errors.js'
import { createDid } from '../ceramic.js'
import { JlinxClient } from '../jlinx.js'
import { isEmail, isPassword } from '../lib/validators.js'
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
              createdAt: true,
              vaultKey: true,
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

    async signup({ session, password, email }){
      if (email && !isEmail(email))
        throw new InvalidArgumentError('email', email)
      // if (!isPassword(password)) throw new InvalidArgumentError('password', password)

      console.log('signup', { session, password, email })
      if (session.userId){
        throw new Error(`please logout first`)
      }
      const user = await users.commands.create({ password })
      const userId = user.id
      // await identifiers.commands.create({ userId })
      await session.setUserId(userId)

      if (email){

      }
      // await session.save();
      return { userId, email }
    },

    async login({ session, email, password }){
      let user
      if (email && password){
        user = await users.queries.findByEmailAndPassword(email)
        if (!user){ throw new Error(`invalid password`)}
      }
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
      if (session.userId) return {
        id: session.userId,
        createdAt: session.userCreatedAt,
      }
      return null
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
