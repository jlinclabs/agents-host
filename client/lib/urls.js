import { resolvePath } from 'react-router-dom'

export function normalizeHref(href){
  const aElement = document.createElement('a')
  aElement.href = href
  return aElement.href
}

export function parseURL(url){
  return new URL(normalizeHref(url))
}

export function urlToRelative(url){
  return `${url.pathname}${url.search}`
}

export function getLoginUrl(location){
  const returnTo = new URL(window.location)
  returnTo.pathname = location.pathname
  returnTo.search = location.search
  returnTo.hash = location.hash
  return '/signin?returnTo=' + encodeURIComponent(urlToRelative(returnTo))
}
