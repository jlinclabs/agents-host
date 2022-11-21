import Path from 'node:path'
import { readEncodedComposite } from '@composedb/devtools-node'
import env from '../../environment.js'
import { ceramic } from '../ceramic.js'


// const composite = await Composite.fromModels({
//   ceramic,
//   models: ['<model ID>']
// })


const COMPOSITES_PATH = Path.join(env.APP_ROOT, 'server', 'composites')

// Replace by the path to the local encoded composite file
const read = name =>
  readEncodedComposite(
    ceramic,
    Path.join(COMPOSITES_PATH, 'my-first-composite.json')
  )

const myFirstComposite = await read('my-first-composite.json')

// Notify the Ceramic node to index the models present in the composite
await myFirstComposite.startIndexingOn(ceramic)

export default {
  myFirstComposite,
}