import { useQuery, useCommand } from 'app-shared/client/hooks/cqrpc'

export function useDidDocument(did){
  const { result: didDocument, ...state } = useQuery(`dids.getDidDocument`, {did})
  return [didDocument, state]
}
