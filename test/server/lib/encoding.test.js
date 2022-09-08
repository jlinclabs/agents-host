import test from 'brittle'

import {
  toJSON,
  parseJSON,
  stringToB64,
  b64ToString,
  objectToBase64,
  base64ToObject
} from '../../../server/lib/encoding.js'

test('encoding json should canonicalize', async (t) => {
  for ( const object of [
    { a: 'one', b: 'two', c: 'three' },
    { a: 'one', c: 'three', b: 'two' },
    { b: 'two', a: 'one', c: 'three' },
    { b: 'two', c: 'three', a: 'one' },
  ]){
    t.is(toJSON(object), '{"a":"one","b":"two","c":"three"}')
  }
})

test('encoding', async (t) => {
  const asB64 = objectToBase64({ payload: 'whatever' })
  t.is(typeof asB64, 'string')
  t.is(b64ToString(asB64), '{"payload":"whatever"}')
  t.is(stringToB64(b64ToString(asB64)), asB64)
  t.alike(parseJSON(b64ToString(asB64)), { payload: 'whatever' })
  t.alike(base64ToObject(asB64), { payload: 'whatever' })
})
