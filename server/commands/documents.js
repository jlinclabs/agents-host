import { v4 as uuid } from 'uuid'
import { MissingArgumentError } from 'app-shared/server/errors.js'

export async function create({ value }, context){
  if (!value) throw new MissingArgumentError('value', value)
  return context.commands.documents.update({ id: uuid(), value })
}

export async function update({ id, value }, context){
  context.requireLoggedIn()
  if (!id) throw new MissingArgumentError('id', id)
  if (typeof value === 'undefined')
    throw new MissingArgumentError('value', value)
  // todo enforce userId permissions
  await context.prisma.documentEvent.create({
    data: {
      documentId: id,
      value,
      userId: context.userId,
    },
  })
  return context.queries.documents.getOne({ id })
}

export async function destroy({ id }, context){
  return context.commands.documents.update({ id, value: null })
}