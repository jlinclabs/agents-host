
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAction } from '../lib/actions'
import { useView, useReloadView } from '../lib/views'

export function useVaultDump(){
  const { view: dump, ...state } = useView(`vault.dump`)
  return [dump, state]
}
