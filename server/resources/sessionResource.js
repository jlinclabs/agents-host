import prisma from '../../prisma/client.js'
import { InvalidArgumentError } from '../errors.js'
import { createDid } from '../ceramic.js'
import { JlinxClient } from '../jlinx.js'
import { isEmail, isPassword } from '../lib/validators.js'
import agents from './agentsResource.js'
import identifiers from './identifiersResource.js'

const sessionResource = {

  commands: {
    async create(){
      return await prisma.session.create({
        data: {},
        select: {
          id: true,
          createdAt: true,
          lastSeenAt: true,
        }
      })
    },
    async touch(id){
      const record = await prisma.session.update({
        where: { id },
        data: { lastSeenAt: new Date },
        select: {
          id: true,
          createdAt: true,
          lastSeenAt: true,
          agent: {
            select: {
              id: true,
              did: true,
              didSecret: true,
              createdAt: true,
              vaultKey: true,
            }
          },
        }
      }).catch(error => {
        if (
          error instanceof prisma.Error &&
          error.code === 'P2025'
        ) return null
        throw error
      })
      if (record && record.agent){
        record.agent.didSecret = Buffer.from(record.agent.didSecret, 'hex')
      }
      return record
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
      const agent = await agents.commands.create({ email, password })
      await session.setAgentId(agent.id)
      console.log('CREATED', { agent })
      return { did: agent.did }
    },

    async login({ session, email, password }){
      let agent
      if (email && password){
        agent = await agents.queries.findByEmailAndPassword(email)
        if (!agent){ throw new Error(`invalid password`)}
      }
      await session.setAgentId(agent.id)
      return { did: agent.did }
    },

    async logout({ session }){
      await session.delete()
      return null
    }
  },

  views: {
    'currentAgent': async ({ session }) => {
      if (session.agent) return { did: session.agent.did }
      return null
    },

  }
}


export default sessionResource
