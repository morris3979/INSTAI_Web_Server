import React, { lazy, Suspense } from 'react'
import Loading from '../loading'
import { Helmet } from "react-helmet"

const Register = lazy(() => import('../component/registerPage/Register'))

const RegisterPage = () => {
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
        <Register />
      </div>
    </Suspense>
  )
}

export default RegisterPage