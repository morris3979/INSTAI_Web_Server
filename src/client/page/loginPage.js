import React, { lazy, Suspense } from 'react'
import Loading from '../loading'

const LoginForm = lazy(() => import('../component/loginPage/loginForm'))

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
        <LoginForm />
      </div>
    </Suspense>
  )
}

export default LoginPage