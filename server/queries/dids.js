export async function getDidDocument({ did }, context){
  const agent = await context.getAgent()
  console.log({ agent })
  return await agent.dids.resolve(did)
}
