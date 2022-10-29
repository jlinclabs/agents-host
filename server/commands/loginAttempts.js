export async function create({ userId }, context){
  const { id } = await context.prisma.loginAttempt.create({
    data: {},
    select: { id: true }
  })
  await context.commands.notifications.create({
    type: 'loginAttempt',
    loginAttemptId: id,
  })
  return id
}