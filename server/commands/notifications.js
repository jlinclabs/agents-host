export async function create({ type, ...payload }, context){
  return await context.prisma.notification.create({
    data: {
      userId: context.userId,
      type,
      payload,
    },
    select: {
      id: true
    }
  })
}