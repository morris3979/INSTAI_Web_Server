import React, { lazy, Suspense } from 'react'
import Loading from '../loading'
import { Helmet } from "react-helmet"

const RegisterForm = lazy(() => import('../component/registerPage/registerForm'))

const registerPage = () => {
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
          <title>Register - InstAI</title>
        </Helmet>
        <RegisterForm />
      </div>
    </Suspense>
  )
}

export default registerPage