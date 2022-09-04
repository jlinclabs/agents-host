import Path from 'node:path'
import levelup from 'levelup'
import leveldown from 'leveldown'
import encryptdown from '@adorsys/encrypt-down'
import jose from 'node-jose'

export async function generateVaultKey(){
  const keystore = jose.JWK.createKeyStore()
  const jwk = await keystore.generate('oct', 256, {
    alg: 'A256GCM',
    use: 'enc'
  })
  return jwk.kid
}

export async function openVault(name, vaultKey){
  console.log('opening vault', { name })
  const path = Path.resolve(env.VAULTS_PATH, `${name}.vault`)
  const jwk = {
    kty: 'oct',
    alg: 'A256GCM',
    use: 'enc',
    k: vaultKey,
  }
  const thing = encryptdown(
    leveldown(path),
    { jwk }
  )
  await thing.keystorePromise // catch bad key errors
  const db = levelup(thing)
  return db
}

