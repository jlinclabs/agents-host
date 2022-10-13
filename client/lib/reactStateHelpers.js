import { useState, useCallback } from 'react'

export function useStateObject(init){
  let [value, setValue] = useState({...init})
  const patchValue = useCallback(
    (patch, replace = false) => {
      let newValue
      if (typeof patch === 'undefined') {
        newValue = {...init}
      }else if (typeof patch === 'function') {
        newValue = {...value}
        newValue = patch(newValue) || newValue // too magic?
      }else{
        newValue = replace ? patch : {...value, ...patch}
      }
      if (typeof newValue !== 'object') newValue = {}
      setValue(value = newValue)
    },
    [setValue]
  )
  return [value, patchValue]
}
