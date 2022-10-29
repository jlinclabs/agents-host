import Debug from 'debug'
import { URL } from 'node:url'
import fetch from 'node-fetch'
import Router from 'express-promise-router'
import prisma from 'app-shared/server/prisma.js'
import jlinxApp from './jlinxApp.js'
import { Context } from './Context.js'


const debug = Debug('jlinx.api')
const router = Router()
export default router

router.post('/login', async (req, res) => {
  console.log('JLINC LOGIN', {
    headers: req.headers,
    body: req.body,
  })
  const host = new URL(req.headers.referer).host // TODO strip pathname
  console.log({ refererHost: host })
  const { jws } = req.body
  console.log({ jws })

  const { did: agentDid } = await jlinxApp.verifySignature(jws)
  console.log({ agentDid })

  const context = await getAgentContext(agentDid)
  const agent = await context.getAgent()

  await context.commands.loginAttempts.create({

  })

  const { didDocument } = await agent.resolveDID(`did:web:${host}`)
  const appDid = didDocument.id


  // ask the user if they want to login
  // insert a loginAttempt record with a uuid and return that to the app
  // the app should hit another route to wait for login response

  // getAppDid()

  const jwe = await agent.encrypt({
    successSoFar: ':D',
    appHost: host,
    appDidDocument: didDocument,
    appDid,
    // payload,
    // hostDidDocument,
  }, [appDid])

  console.log('jwe', jwe)

  res.json({ jwe })
})

router.use((req, res, next) => {
  res.status(404).json({})
})

// TODO dry up this dup error hadling into app-shared
router.use(async (error, req, res, next) => {
  console.error('rendering JSON error STATUS=500', error)
  res.status(500)
  res.json({
    error: {
      message: error?.message ?? error,
      stack: error?.stack,
    }
  })
})

async function getAgentContext(did){
  const record = await prisma.user.findUnique({
    where: { did },
    select: {
      id: true,
      didSecret: true,
      vaultKey: true,
    }
  })
  if (!record) throw new Error(`unable to find agent with did="${did}"`)

  const context = new Context({ userId: record.id })
  return context
  // const { id, didSecret, vaultKey } = record
  // return await Agent.open({ did, didSecret, vaultKey })
}


async function getAppDid(host){
  const res = await fetch(
    `https://${host}/.well-known/did.json`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    }
  )
  if (!res .ok){
    console.log(res )
    throw new Error(`failed to get id of requesting app`)
  }
  const { didDocument } = await res.json()
  console.log({ didDocument })
  return didDocument
}