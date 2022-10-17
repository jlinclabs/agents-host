import b4a from 'b4a'

export async function getDump({}, { agent }){
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
