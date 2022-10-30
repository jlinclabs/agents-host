export async function all({}, context){
  const records = await context.prisma.notification.findMany({
    where: {
      userId: context.userId,
    },
    orderBy: {
      createdAt: 'desc'
    }
  })
  return {
    notifications: records.map(({payload, ...record}) => ({...payload, ...record}))
  }
}