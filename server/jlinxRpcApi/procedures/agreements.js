export default {
  async create({ parties, terms }, { agent }){
    return await agent.agreements.create({
      parties,
      terms,
      signatureDropoffUrl: `${process.env.APP_ORIGIN}/api/jlinx/v0/agreements/signatures`
    })
  },

  async sign({ agreementId }, { agent }){
    return await agent.agreements.sign(agreementId)
  },

  async getAll({ }, { agent }){
    return await agent.agreements.all()
  },

  async get({ id }, { agent }){
    return await agent.agreements.get(id)
  },
}
