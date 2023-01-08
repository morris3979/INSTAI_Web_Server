import React, { lazy, Suspense } from 'react'
import Loading from '../loading'

const Login = lazy(() => import('../component/loginPage'))

const LoginPage = () => {
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
        <Login />
      </div>
    </Suspense>
  )
}

export default LoginPage