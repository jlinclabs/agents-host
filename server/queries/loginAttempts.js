import { InvalidArgumentError } from 'app-shared/server/errors.js'
import wait from 'app-shared/shared/wait.js'

export async function getById({ id }, context){
  if (!id) throw new InvalidArgumentError('id', id)
  return context.prisma.loginAttempt.findUnique({
    where: {
      id,
      // userId: context.userId,
    },
    select: {
      userId: true,
      id: true,
      createdAt: true,
      host: true,
      accepted: true,
      resolved: true,
    }
  })
}

// export async function waitFor({ id }, context){
//   const record = await context.prisma.loginAttempt.findUnique({
//     where: {
//       id,
//     },
//     select: {
//       id: true,
//       createdAt: true,
//       user: true,
//       userId: true,
//       host: true,
//       accepted: true,
//       resolved: true,
//     }
//   })
//   console.log('LOGIN ATTEMP RESOLVED?', record)
//
//   if (record.resolved) return { accepted: record.accepted }
//
//   await wait(1000)
//   return waitFor({ id }, context)
// }