import { Routes as _Routes, Route } from 'react-router-dom'

import { useCurrentUser } from './resources/session'

import AuthPage from './pages/AuthPage'
import HomePage from './pages/HomePage'
import Layout from './Layout'
// import SignupPage from './pages/SignupPage'
// import LoginPage from './pages/LoginPage'
import LogoutPage from './pages/LogoutPage'
import ProfilesPage from './pages/ProfilesPage'
import IdentifiersPage from './pages/IdentifiersPage'
import ContractsPage from './pages/ContractsPage'
import SisasPage from './pages/SisasPage'

export default function Routes() {
  const { currentUser } = useCurrentUser()
  if (!currentUser) return <AuthPage />
  return <Layout>
    <_Routes>
      <Route path="/" element={<HomePage />} />
      {/* <Route path="/signup" element={<SignupPage />} /> */}
      {/* <Route path="/login" element={<LoginPage />} /> */}
      <Route path="/logout" element={<LogoutPage />} />
      <Route path="/profiles/*" element={<ProfilesPage />} />
      <Route path="/identifiers/*" element={<IdentifiersPage />} />
      <Route path="/contracts/*" element={<ContractsPage />} />
      <Route path="/sisas/*" element={<SisasPage />} />
    </_Routes>
  </Layout>
}
