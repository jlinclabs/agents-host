import { useAction } from '../lib/actions'
import { useView, useReloadView } from '../lib/views'

export function useDidDocument(did){
  const { view: didDocument, ...state } = useView(`dids.${did}`)
  return [didDocument, state]
}
