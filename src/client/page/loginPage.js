import React, { lazy, Suspense } from 'react'
import Loading from '../loading'
import { Helmet } from "react-helmet"

const LoginForm = lazy(() => import('../component/loginPage/loginForm'))

const loginPage = () => {
  return (
    <Suspense fallback={<Loading />}>
      <div
        style={{
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#1c2127',
        }}
      >
        <Helmet>
          <title>Sign in - InstAI</title>
        </Helmet>
        <LoginForm />
      </div>
    </Suspense>
  )
}

export default loginPage