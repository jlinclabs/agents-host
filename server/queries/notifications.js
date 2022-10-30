export async function get({}, context){
  const records = await context.prisma.notification.findMany({
    where: {
      userId: context.userId,
    },
  })
  return records.map(({payload, ...record}) => ({...payload, ...record}))
}