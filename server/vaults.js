import Path from 'node:path'
// import jose from 'node-jose'
import JlinxVault from 'jlinx-vault'
import env from '../environment.js'

export async function generateVaultKey(){
  return JlinxVault.generateKey().toString('hex')
}

export async function openVault(did, vaultKey){
  const name = `agent-${did.replace(/:/g, '-')}`
  const path = Path.resolve(env.VAULTS_PATH, `${name}.vault`)
  const vault = new JlinxVault({ path, key: Buffer.from(vaultKey, 'hex') })
  await vault.ready()
  return vault
}
