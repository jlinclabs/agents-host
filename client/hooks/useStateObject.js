import { useState, useCallback } from 'react'

export default function useStateObject(init){
  let [value, setValue] = useState({...init})
  const patchValue = useCallback(
    (patch, replace = false) => {
      setValue(_value => {
        if (typeof patch === 'function') patch = setValue(patch)
        let newValue
        if (typeof patch === 'undefined') {
          newValue = { ...init }
        } else if (typeof patch === 'function') {
          newValue = { ...value }
          newValue = patch(newValue) || newValue // too magic?
        } else {
          newValue = replace ? patch : { ..._value, ...patch }
        }
        if (typeof newValue !== 'object') newValue = {}
        return newValue
      })
    },
    [setValue]
  )
  return [value, patchValue]
}
