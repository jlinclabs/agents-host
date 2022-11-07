import Agent from '../Agent/index.js'

export async function _getAgent({/* did */}, context){
  let { did, didSecret, vaultKey } = await context.queries.auth._getSecrets()
  return await Agent.open({ did, didSecret, vaultKey })
}

export async function getDIDDocument({ did }, context){
  const record = await context.prisma.user.findUnique({
    where: { did },
    select: { id: true },
  })
  console.log({ record })
  if (!record) return
  return await context.queries.dids.getDidDocument({ did })
}