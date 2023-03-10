import React from 'react'
import { useRouteError } from 'react-router-dom'
import AppError from './AppError'

export default function RouteError() {
  let error = useRouteError()
  React.useEffect(
    () => { console.error('RouterError', error) },
    [error]
  )
  return <AppError {...{error}}/>
}
