import { useState, useCallback } from 'react'

export function _useToggle(isOn, _setValue){
  const setOn = useCallback(isOn => { _setValue(!!isOn) }, [_setValue])
  const turnOn = useCallback(() => { setOn(true) }, [setOn])
  const turnOff = useCallback(() => { setOn() }, [setOn])
  const toggle = useCallback(() => { setOn(!toggle.isOn) }, [setOn])
  toggle.isOn = isOn
  return [isOn, turnOn, turnOff, toggle, setOn]
}

export default function useToggle(initialValue = false){
  return _useToggle(...useState(initialValue))
}
