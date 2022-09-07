import { useAction } from '../lib/actions'
import { useView, useReloadView } from '../lib/views'

export function useDidDocument(did){
  const { view: identifier, ...state } = useView(`dids.${did}`)
  return [identifier, state]
}
