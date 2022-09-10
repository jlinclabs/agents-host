export async function getDidDocument({ did }, { agent }){
  return await agent.dids.resolve(did)
}
