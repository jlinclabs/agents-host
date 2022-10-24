export async function update(changes, context){
  const agent = await context.getAgent()
  let profile = await context.queries.profile.get()
  profile = { ...profile, ...changes }
  await agent.vault.set('profile', changes, 'json')
  return profile
}