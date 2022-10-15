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

  // idea on how to subscribe to views
  // sub means wait for next change onNext
  subs: {
    async getAll({ }, { agent }){
      await agent.agreements.next()
    },
    async get({ id }, { agent }){
      await agent.agreements.get(id)
    }
  }
}
