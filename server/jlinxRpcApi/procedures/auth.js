import bcrypt from 'bcrypt'
import prisma from '../../../prisma/client.js'
import Agent from '../../Agent/index.js'
import { isEmail, isPassword } from '../../lib/validators.js'
import { InvalidArgumentError } from '../../errors.js'

export async function getCurrentAgent({}, { session }){
  if (session?.agent?.did) return { did: session.agent.did }
  return null
}

export async function signup({ password, email }, { session }){
  console.log('SIGNUP', { password, email })
  if (session.agentId)
    throw new Error(`please logout first`)

  if (password && !isPassword(password))
    throw new InvalidArgumentError('password')

  if (email && !isEmail(email))
    throw new InvalidArgumentError('email', email)

  const { agent, didSecret, vaultKey } = await Agent.create()
  console.log('CREATED AGENT', { agent, didSecret, vaultKey })
  const data = {
    vaultKey,
    did: agent.did,
    didSecret: didSecret.toString('hex'),
  }
  if (password){
    data.passwordHash = await bcrypt.hash(password, 10)
  }
  console.log('CREATING USER', {data})
  const { id, createdAt } = await prisma.agent.create({
    data,
    select: { id: true, createdAt: true }
  })
  await session.setAgentId(id)
  return { did: agent.did }
}

export async function login({ did, email, password }, { session }){
  const record = await prisma.agent.findUnique({
    where: { email },
    select: {
      id: true,
      createdAt: true,
      did: true,
      didSecret: true,
      vaultKey: true,
    }
  })
  if (record){
    record.didSecret = Buffer.from(record.didSecret, 'hex')
  }
  return record

  // let agent
  // if (email && password){
  //   agent = await agents.queries.findByEmailAndPassword(email)
  //   if (!agent){ throw new Error(`invalid password`)}
  // }
  const agent = await Agent.find({ did, email, password })
  await session.setAgentId(agent.id)
  return { did: agent.did }
}

export async function logout({}, { session }){
  await session.delete()
  return null
}
