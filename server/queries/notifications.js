export async function getAll({}, context){
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