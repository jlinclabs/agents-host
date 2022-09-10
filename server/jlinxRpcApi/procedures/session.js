

export async function get(){
  return {
    FAKE_SESSION: 'boom'
  }
}



export async function getCurrentAgent({ session }){
  if (session?.agent?.did) return { did: session.agent.did }
  return null
}
