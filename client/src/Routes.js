import { Routes as _Routes, Route } from 'react-router-dom'

import './lib/rpc'
import { useCurrentAgent } from './resources/session'

import AuthPage from './pages/AuthPage'
import HomePage from './pages/HomePage'
import Layout from './Layout'
import RedirectPage from './pages/RedirectPage'
import NotFoundPage from './pages/NotFoundPage'
// import SignupPage from './pages/SignupPage'
// import LoginPage from './pages/LoginPage'
import LogoutPage from './pages/LogoutPage'
import SettingsPage from './pages/SettingsPage'
import VaultPage from './pages/VaultPage'
import DidsPage from './pages/DidsPage'
import ContactsPage from './pages/ContactsPage'
import AgreementsPage from './pages/AgreementsPage'
import DataSharingPage from './pages/DataSharingPage'
// import ProfilesPage from './pages/ProfilesPage'
// import IdentifiersPage from './pages/IdentifiersPage'
// import ContractsPage from './pages/ContractsPage'

export default function Routes() {
  return <div>hello</div>
  // const { currentAgent, loading, error } = useCurrentAgent()
  // if (!currentAgent) return <AuthPage {...{loading, error}} />
  // const props = { currentAgent }
  // return <Layout {...{ currentAgent }}>
  //   <_Routes>
  //     <Route path="/" element={<HomePage />} />
  //     {/* <Route path="/signup" element={<SignupPage />} /> */}
  //     {/* <Route path="/login" element={<LoginPage />} /> */}
  //     <Route path="/login/*" element={<RedirectPage to="/"/>} />
  //     <Route path="/forgot-password/*" element={<RedirectPage to="/"/>} />
  //     <Route path="/signup/*" element={<RedirectPage to="/"/>} />

  //     <Route path="/logout" element={<LogoutPage {...props} />} />
  //     <Route path="/settings" element={<SettingsPage {...props} />} />
  //     <Route path="/vault" element={<VaultPage {...props} />} />
  //     <Route path="/dids/*" element={<DidsPage {...props} />} />
  //     <Route path="/contacts/*" element={<ContactsPage {...props} />} />
  //     <Route path="/agreements/*" element={<AgreementsPage {...props} />} />
  //     <Route path="/data-sharing/*" element={<DataSharingPage {...props} />} />
  //     {/* <Route path="/profiles/*" element={<ProfilesPage {...props} />} />
  //     <Route path="/identifiers/*" element={<IdentifiersPage {...props} />} />
  //     <Route path="/contracts/*" element={<ContractsPage {...props} />} /> */}
  //     <Route path="*" element={<NotFoundPage {...props} />} />
  //   </_Routes>
  // </Layout>
}
