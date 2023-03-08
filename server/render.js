import { ExpectedError } from './errors.js'

export function renderErrorAsJSON(res, error){
  if (!res.headersSent) res.status(error instanceof ExpectedError ? 400 : 500)
  res.json({
    error: errorToJson(error),
  })
}

export const errorToJson = error => ({
  message: error.message,
  stack: error.stack,
})

export function renderUnauthorized(res){
  res.status(401).end()
}
