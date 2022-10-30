import { MissingArgumentError } from 'app-shared/server/errors.js'

async function createEvent({ id, value }, context){
  // const { logger, client, userId }
  // logger = logger.ctx('Documents.commands.createEvent')
  // logger.debug({ userId, type, uid, value })
  // if (!uid) throw new MissingArgumentError('uid')
  // if (!userId) throw new UnauthorizedError(`create a ${type}`)
  await context.prisma.documentEvent.create({
    data: {
      // documentId:
    }
  })
  const query = knex('document_events').insert({
    user_account_id: userId,
    type,
    uid,
    value: value ? JSON.stringify(value) : null,
  })
  await client.none(`${query}`)
}

export async function create({ type, value }, context){
  // const { logger, client, userId }
  logger = logger.ctx('Documents.commands.create')
  logger.debug({ userId, type, value })
  const uid = createUid()
  await Documents.commands.createEvent({ logger, client, userId, type, uid, value })
  return uid
}

export async function update({ type, uid, value }, context){
  // const { logger, client, userId }
  logger = logger.ctx('Documents.commands.update')
  logger.debug({ userId, type, uid, value })
  await Documents.queries.getOne({ logger, client, userId, type, uid })
  await Documents.commands.createEvent({ logger, client, userId, type, uid, value })
}

export async function destroy({ type, uid }, context){
  // const { logger, client, userId }
  logger = logger.ctx('Documents.commands.destroy')
  logger.debug({ userId, type, uid })
  await Documents.queries.getOne({ logger, client, userId, type, uid })
  await Documents.commands.createEvent({ logger, client, userId, type, uid, value: null })
}