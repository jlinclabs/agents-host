export async function create({type, userId, ...payload}, context){
  await context.prisma.notifications.create({
    data: {
      type,
      userId: context.userId,
      payload: JSON.stringify(payload),
    },
  })
}