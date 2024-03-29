import crypto from 'crypto'
import env from '../../../env.js'
import { CeramicClient } from '@ceramicnetwork/http-client'
import { TileDocument } from '@ceramicnetwork/stream-tile'
import { DID } from 'dids'
import { Ed25519Provider } from 'key-did-provider-ed25519'
import { getResolver as getDidKeyResolver } from 'key-did-resolver'
import { ThreeIdProvider } from '@3id/did-provider'
import { Resolver as DidResolver } from 'did-resolver'
import { getResolver as getDid3IDResolver } from '@ceramicnetwork/3id-did-resolver'
import { readEncodedComposite } from '@composedb/devtools-node'
import { fromString } from 'uint8arrays/from-string'

// Hexadecimal-encoded private key for a DID having admin access to the target Ceramic node
// Replace the example key here by your admin private key
const privateKey = fromString(env.COMPOSEDB_PRIVATE_KEY, "base16")

const did = new DID({
  resolver: getDidKeyResolver(),
  provider: new Ed25519Provider(privateKey),
})
await did.authenticate()

// Replace by the URL of the Ceramic node you want to deploy the Models to
const ceramic = new CeramicClient(env.CERAMIC_API_URL)
// An authenticated DID with admin access must be set on the Ceramic instance
ceramic.did = did

export { ceramic }
//
// // Replace by the path to the local encoded composite file
// const composite = await readEncodedComposite(ceramic, 'my-first-composite.json')
//
// // Notify the Ceramic node to index the models present in the composite
// await composite.startIndexingOn(ceramic)
//
//


// const API_URL = env.CERAMIC_API_URL

// let ceramic
// export async function ready(){
//   if (ceramic) return
//   console.log('[ceramic] connecting', env.CERAMIC_API_URL)
//   ceramic = new CeramicClient(API_URL)
//   console.log('[ceramic] connected', env.CERAMIC_API_URL)
//
//   // // https://developers.ceramic.network/reference/accounts/3id-did/#3id-did-provider
//   // const app3id = await ThreeIdProvider.create({
//   //   ceramic,
//   //   authId: `jlinx-demo-app-${env.APP_NAME}`,
//   //   authSecret: Buffer.from(env.CERAMIC_NODE_SECRET, 'hex'),
//   //   async getPermission(request){ return request.payload.paths },
//   // })
// }
//
// ready().catch(error => {
//   console.error(error)
// })

export async function createDid(){
  // await ready()
  console.log('[ceramic] creating did')
  const secretSeed = Buffer.alloc(32)
  crypto.randomFillSync(secretSeed)

  // https://developers.ceramic.network/reference/accounts/3id-did/#3id-did-provider
  console.log('[ceramic] creating threeID provider')
  const threeID = await ThreeIdProvider.create({
    ceramic,
    seed: secretSeed,
    async getPermission(request){ return request.payload.paths },
  })

  console.log({ threeID })

  console.log('[ceramic] creating did using threeID provider')
  const did = new DID({
    provider: threeID.getDidProvider(),
    resolver: {
      ...getDid3IDResolver(ceramic),
      ...getDidKeyResolver(),
    },
  })

  console.log('[ceramic] authenticating did')
  await did.authenticate()

  // return the did and secret so we can store the secret safely
  return { did, secretSeed }
}

export async function getDid(didString, secretSeed){
  // await ready()
  console.log('[ceramic] getting did', didString)
  // TODO fail fast on did ≠ secret mismatch

  // THIS IS SO SLOW
  // https://developers.ceramic.network/reference/accounts/3id-did/#3id-did-provider
  const threeID = await ThreeIdProvider.create({
    ceramic,
    seed: secretSeed,
    did: didString,
    async getPermission(request){ return request.payload.paths },
  })

  const did = new DID({
    provider: threeID.getDidProvider(),
    resolver: {
      ...getDid3IDResolver(ceramic),
      ...getDidKeyResolver(),
    },
  })

  // THIS IS ALSO QUITE SLOW
  console.log('[ceramic] authenticating did', { did })
  await did.authenticate()

  if (did.id !== didString){
    throw new Error(`resolved the wrong did: "${did.id}" !== "${didString}"`)
  }
  return did
}

