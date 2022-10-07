import { useOktaAuth } from '@okta/okta-react'
import { Outlet } from 'react-router'


export default () => {
  const  { oktaAuth, authState } = useOktaAuth()

  const login = async () => oktaAuth.signInWithRedirect()
  const logout = async () => oktaAuth.signOut()

  if (!authState)
    return (<div>loading...</div>)


  if (!authState.isAuthenticated)
    return (
      <div>
        <p>you must login!</p>
        <button onClick={login}>Login</button>
      </div>
    )

  return (<Outlet />)
}