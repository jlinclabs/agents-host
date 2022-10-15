export * from 'app-shared/server/queries/auth.js'

export async function getCurrentUser({}, context){
  return await context.queries.auth._selectCurrentUser({
    agents: true,
  })
}
