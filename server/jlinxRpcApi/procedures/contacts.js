export default {
  async getAll({ }, { agent }){
    return await agent.contacts.all()
  },

  async add({ did }, { agent }){
    return await agent.contacts.add(did)
  },

  async delete({ did }, { agent }){
    return await agent.contacts.add(did)
  },
}
