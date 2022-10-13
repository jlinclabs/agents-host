import * as React from 'react'
import { Routes as _Routes, Route } from 'react-router-dom'
import CircularProgress from '@mui/material/CircularProgress'
import { useCurrentUser } from 'app-shared/client/hooks/auth'
import AppError from 'app-shared/client/components/AppError'
import AuthPage from 'app-shared/client/pages/AuthPage'
import DebugPage from 'app-shared/client/pages/DebugPage'
import RedirectPage from 'app-shared/client/pages/RedirectPage'
import NotFoundPage from 'app-shared/client/pages/NotFoundPage'

// import HomePage from './pages/HomePage'
import Layout from './Layout'
// import SignupPage from './pages/SignupPage'
// import LoginPage from './pages/LoginPage'
import LogoutPage from './pages/LogoutPage'
import SettingsPage from './pages/SettingsPage'
import VaultPage from './pages/VaultPage'
import DidsPage from './pages/DidsPage'
import IDPage from './pages/IDPage'
import ContactsPage from './pages/ContactsPage'
import AgreementsPage from './pages/AgreementsPage'
import DataSharingPage from './pages/DataSharingPage'
import DevCeramicPage from './pages/DevCeramicPage'
// import ProfilesPage from './pages/ProfilesPage'
// import IdentifiersPage from './pages/IdentifiersPage'
// import ContractsPage from './pages/ContractsPage'

export default function Routes() {
  const { currentUser, loading, error } = useCurrentUser()
  const props = { currentUser }
  return <Layout {...{ currentUser }}>
     <_Routes>
       <Route path="/debug/*" element={<DebugPage {...{...props, appName: 'Agents'}}/>}/>
     </_Routes>
  </Layout>
  // if (loading) return <CircularProgress/>
  // if (error) return <AppError {...{error}}/>
  // if (!currentUser) return <AuthPage {...{loading, error}} />
  // const props = { currentUser }
  // return <Layout {...{ currentUser }}>
  //   <_Routes>
  //     <Route path="/debug/*" element={<DebugPage {...{...props, appName: 'Agents'}}/>}/>
  //     <Route path="*" element={<AuthPage {...props}/>} />
  //     {/*{currentUser && <>*/}
  //     {/*  <Route path="/" element={<RedirectPage to="/id" />} />*/}
  //     {/*  <Route path="/login/*" element={<RedirectPage to="/"/>} />*/}
  //     {/*  <Route path="/forgot-password/*" element={<RedirectPage to="/"/>} />*/}
  //     {/*  <Route path="/signup/*" element={<RedirectPage to="/"/>} />*/}
  //     {/*  <Route path="/logout" element={<LogoutPage {...props} />} />*/}
  //     {/*  <Route path="/settings" element={<SettingsPage {...props} />} />*/}
  //     {/*  <Route path="/vault" element={<VaultPage {...props} />} />*/}
  //     {/*  <Route path="/dids/*" element={<DidsPage {...props} />} />*/}
  //     {/*  <Route path="/id" element={<IDPage {...props} />} />*/}
  //     {/*  <Route path="/contacts/*" element={<ContactsPage {...props} />} />*/}
  //     {/*  <Route path="/agreements/*" element={<AgreementsPage {...props} />} />*/}
  //     {/*  <Route path="/data-sharing/*" element={<DataSharingPage {...props} />} />*/}
  //     {/*  <Route path="/dev/ceramic/*" element={<DevCeramicPage {...props} />} />*/}
  //     {/*  /!* <Route path="/profiles/*" element={<ProfilesPage {...props} />} />*/}
  //     {/*  <Route path="/identifiers/*" element={<IdentifiersPage {...props} />} />*/}
  //     {/*  <Route path="/contracts/*" element={<ContractsPage {...props} />} /> *!/*/}
  //     {/*</>}*/}
  //     <Route path="*" element={<NotFoundPage {...props} />} />
  //   </_Routes>
  // </Layout>
}
