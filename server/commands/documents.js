import { v4 as uuid } from 'uuid'
import { MissingArgumentError } from 'app-shared/server/errors.js'

export async function create({ name, value }, context){
  if (!value) throw new MissingArgumentError('value', value)
  return context.commands.documents.update({ id: uuid(), name, value })
}

export async function update({ id, name, value }, context){
  context.requireLoggedIn()
  if (!id) throw new MissingArgumentError('id', id)
  if (typeof value === 'undefined')
    throw new MissingArgumentError('value', value)
  const doc = await context.queries.documents.getOne({ id })
  if (!doc) throw new Error(`unable to find doc id="${id}"`)
  console.log('UPDATRING', doc)
  // todo enforce userId permissions
  await context.prisma.documentEvent.create({
    data: {
      documentId: id,
      name: doc.name,
      value,
      userId: context.userId,
    },
  })
  return context.queries.documents.getOne({ id })
}

export async function destroy({ id }, context){
  return context.commands.documents.update({ id, value: null })
}