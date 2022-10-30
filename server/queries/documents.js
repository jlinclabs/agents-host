export async function all({}, context) {
  return {
    keys: Object.keys(context.prisma),
  }
  const records = await context.prisma.document.findMany({
    where: {
      userId: context.userId
    },
  })
  console.log({ records })
  return records
}
// export async function select({ logger, client, userId, userIds, type, uid }){
//   logger = logger.ctx('Documents.queries.select');
//   if (userId) userIds = [userId];
//   logger.debug({ userId, type });
//   validateType(type);
//   const query = knex('documents')
//     .select('*')
//     .where({ deleted_at: null, type })
//     .orderBy('updated_at', 'DESC');
//   if (userId) query.whereIn('user_account_id', userIds);
//   if (uid) query.where({ uid });
//   const records = await client.manyOrNone(`${query}`);
//   return records.map(record => ({
//     version: record.version,
//     createdAt: record.created_at,
//     updatedAt: record.updated_at || undefined,
//     deletedAt: record.deleted_at || undefined,
//     userId: record.user_account_id,
//     type: record.type,
//     uid: record.uid,
//     value: record.value,
//   }));
// }
//
// export async function index({ logger, client, userId, type }){
//   logger = logger.ctx('Documents.queries.index');
//   if (!userId) throw new UnauthorizedError(`see ${type}`);
//   return await Documents.queries.select({ logger, client, userId, type });
// }
//
// export async function getOne({ logger, client, userId, type, uid, throwNotFoundError = true }){
//   logger = logger.ctx('Documents.queries.getOne');
//   logger.debug({ userId, type, uid });
//   if (!uid) throw new MissingArgumentError('uid');
//   if (!userId) throw new UnauthorizedError(`see ${type}`);
//   const [document] = await Documents.queries.select({ logger, client, userId, type, uid });
//   if (throwNotFoundError && !document) throw new NotFoundError(type, uid);
//   return document;
// }
//
// export async function getUidsForUserId({ logger, client, userId, type }){
//   logger = logger.ctx('Documents.queries.getUidsForUserId');
//   logger.debug({ userId, type });
//   validateType(type);
//   const query = knex('documents')
//     .select('uid')
//     .where({ deleted_at: null, type })
//     .orderBy('updated_at', 'DESC');
//   const records = await client.manyOrNone(`${query}`);
//   return records.map(r => r.uid);
// }