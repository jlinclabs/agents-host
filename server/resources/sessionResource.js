import prisma from '../../prisma/client.js'
import { InvalidArgumentError } from '../errors.js'
import { createDid } from '../ceramic.js'
import { JlinxClient } from '../jlinx.js'
import { isEmail, isPassword } from '../lib/validators.js'
import users from './agentsResource.js'
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
          agentId: true,
          agent: {
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
    async setAgentId(id, agentId){
      console.log('setAgentId', {id, agentId})
      return await prisma.session.update({
        where: { id },
        data: { agentId }
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
      if (session.agentId){
        throw new Error(`please logout first`)
      }
      const user = await users.commands.create({ password })
      const agentId = user.id
      // await identifiers.commands.create({ agentId })
      await session.setAgentId(agentId)

      if (email){

      }
      // await session.save();
      return { agentId, email }
    },

    async login({ session, email, password }){
      let user
      if (email && password){
        user = await users.queries.findByEmailAndPassword(email)
        if (!user){ throw new Error(`invalid password`)}
      }
      await session.setAgentId(user.id)
    },

    async logout({ session }){
      await session.delete()
    }
  },

  views: {
    'current': async ({ session }) => {
      return {...session}
    },

    'currentAgent': async ({ session }) => {
      if (session.agentId) return {
        id: session.agentId,
        createdAt: session.userCreatedAt,
      }
      return null
    },

  }
}


export default sessionResource
