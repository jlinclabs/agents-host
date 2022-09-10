import createAgent from '../../Agent/create.js'

export async function getCurrentAgent({}, { session }){
  if (session?.agent?.did) return { did: session.agent.did }
  return null
}

export async function signup({ password, email }, { session }){
  if (email && !isEmail(email))
    throw new InvalidArgumentError('email', email)
  // if (!isPassword(password)) throw new InvalidArgumentError('password', password)

  console.log('signup', { password, email }, { session })
  if (session.agentId){
    throw new Error(`please logout first`)
  }
  const agent = await createAgent({ email, password })
  await session.setAgentId(agent.id)
  console.log('CREATED', { agent })
  return { did: agent.did }
}

export async function login({ email, password }, { session }){
  let agent
  if (email && password){
    agent = await agents.queries.findByEmailAndPassword(email)
    if (!agent){ throw new Error(`invalid password`)}
  }
  await session.setAgentId(agent.id)
  return { did: agent.did }
}

export async function logout({}, { session }){
  await session.delete()
  return null
}
