import React, { lazy, Suspense } from 'react'
import { Spin } from 'antd'

const LoginForm = lazy(() => import('../component/loginPage/loginform'))

const LoginPage = () => {
  return (
    <Suspense fallback={<Spin size='large' />}>
      <LoginForm />
    </Suspense>
  )
}

export default LoginPage