export async function resolveDidDocument(didString){
  if (!didString) throw new Error(`didString is required`)
  // await ready()
  console.log('[ceramic] resolving did document', didString)

  const didResolver = new DidResolver(
    {
      ...getDid3IDResolver(ceramic),
      ...getDidKeyResolver(),
    },
    {}
  )

  const {
    didResolutionMetadata,
    didDocument,
    didDocumentMetadata,
  } = await didResolver.resolve(didString)
  if (!didDocument){
    throw new Error(`failed to resolve did="${didString}"`)
  }
  if (didDocument.id !== didString){
    throw new Error(`resolved the wrong did: "${did.id}" !== "${didString}"`)
  }
  console.log('[ceramic]', { didDocument })
  return didDocument
}

export async function createDocument(content, metadata, opts){
  // await ready()
  console.log('[ceramic] creating document', { content, metadata, opts })
  return await TileDocument.create(ceramic, content, metadata, opts)
}

export async function loadStream(streamId){
  // await ready()
  console.log('[ceramic] loading stream', streamId)
  return await ceramic.loadStream(streamId)
}

export async function loadDocument(streamId){
  // await ready()
  console.log('[ceramic] loading document', streamId)
  return await TileDocument.load(ceramic, streamId)
}



// async function authenticateCeramic(seed) {
//   // Activate the account by somehow getting its seed.
//   // See further down this page for more details on
//   // seed format, generation, and key management.
//   const provider = new Ed25519Provider(seed)
//   // Create the DID object
//   const did = new DID({ provider, resolver: getResolver() })
//   // Authenticate with the provider
//   await did.authenticate()
//   // Mount the DID object to your Ceramic object
//   ceramic.did = did
// }

// async function main () {
//   // did:key:z6MkhSJKV8xg3Lj4zSXHyqNd51EZMrkWQHKyHsRNQvmfFCjT
//   const seed = Buffer.from('593df14c304756ba60c85136acd4aeab36153e55944a2a011eb2ea7fe5f8b00f', 'hex')
//   console.log('authenticating')
//   await authenticateCeramic(seed)
//   console.log('authenticated as', ceramic.did.id)

//   const [command, ...args] = process.argv.slice(2)
//   console.log(command, ...args)

//   if (command === 'create'){
//     const doc = await TileDocument.create(ceramic, args[0])
//     console.log('create', doc.id)
//   } else if (command === 'watch'){
//     const doc = await TileDocument.load(ceramic, args[0])
//     console.log('loaded', doc.id)
//     doc.subscribe((...args) => {
//       console.log('CHANGE', args, doc)
//       console.log(doc.content)
//     })
//   } else if (command === 'update'){
//     const doc = await TileDocument.load(ceramic, args[0])
//     console.log('loaded', doc.id)
//     await doc.update(args[1])
//   }else{
//     throw new Error(`unknown command "${command}"`)
//   }

//   // console.log('loading stream')
//   // const stream = await ceramic.loadStream('kjzl6cwe1jw14al2qy3pa50ibes40em1p1knnnpf6jj7ranfugbwwp3ovy8ihmy')
//   // console.log({
//   //   stream,
//   //   id: stream.id,
//   //   commitId: stream.commitId,
//   //   anchorCommitIds: stream.anchorCommitIds,
//   // })

//   // console.log(process.env.ARGV)

//   // const x = stream.subscribe((...args) => {
//   //   console.log('SUB HANDLER CALLER', args)

//   // })
//   // console.log('SUB RET V', x)
// }

// main().catch(error => {
//   console.error(error)
//   process.exit(1)
// })
