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

export function _useToggle(isOn, _setValue){
  const setOn = useCallback(isOn => { _setValue(!!isOn) }, [_setValue])
  const turnOn = useCallback(() => { setOn(true) }, [setOn])
  const turnOff = useCallback(() => { setOn() }, [setOn])
  const toggle = useCallback(() => { setOn(!toggle.isOn) }, [setOn])
  toggle.isOn = isOn
  return [isOn, turnOn, turnOff, toggle, setOn]
}

export function useToggle(initialValue = false){
  return _useToggle(...useState(initialValue))
}
