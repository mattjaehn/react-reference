import React from 'react';
import { useState, useRef, useEffect } from 'react'
import { Routes, Route, RouteLink, useNavigate, useSearchParams } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import { Nav, ErrorBuddy, Patients, NotFounder } from './components';
import { Main, PatientsPage } from './pages';


import { Security, LoginCallback, ImplicitCallback } from '@okta/okta-react'
import { OktaAuth, toRelativeUrl } from '@okta/okta-auth-js'
import { oktaAuthConfig } from './config'

import { AuthedRoute } from './components/SecureRoute'
import Loading from './components/Loading';

const oktaAuth = new OktaAuth(oktaAuthConfig)

const App = () => {

  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isLoggingIn, setIsLoggingIn] = useState(false)
  const [errMsg, setErrMsg] = useState(null)
  const pendingLogin = useRef(false)

  const navigate = useNavigate()
  const triggerLogin = async () => { await oktaAuth.signInWithRedirect() }
  const restoreOriginalUri = (_oktaAuth, originalUri) => {
    navigate(toRelativeUrl(originalUri || '/', window.location.origin))
  }

  const handleAuthRequired = async () => {
    if (pendingLogin.current || oktaAuth.authStateManager.getAuthState().isAuthenticated)
      return
    
    pendingLogin.current = true
    setIsLoggingIn(true)
    try {
      await triggerLogin()
      setIsLoggedIn(true)
    }
    catch (err) {
      setErrMsg(JSON.stringify(err))
      setIsLoggedIn(false)
    }
    finally { pendingLogin.current = false }
  }

  const customAuthHandler = async () => {
    const previousAuthState = oktaAuth.authStateManager.getPreviousAuthState()
    if (isLoggingIn) return
    if (!previousAuthState || !previousAuthState.isAuthenticated) {
      setIsLoggingIn(true)
      try {
        await triggerLogin()
        setIsLoggedIn(true)
      }
      catch (err) {
        setErrMsg(JSON.stringify(err))
        setIsLoggedIn(false)
      }
      finally { setIsLoggingIn(false) }

    }
    else
      setIsLoggedIn(false)
  }

  const SecretPage = () => (
    <div>
      <h2>shh im a secret!</h2>
    </div>
  )

  const LoginKallback = () => {

    const [errMsg, setErrMsg] = useState(null)
    const [toke, setToke] = useState({toke: "maybe in a minute."})
    const navigate = useNavigate()


    useEffect(() => {
      (async () => {

        setToke(window.location.search)
        const url = new URL(window.location.href)
        const txt = JSON.stringify({
          qry: toke,
          url: url,
        })
        setToke(txt)
        

        if (!oktaAuth.isLoginRedirect()) {
          setErrMsg('LoginKallback but !isLoginRedirect')
          return
        }

        try { await oktaAuth.handleLoginRedirect() }
        catch (err) { setErrMsg(`{"hLRErr": ${JSON.stringify(err)} }`) }

        //setToke(oktaAuth.getAccessToken())
        setToke(oktaAuth.token.getUserInfo())

    
        navigate("/patients")
      })()
    }, [navigate, toke])



    return (
      <>
      { !!errMsg && <h4>{errMsg}</h4> }
      <div>
        <h2>{JSON.stringify(toke)}</h2>
        <h3>GOT CALLED BACK YAYY</h3>
      </div>
      </>
    )
  }


  return  (

    <Security
        oktaAuth={oktaAuth}
        restoreOriginalUri={() => {}}
        onAuthRequired={handleAuthRequired} >
      <>
        <Nav />
        { !!errMsg && <h2>{errMsg}</h2> }
        { !isLoggedIn && <button onClick={() => triggerLogin}>Login</button> }
        <Routes>
          <Route path="/login-callback" element={<LoginKallback />} />
          <Route path="/" element={<Main />} />
          <Route path="/patients" element={<PatientsPage />} />
          <Route path="/secure" element={<AuthedRoute />}>
            <Route path="secret" element={<SecretPage />} />
          </Route>
        </Routes>
      </>
    </Security>
  );
}

export default App;
