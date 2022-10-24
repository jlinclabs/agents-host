import Agent from '../Agent/index.js'

export async function _getAgent({/* did */}, context){
  let { did, didSecret, vaultKey } = await context.queries.auth._getSecrets()
  return await Agent.open({ did, didSecret, vaultKey })
}
