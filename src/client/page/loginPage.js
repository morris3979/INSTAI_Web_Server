import React, { lazy, Suspense } from 'react'
import { Spin } from 'antd'

const LoginForm = lazy(() => import('../component/loginPage/loginform'))

const LoginPage = () => {
  return (
    <Suspense
      fallback={
        <div style={{ textaligh: 'center', lineheight: '100vh' }}>
          <Spin size='large' />
        </div>
      }
    >
      <LoginForm />
    </Suspense>
  )
}

export default LoginPage