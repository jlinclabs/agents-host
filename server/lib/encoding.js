import { canonicalize as jsonCanonicalize } from 'json-canonicalize'
// import {* as json} from 'multiformats/codecs/json'
import { base64url } from "multiformats/bases/base64"

export const unit8ArrayToString = uint8array =>
  new TextDecoder("utf-8").decode(uint8array)

export const stringToUnit8Array = string =>
  new TextEncoder("utf-8").encode(string)

export const toJSON = object => jsonCanonicalize(object)

export const parseJSON = json => JSON.parse(json)

export const stringToB64 = string =>
  base64url.encode(stringToUnit8Array(string))

export const b64ToString = b64 =>
  unit8ArrayToString(base64url.decode(b64))

export const objectToBase64 = object =>
  stringToB64(toJSON(object))

export const base64ToObject = b64String =>
  parseJSON(b64ToString(b64String))
