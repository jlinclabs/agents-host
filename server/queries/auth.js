import b4a from 'b4a'
export * from 'app-shared/server/queries/auth.js'

export async function getCurrentUser({}, context){
  return await context.queries.auth._selectCurrentUser({
    did: true,
  })
}

export async function _getSecrets({}, context){
  let { did, didSecret, vaultKey } = await context.queries.auth
      ._selectCurrentUser({
        did: true, didSecret: true, vaultKey: true
      })
  didSecret = b4a.from(didSecret, 'hex')
  return { did, didSecret, vaultKey }
}