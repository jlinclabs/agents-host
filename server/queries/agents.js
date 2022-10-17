// export async function _open({}, context){
//   context.requireLoggedIn()
//   context.userId
//   const { did, didSecret, vaultKey } =  await context.prisma.user.find
//   return await Agent.open({
//     did, didSecret, vaultKey
//   })
// }
//
// // import prisma from 'app-shared/server/prisma.js'
// //
// // export async function all({}, context){
// //   context.requireLoggedIn()
// //   return await prisma.agent.findMany({
// //     where: {
// //       userId: context.userId,
// //     },
// //     select: {
// //       id: true,
// //       createdAt: true,
// //       did: true,
// //       userId: true,
// //     }
// //   })
// // }