import prisma from '../../prisma/client.js'
import { InvalidArgumentError } from '../errors.js'
import { createDid } from '../ceramic.js'
import { JlinxClient } from '../jlinx.js'
import { isEmail, isPassword } from '../lib/validators.js'
import users from './usersResource.js'
import identifiers from './identifiersResource.js'

const sessionResource = {

  queries: {

  },

  commands: {

  },

  actions: {

  },

  views: {
    'dump': async ({ session }) => {
      return await session.useVault(async vault => {
        return await vault.dangerously_dump()
      })
    },

    'currentUser': async ({ session }) => {
      if (session.userId) return {
        id: session.userId,
        createdAt: session.userCreatedAt,
      }
      return null
    },

  }
}


export default sessionResource
