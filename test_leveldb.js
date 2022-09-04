#!/usr/bin/env node

import Path from 'node:path'
import levelup from 'levelup'
import leveldown from 'leveldown'
import encryptdown from '@adorsys/encrypt-down'
import encodingdown from 'encoding-down'
import jose from 'node-jose'

const env = {
  // VAULTS_PATH: process.env.VAULTS_PATH,
  VAULTS_PATH: '/Volumes/Work/jlinc/agents.jlinx.io/vaults',
}

async function main(){
  console.log('GO!')
  console.log({ env })

  // const vaultKey = await generateVaultKey()
  // console.log({ vaultKey })

  // console.log('JWK?', await vaultKeyToJWK(vaultKey))

  const v1 = await openVault('test7', 'UnkT86k4Utxebex56DS3BhfOi7m2DJo9XfYG3v0bMHg')

  try{
    console.log('LAST_USED', (await (await v1.get('LAST_USED'))).toString())
  }catch(e){
    console.log('LAST_USED', null)
  }
  await v1.put('LAST_USED', `${new Date}`)

  {
    let count
    try{
      count = await v1.get('count')
    }catch(e){
      count = 0
    }
    count++
    await v1.put('count', count)
    console.log({ count })
  }

  {
    let times
    try{
      times = await v1.get('times')
    }catch(e){
      times = []
    }
    times.push(Date.now())
    await v1.put('times', times)
    console.log({ times })
  }

}

main().catch(error => {
  console.error(error)
  process.exit(1)
})

async function generateVaultKey(){
  const keystore = jose.JWK.createKeyStore()
  const jwk = await keystore.generate('oct', 256, {
    alg: 'A256GCM',
    use: 'enc'
  })
  return jwk.kid
}

async function openVault(name, vaultKey){
  console.log('opening vault', { name, vaultKey })
  const path = Path.resolve(env.VAULTS_PATH, `${name}.vault`)
  const jwk = {
    kty: 'oct',
    alg: 'A256GCM',
    use: 'enc',
    k: vaultKey,
  }
  console.log('opening vault', { path, jwk })
  const base = leveldown(path)
  const encrypted = encryptdown(base, { jwk })
  await encrypted.keystorePromise // catch bad key errors
  const encoded = encodingdown(encrypted, { valueEncoding: 'json' })
  const db = levelup(encoded)
  return db
}

