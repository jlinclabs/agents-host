import { useAction } from '../lib/actions'
import { useView } from '../lib/views'

export function useOfferAgreement(callbacks){
  return useAction('agreements.offer', callbacks)
}

export function useAgreement(id){
  const { view: agreement, ...state } = useView(`agreements.${id}`)
  return [agreement, state]
}

export function useMyAgreements(){
  const { view: myAgreements, ...state } = useView(`agreements.mine`)
  return [myAgreements, state]
}

export function useSignAgreement(callbacks){
  return useAction('agreements.sign', callbacks)
}

export function useAckAgreementSignature(callbacks){
  return useAction('agreements.ackSignature', callbacks)
}
