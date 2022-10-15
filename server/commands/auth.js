import * as auth from 'app-shared/server/commands/auth.js'
export * from 'app-shared/server/commands/auth.js'

export async function signup({ email, password }, context){
  const { id } = await auth.signup({ email, password }, context)
  await context.commands.agents.create()
  return { id }
}