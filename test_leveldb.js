#!/usr/bin/env node

import Path from 'node:path'
import levelup from 'levelup'
import leveldown from 'leveldown'
import encryptdown from '@adorsys/encrypt-down'
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

  const v1 = await openVault('test5', 'UnkT86k4Utxebex56DS3BhfOi7m2DJo9XfYG3v0bMHg')
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

}

main().catch(error => {
  console.error(error)
  process.exit(1)
})
