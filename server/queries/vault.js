import b4a from 'b4a'
import Agent from '../Agent/index.js'

export async function getDump({}, context){
  const record = await context.prisma.user.findUnique({
    where: { id: context.userId },
    select: {
      did: true,
      didSecret: true,
      vaultKey: true,
    }
  })
  if (!record) throw new Error(`user now found`)

  console.log({ record })
  const agent = await Agent.open({
    did: record.did,
    didSecret: b4a.from(record.didSecret, 'hex'),
    vaultKey: record.vaultKey,
  })
  return await vaultToJson(agent.vault)
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
