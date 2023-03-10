import { callbackify } from 'node:util'
import { Store } from 'express-session'
// import prisma from '../../prisma.js'

class SessionStore extends Store {}
Object.assign(SessionStore.prototype, {

  recordToSession(record){
    const { type, userId, appAccountId } = record
    let user
    if (type === 'user'){
      user = { type, userId }
    }else if (type === 'app'){
      const { appId } = record.appAccount
      user = { type, userId, appAccountId, appId }
    }

    return {
      cookie: {
        path: '/',
        _expires: record.expiresAt,
        originalMaxAge: 604800000,
        httpOnly: true,
        sameSite: false,
        secure: false
      },
      passport: user ? { user: JSON.stringify(user) } : undefined,
    }
  },

  sessionToRecord(session){
    let type = 'visitor', userId, appAccountId
    if (session?.passport?.user){
      ({ type, userId, appAccountId } = JSON.parse(session.passport.user))
    }
    return {
      id: session.id,
      expiresAt: session.cookie._expires,
      type,
      userId,
      appAccountId,
    }
  },

  all: callbackify(async function(){
    const records = await prisma.session.findMany({
      where: { deletedAt: null },
      include: { appAccount: true },
    })
    return records.map(this.recordToSession)
  }),

  destroy: callbackify(async function(id){
    await prisma.session.update({
      where: { id },
      data: { deletedAt: new Date },
    }).catch(() => {})
  }),

  clear: callbackify(async function(){
    await prisma.session.updateMany({
      where: { deletedAt: null },
      data: { deletedAt: new Date },
    })
  }),

  length: callbackify(async function(){
    return await prisma.session.count({
      where: { deletedAt: null },
    })
  }),

  get: callbackify(async function(id){
    const record = await prisma.session.findUnique({
      where: { id },
      include: { appAccount: true },
    })
    if (record && !record.deletedAt) return this.recordToSession(record)
  }),

  set: callbackify(async function(id, session){
    const record = this.sessionToRecord(session)
    await prisma.session.upsert({
      where: { id },
      create: record,
      update: record,
    })
  }),

  touch: callbackify(async function(id, session){
    await prisma.session.update({
      where: { id },
      data: { expiresAt: session.cookie._expires },
    })
  }),
})

const store = new SessionStore
export default store
