import Path from 'node:path'
import fs from 'node:fs/promises'
import { ModelManager } from '@glazed/devtools'
import env from '../../../environment.js'
import { ceramic } from '../../ceramic.js'

const managerJSONPath = Path.join(env.APP_ROOT, 'server/ceramic/models.json')
const manager = ModelManager.fromJSON({
  ceramic,
  model: JSON.parse(await fs.readFile(managerJSONPath))
})

await manager.useDeployedSchema('MySchema', 'k3y52l7qbv1frxo5510cruhkluijtav39g4vacian4lrh7bxs8vk0b2w7pjmilqtc')

console.log( 'manager.toJSON()', manager.toJSON() )
await fs.writeFile(
  managerJSONPath,
  JSON.stringify(manager.toJSON(), null, 2)
)