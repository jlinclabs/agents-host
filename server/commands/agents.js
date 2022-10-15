import prisma from 'app-shared/server/prisma.js'
import Agent from '../Agent/index.js'

export async function create({ }, context){
  context.requireLoggedIn()
  const { agent, didSecret, vaultKey } = await Agent.create()
  const { id } = await prisma.agent.create({
    data: {
      userId: context.userId,
      vaultKey,
      did: agent.did,
      didSecret: didSecret.toString('hex'),
    },
    select: {
      id: true,
    }
  })
  return { id, did: agent.did }
}