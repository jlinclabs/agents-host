import { generateVaultKey } from '../vaults.js'
import prisma from '../../prisma/client.js'
import { createDid } from '../ceramic.js'
import Agent from './index.js'

export default async function createAgent(){
  const vaultKey = await generateVaultKey()
  const { did, secretSeed: didSecret } = await createDid()
  const data = {
    vaultKey,
    did: did.id,
    didSecret: didSecret.toString('hex'),
  }
  if (password){
    data.passwordHash = await bcrypt.hash(
      password, data.passwordSalt, 10
    )
  }
  console.log('CREATING USER', {data})
  const { id, createdAt } = await prisma.agent.create({
    data, select: { id: true, createdAt: true }
  })

  const agent = await Agent.open({
    id,
    did: did.id,
    didSecret,
    createdAt,
    vaultKey,
  })
  agent.vault.set('did', did.id, 'string')
  agent.vault.set('didSecret', didSecret, 'raw')
  return agent
}
