export async function create({ userId, type, ...payload }, context){
  await context.prisma.notifications.create({
    userId,
    type,
    payload: JSON.stringify(payload),
  })
  return id
}