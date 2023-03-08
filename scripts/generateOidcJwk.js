#!/usr/bin/env node

import { generateKeyPair, base64url } from 'jose'
const { privateKey } = await generateKeyPair('EdDSA', { crv: 'Ed25519' })
console.log('// prepend this to ./oidcSecrets.json')
console.log(
  JSON.stringify(
    privateKey.export({type: 'pkcs1', format: 'jwk'}),
    null, 2
  )
)
