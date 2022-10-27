import fs from 'node:fs/promises'
import test from 'brittle'
import tmp from 'tmp-promise'
import { generateVaultKey, openVault } from '../../server/vaults.js'

test('vaults', async (t) => {
  // async function createVault(){
  //   const { path } = await tmp.dir()
  //   t.teardown(() => {
  //     fs.rm(path, { recursive: true })
  //   })
  //   const vaultKey = await generateVaultKey()
  //   console.log({ path, vaultKey })
  //   const vault = await Vault.open(path, vaultKey)
  //   vault._forTest = { path, vaultKey }
  //   return vault
  // }

  // const v1 = await createVault()
  // t.ok(v1 instanceof Vault)

  // t.alike(
  //   await v1.dangerously_dump(),
  //   {}
  // )/**/

})
