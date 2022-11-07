export async function getDidDocument({ did }, context){
  const agent = await context.getAgent()
  console.log({ agent })
  console.log({ did })
  const didDocument = await agent.resolveDID(did)
  console.log({ did, didDocument })
  return didDocument
}
