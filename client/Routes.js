import * as React from 'react'
import { Routes as _Routes, Route } from 'react-router-dom'
import { useCurrentUser } from 'app-shared/client/hooks/auth'
import AppError from 'app-shared/client/components/AppError'
import AuthPage from 'app-shared/client/pages/AuthPage'
import DebugPage from 'app-shared/client/pages/DebugPage'
// import RedirectPage from 'app-shared/client/pages/RedirectPage'
import NotFoundPage from 'app-shared/client/pages/NotFoundPage'
import FullPageLoading from './components/FullPageLoading'

import Layout from './Layout'
import HomePage from './pages/HomePage'
import DashboardPage from './pages/DashboardPage'
import SettingsPage from './pages/SettingsPage'
import NotificationsPage from './pages/NotificationsPage'
import VaultPage from './pages/VaultPage'
import DidsPage from './pages/DidsPage'
import ProfilePage from './pages/ProfilePage'
// import IDPage from './pages/IDPage'
// import ContactsPage from './pages/ContactsPage'
// import AgreementsPage from './pages/AgreementsPage'
// import DataSharingPage from './pages/DataSharingPage'
// import DevCeramicPage from './pages/DevCeramicPage'
// import ProfilesPage from './pages/ProfilesPage'
// import IdentifiersPage from './pages/IdentifiersPage'
// import ContractsPage from './pages/ContractsPage'

export default function Routes() {
  const {currentUser, loading, error} = useCurrentUser()
  if (loading) return <FullPageLoading/>
  if (error) return <AppError {...{error}}/>
  if (currentUser) return <LoggedInRoutes {...{currentUser}}/>
  return <LoggedOutRoutes />
}

function LoggedOutRoutes() {
  return <_Routes>
    {defaultRoutes({})}
  </_Routes>
}

function LoggedInRoutes(props) {
  return <Layout {...props}>
    <_Routes>
      <Route path="/" element={<DashboardPage {...props} />} />
      {/*<Route path="/id" element={<IDPage {...props} />} />*/}
      <Route path="/profile" element={<ProfilePage {...props} />} />
      <Route path="/settings" element={<SettingsPage {...props} />} />
      <Route path="/notifications" element={<NotificationsPage {...props} />} />
      <Route path="/vault" element={<VaultPage {...props} />} />
      <Route path="/dids/*" element={<DidsPage {...props} />} />
      {/*<Route path="/contacts/*" element={<ContactsPage {...props} />} />*/}
      {/*<Route path="/agreements/*" element={<AgreementsPage {...props} />} />*/}
      {/*<Route path="/data-sharing/*" element={<DataSharingPage {...props} />} />*/}
      {/*<Route path="/dev/ceramic/*" element={<DevCeramicPage {...props} />} />*/}
      {/*<Route path="/profiles/*" element={<ProfilesPage {...props} />} />*/}
      {/*<Route path="/identifiers/*" element={<IdentifiersPage {...props} />} />*/}
      {/*<Route path="/contracts/*" element={<ContractsPage {...props} />} />*/}
      {defaultRoutes(props)}
    </_Routes>
  </Layout>
}

function defaultRoutes({ currentUser }) { // not a react component
  return <>
    {/*<Route path="*" element={<AuthPage {...props}/>} />*/}
    <Route path="/" element={<HomePage />} />
    {AuthPage.routes({ currentUser })}
    <Route path="/debug/*" element={<DebugPage appName="Agents"/>}/>}/>
    <Route path="*" element={<NotFoundPage/>}/>
  </>
}
  // if (loading) return <CircularProgress/>
  // if (error) return <AppError {...{error}}/>
  // if (!currentUser) return <AuthPage {...{loading, error}} />
  // const props = { currentUser }
  // return <Layout {...{ currentUser }}>
  //   <_Routes>
  //     <Route path="/debug/*" element={<DebugPage {...{...props, appName: 'Agents'}}/>}/>
  //     <Route path="*" element={<AuthPage {...props}/>} />
  //     {/*{currentUser && <>*/}

  //     {/*</>}*/}
  //     <Route path="*" element={<NotFoundPage {...props} />} />
  //   </_Routes>
  // </Layout>
// }
