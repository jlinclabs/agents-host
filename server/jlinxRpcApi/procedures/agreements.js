export async function create({ parties, terms }, { agent }){
  return await agent.agreements.create({
    parties,
    terms,
    signatureDropoffUrl: `${process.env.APP_ORIGIN}/api/jlinx/v0/agreements/signatures`
  })
}

export async function sign({ agreementId }, { agent }){
  return await agent.agreements.sign(agreementId)
}

export async function getAll({ }, { agent }){
  return await agent.agreements.all()
}

export async function get({ id }, { agent }){
  return await agent.agreements.get(id)
}
