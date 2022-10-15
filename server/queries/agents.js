import prisma from 'app-shared/server/prisma.js'

export async function all({}, context){
  context.requireLoggedIn()
  return await prisma.agent.findMany({
    where: {
      userId: context.userId,
    },
    select: {
      id: true,
      createdAt: true,
      did: true,
      userId: true,
    }
  })
}