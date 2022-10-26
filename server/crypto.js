import crypto from 'crypto'
import { base64url } from 'multiformats/bases/base64'
import { generateKeyPairFromSeed } from '@stablelib/x25519';
import { parse as parseDID } from 'did-resolver'

import { isEmail } from './lib/validators.js'

const PCT_ENCODED = '(?:%[0-9a-fA-F]{2})'
const ID_CHAR = `(?:[a-zA-Z0-9._-]|${PCT_ENCODED})`
const METHOD_ID = `((?:${ID_CHAR}*:)*(${ID_CHAR}+))`
const encodedPublicKeyRegExp = new RegExp(`^${METHOD_ID}$`)

export function isEncodedPublicKey(key) {
  return encodedPublicKeyRegExp.test(key)
}

export function generateKeypairSeed(){
  const secretSeed = Buffer.alloc(32)
  crypto.randomFillSync(secretSeed)
  return secretSeed
}

export function generateKeypair() {
  const seed = generateKeypairSeed()
  return { ...generateKeyPairFromSeed(seed), seed }
}

export { generateKeyPairFromSeed, parseDID }

export function encodeKey(key){
  return base64url.encode(key)
}

export function decodeKey(key){
  return base64url.decode(key)
}

export function publicKeyToAgentEmail(publicKey, domain){
  return `${encodeKey(publicKey)}@${domain}`
}

export function agentEmailToPublicKey(email){
  const encoded = email.match(/^([a-zA-Z0-9_-]{32,64})@.+/)[1]
  return decodeKey(encoded)
}

// const AGENT_EMAIL_REGEXP = new RegExp(`^([a-zA-Z0-9_-]+)@(([[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}])|(([a-zA-Z-0-9]+.)+[a-zA-Z]{2,}))$`)
export function isAgentEmail(email){
  return isEmail(email) && /^[a-zA-Z0-9_-]{32,64}@.+/.test(email)
}
