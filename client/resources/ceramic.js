import { useRemoteQuery } from '../lib/rpc'

export function useCeramicStreamEvents(id){
  const { view: events, ...state } = useRemoteQuery(
    id ? `ceramic.events` : null, { id }
  )
  return [events, state]
}
