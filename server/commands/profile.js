export async function update(changes, context){
  const agent = await context.getAgent()
  let profile = await context.queries.profile.get()
  profile = { ...profile, ...changes } // TODO better merge
  await agent.vault.set('profile', profile, 'json')
  return profile
}