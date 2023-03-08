import { createElement as h, useCallback } from 'react'
import Button from '@mui/material/Button'
import { useLogout } from '../hooks/auth'

export default function LogoutButton({
  component = Button,
  children,
  ...props
}){
  const logout = useLogout()
  const onClick = useCallback(
    () => { logout.call() },
    [logout.call]
  )
  return h(
    component,
    { ...props, onClick },
    children || 'logout'
  )
}
