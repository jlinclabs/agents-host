export async function get({}, context){
  const agent = await context.getAgent()
  const profile = await agent.vault.get('profile') || {}
  return profile
}