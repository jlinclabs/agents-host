export async function create({ type, ...payload }, context){
  return context.prisma.notification.create({
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

export async function deleteAll({}, context){
  return context.prisma.notification.deleteMany({
    where: { userId: context.userId },
  })
}