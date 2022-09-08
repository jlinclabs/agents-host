import { Routes as _Routes, Route } from 'react-router-dom'

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
  // useErrorBoundry
  const { currentAgent, loading, error } = useCurrentAgent()
  console.log('🔥Routes render', { currentAgent, loading, error })
  if (!currentAgent) return <AuthPage {...{loading, error}} />
  return <Layout>
    <_Routes>
      <Route path="/" element={<HomePage />} />
      {/* <Route path="/signup" element={<SignupPage />} /> */}
      {/* <Route path="/login" element={<LoginPage />} /> */}
      <Route path="/login/*" element={<RedirectPage to="/"/>} />
      <Route path="/forgot-password/*" element={<RedirectPage to="/"/>} />
      <Route path="/signup/*" element={<RedirectPage to="/"/>} />

      <Route path="/logout" element={<LogoutPage />} />
      <Route path="/settings" element={<SettingsPage />} />
      <Route path="/vault" element={<VaultPage />} />
      <Route path="/dids/*" element={<DidsPage />} />
      <Route path="/contacts/*" element={<ContactsPage />} />
      <Route path="/agreements/*" element={<AgreementsPage />} />
      <Route path="/data-sharing/*" element={<DataSharingPage />} />
      {/* <Route path="/profiles/*" element={<ProfilesPage />} />
      <Route path="/identifiers/*" element={<IdentifiersPage />} />
      <Route path="/contracts/*" element={<ContractsPage />} /> */}
      <Route path="*" element={<NotFoundPage />} />
    </_Routes>
  </Layout>
}
