import { InvalidArgumentError } from 'app-shared/server/errors.js' 

export async function create({ userId, host }, context){
  const { id } = await context.prisma.loginAttempt.create({
    data: { userId, host },
    select: { id: true }
  })
  await context.commands.notifications.create({
    type: 'loginAttempt',
    loginAttemptId: id,
    host,
  })
  return id
}

export async function resolve({ id, accepted }, context) {
  if (typeof accepted !== 'boolean')
    throw new InvalidArgumentError('accepted', accepted)
  const record = await context.queries.loginAttempts.getById({ id })
  console.log({ record })
  await context.prisma.loginAttempt.update({
    where: { id },
    data: {
      accepted: !!accepted,
      resolved: true
    }
  })
  return await context.queries.loginAttempts.getById({ id })

}