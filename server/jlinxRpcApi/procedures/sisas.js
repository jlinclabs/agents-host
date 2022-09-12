export default {

  async create({ requestedData, termsOfUse }, { agent }){
    return await agent.sisas.create({
      requestedData,
      termsOfUse,
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
