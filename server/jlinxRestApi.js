import Router from 'express-promise-router'
import Agent from './Agent/index.js'
import { JlinxClient } from './jlinx.js'

const router = Router()

router.post('/api/jlinx/agreements/signatures', async (req, res) => {
  const { agreementId, signatureId } = req.body
  const jlinx = new JlinxClient()

  // get agentDid for agreement
  const agreement = await jlinx.get(agreementId)
  const did = agreement.metadata.controllers[0]

  // ack signature
  const agent = await Agent.find(did)
  await agent.agreements.ackSignature(signatureId)
  res.json({ success: true })
})

export default router
