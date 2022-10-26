import test from 'brittle'

import {
  generateKeypair,
  generateKeypairSeed,
  generateKeyPairFromSeed,
  encodeKey,
  decodeKey,
  parseDID,
  isEncodedPublicKey,
  publicKeyToAgentEmail,
  isAgentEmail,
  agentEmailToPublicKey,
} from '../../server/crypto.js'
// import { createDid } from '../../server/ceramic.js'

test('generating keys from seed is deterministic', async t => {
  const seed = decodeKey('uazp-KuM6UhNjwJAEcINMQWjNHNt3EITud8gTX-bjwoA')
  t.alike(Array.from(seed), [
    107,  58, 126,  42, 227,  58,  82,  19,
     99, 192, 144,   4, 112, 131,  76,  65,
    104, 205,  28, 219, 119,  16, 132, 238,
    119, 200,  19,  95, 230, 227, 194, 128
  ])
  const keys = generateKeyPairFromSeed(seed)
  t.alike(
    keys.publicKey,
    decodeKey('uKa2FjA9tC-HqYglkEzDjVzAC_sih3oPOZchI7Rq9HCQ')
  )
  t.alike(Array.from(keys.secretKey), [
     107,  58, 126,  42, 227,  58,  82,  19,
      99, 192, 144,   4, 112, 131,  76,  65,
     104, 205,  28, 219, 119,  16, 132, 238,
     119, 200,  19,  95, 230, 227, 194, 128
  ])
})

test('agent emails', async t => {
  const kp = generateKeyPairFromSeed(decodeKey('ucdvQeYJeqOzh1p5ouLaxDXzkiiquRErWHSnPGXZBcAI'))
  const email = publicKeyToAgentEmail(kp.publicKey, 'example.test')
  t.is(email, 'uSVhcLK34hZu6ZjrWml9qdD2IFDUuo2shVJYBJ-a9CRg@example.test')
  t.ok(isAgentEmail(email))
  t.alike(agentEmailToPublicKey(email), kp.publicKey)
})

// test('key regexp patterns', async t => {
//   const genEncodedPublicKey = () =>
//     encodeKey(
//       generateKeyPairFromSeed(
//         generateKeypairSeed()
//       ).publicKey
//     )
//
//   console.log(
//     new Array(10).fill().map(genEncodedPublicKey)
//   )
// })

test('isEncodedPublicKey', async t => {
  t.ok(isEncodedPublicKey('kjzl6cwe1jw1462gsz9f56jwywi0w5ltv2k3rbhyfmnveac8mbwgu9dthltm2ug'))
  t.ok(isEncodedPublicKey('kjzl6cwe1jw1479qsc6k0c42t0zj4u2vn5i8b9zhpb4piudl6wqy5vhon10bpkm'))
  t.ok(isEncodedPublicKey('zGazA93NK9kx4C6eoWgBy97Yjw9GtRMGvtn4ahSzYx7Aa'))
  t.ok(isEncodedPublicKey('ucdqBGGQc2YyYsl_PyecOFaal7-FkOuYuOAONx8YTe2w'))
})

// test('key encoding', async t => {
//   // const { did, secretSeed } = await createDid()
//   // const { publicKey, secreyKey } = generateKeyPairFromSeed(secretSeed)
//   // const encodedPublicKey = did.id.split(':')[2]
//
// })

// test('decoding did:3:xxxxxxx', async t => {
//   t.alike(
//     decodeKey('kjzl6cwe1jw1462gsz9f56jwywi0w5ltv2k3rbhyfmnveac8mbwgu9dthltm2ug'),
//     Buffer.from([1,2,3])
//   )
// })

// test('key regexp patterns', async t => {
//   const {did, secretSeed} = await createDid()
//   console.log({did: did.id})
//   const encodedPublicKey = did.id.split(':')[2]
//   console.log({ encodedPublicKey })
//   console.log({ publicKey: decodeKey(encodedPublicKey) })
// })
