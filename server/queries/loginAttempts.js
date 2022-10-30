export async function waitFor({ id }, context){

  // const { id } = await context.prisma.loginAttempt.create({
  //   data: { userId, host },
  //   select: { id: true }
  // })

  const record = await context.prisma.notification.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      createdAt: true,
      user: true,
      userId: true,
      host: true,
      accepted: true,
      resolved: true,
    }
  })
  console.log('LOGIN ATTEMP RESOLVED?', record)

  if (record.resolved) return {
    accepted: record.accepted,
  }

  await wait(1000)
  return waitFor({ id }, context)
}