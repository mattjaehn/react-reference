
import { useOktaAuth } from '@okta/okta-react'
import { oktaAuthConfig } from '../config'
import { OktaAuth, toRelativeUrl } from '@okta/okta-auth-js'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'



const authClient = new OktaAuth(oktaAuthConfig)


export const Login = () => {

  const login = async () => {
    console.log('in login cb')

    try {
      await authClient.token.getWithRedirect()
    }
    catch (e) { console.log('error getting token: ' + e.message) }

    console.log('done with getTokenWithRedirect')
  }

  return (
    <button onClick={() => login()}>Login</button>
  )

}


export const LoginCallback = () => {

  const { navigate } = useNavigate()

  console.log('in LoginCallback')
  useEffect(async () => {


    try {
      const resp = await authClient.token.parseFromUrl()
      console.log(`callback resp - ${JSON.stringify(resp)}`)
      authClient.tokenManager.setTokens(resp.tokens)

    } catch (err) { console.log(`error getting tokens: ${JSON.stringify(err)}`) }

    navigate('/')
  }, [])
}