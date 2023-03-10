import Layout from '~/Layout'
import { useCurrentUser } from '~/hooks/auth'
import LoggedIn from './LoggedIn'
import LoggedOut from './LoggedOut'

export default function Page(){
  // const { currentUser } = useCurrentUser()
  // return currentUser ? <LoggedIn/> : <LoggedOut/>
  return <div>homepage</div>
}
