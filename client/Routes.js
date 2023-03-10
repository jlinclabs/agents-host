import * as React from 'react'
import { createBrowserRouter, RouterProvider, Navigate, useLocation } from 'react-router-dom'

import { getLoginUrl } from '~/lib/urls'
import { useCurrentUser } from '~/hooks/auth'
import AppError from '~/components/AppError'
import FullPageLoading from './components/FullPageLoading'

import routeFiles from '~/routes/**/{Error,NotFound,Layout,Page}.js'

const routes = []

const processRoutes = (files, subRoutes, paths) => {
  const fullPath = [...paths].reverse().join('/')
  const { Error, NotFound, Layout, Page, ...directories } = files
  let children = []
  if (Page) {
    let element = safeRender(Page, fullPath, 'Page.js')
    if (Page.routeOptions?.topLevel){
      routes.push({
        path: fullPath,
        element,
        errorElement: Error && safeRender(Error, fullPath, 'Layout.js'),
      })
    }else{
      children.push({ path: '', element })
    }
  }

  for (const name in directories)
    processRoutes(directories[name], children, [name, ...paths])

  if (NotFound) children.push({path: '*', element: <NotFound.default />})

  // TODO maybe support Layout.routeOptions.topLevel ?
  subRoutes.push({
    path: paths[0],
    element: Layout && safeRender(Layout, fullPath, 'Layout.js'),
    errorElement: Error && safeRender(Error, fullPath, 'Layout.js'),
    children,
  })
}

processRoutes(routeFiles, routes, [''])


export default function Routes() {
  const {currentUser, loading, error} = useCurrentUser()
  console.log('currentUser -> ', loading ? 'LOADING' : JSON.stringify(currentUser, null, 2))
  if (loading) return <FullPageLoading/>
  if (error) return <AppError {...{error}}/>
  const router = createBrowserRouter(routes)
  global.router = router
  return <RouterProvider {...{router}} />
}

function safeRender(mod, path, filename){
  if (!mod.default)
    return <div>Route Error: page has no default export! {path}/{filename}</div>
  return mod.routeOptions?.mustBeUser
    ? <MustBeUser><mod.default/></MustBeUser>
    : <mod.default/>
}


function MustBeUser({ children }){
  const { currentUser } = useCurrentUser()
  const location = useLocation()
  const loginUrl = getLoginUrl(location)
  return currentUser ? children : <Navigate to={loginUrl}/>
}
