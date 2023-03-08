import { useState, useEffect } from 'react'
import useForceUpdate from './useForceUpdate.js'

export default function useCountdown(seconds){
  const forceUpdate = useForceUpdate()
  const [endTime] = useState(Date.now() + seconds)
  const secondsRemaining = Math.ceil((endTime - Date.now()) / 1000)
  useEffect(
    () => {
      const id = setInterval(
        () => {
          forceUpdate()
          if (Date.now() > endTime) { clearInterval(id) }
        },
        100
      )
      return () => clearInterval(id)
    },
    [endTime]
  )
  return secondsRemaining
}