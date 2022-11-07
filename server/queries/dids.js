export async function getDidDocument({ did }, context){
  const agent = await context.getAgent()
  return await agent.resolveDID(did)
}
