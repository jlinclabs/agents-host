import { useRemoteQuery, useRemoteCommand } from '../lib/rpc'

export function useDidDocument(did){
  const { view: didDocument, ...state } = useRemoteQuery(`dids.getDidDocument`, {did})
  return [didDocument, state]
}
