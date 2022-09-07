import b4a from 'b4a'
import prisma from '../../prisma/client.js'
import { InvalidArgumentError } from '../errors.js'
import { createDid } from '../ceramic.js'
import { JlinxClient } from '../jlinx.js'
import { isEmail, isPassword } from '../lib/validators.js'

const SKIPPED_KEYS = new Set([
  'VERSION',
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
    'dump': async ({ agent }) => {
      return await vaultToJson(agent.vault)
    },

    'currentAgent': async ({ agent }) => {
      if (agent) return {
        did: agent.did,
        createdAt: agent.createdAt,
      }
      return null
    },

  }
}


export default sessionResource

async function vaultToJson(vault){
  const dump = {}
  for (const key of await vault.keys()) {
    if (SKIPPED_KEYS.has(key)) continue
    let value = await vault.get(key)
    if (b4a.isBuffer(value)) value = value.toString('hex')
    dump[key] = value
  }
  return dump
}
