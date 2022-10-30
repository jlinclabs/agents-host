export async function create({ userId, host }, context){
  const { id } = await context.prisma.loginAttempt.create({
    data: { userId, host },
    select: { id: true }
  })
  await context.commands.notifications.create({
    type: 'loginAttempt',
    loginAttemptId: id,
  })
  return id
}