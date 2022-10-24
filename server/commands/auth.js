import * as auth from 'app-shared/server/commands/auth.js'
export * from 'app-shared/server/commands/auth.js'
import Agent from '../Agent/index.js'

export async function signup({ email, password }, context){
  console.log('AGENT signup', { email, password })
  await auth.validateSignup({ email, password }, context)
  const { did, didSecret, vaultKey } = await Agent.create()
  const { id } = await auth._createUser(
    {
      email,
      password,
      did,
      didSecret: didSecret.toString('hex'),
      vaultKey,
    },
    context
  )
  return { id }
}gtit 