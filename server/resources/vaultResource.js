import b4a from 'b4a'
import prisma from '../../prisma/client.js'
import { InvalidArgumentError } from '../errors.js'
import { createDid } from '../ceramic.js'
import { JlinxClient } from '../jlinx.js'
import { isEmail, isPassword } from '../lib/validators.js'

const SKIPPED_KEYS = new Set([
  'KEY_CHECK'
])

const sessionResource = {

  queries: {

  },

  commands: {

  },

  actions: {

  },

  views: {
    'dump': async ({ session }) => {
      const { vault } = session
      const dump = {}
      for (const key of await vault.keys()) {
        if (SKIPPED_KEYS.has(key)) continue
        let value = await vault.get(key)
        if (b4a.isBuffer(value)) value = value.toString('hex')
        dump[key] = value
      }
      return dump
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

async function vaultToJson(vault){

}
