import b4a from 'b4a'
import { openVault } from '../vaults.js'

export async function getDump({}, context){
  const agent = await context.getAgent()
  return await vaultToJson(agent.vault)

  const record = await context.prisma.user.findUnique({
    where: { id: context.userId },
    select: {
      did: true,
      vaultKey: true,
    }
  })
  if (!record) throw new Error(`user now found`)
  const { did, vaultKey } = record
  const vault = await openVault(did, vaultKey)
  return await vaultToJson(vault)
}

const SKIPPED_KEYS = new Set([
  'VERSION',
  'KEY_CHECK'
])
async function vaultToJson(vault){
  const dump = {}
  for (const key of await vault.keys()) {
    if (SKIPPED_KEYS.has(key)) continue
    try{
      let value = await vault.get(key)
      if (b4a.isBuffer(value)) value = value.toString('hex')
      dump[key] = value
    }catch(error){
      console.error(error)
    }
  }
  return dump
}
