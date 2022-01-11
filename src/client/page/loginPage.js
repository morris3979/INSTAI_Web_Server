import React, { lazy, Suspense } from 'react'
import { LoadingOutlined } from '@ant-design/icons'

const LoginForm = lazy(() => import('../component/loginPage/loginform'))

const LoginPage = () => {
  return (
    <Suspense
      fallback={
        <LoadingOutlined
          style={{ textAlign: 'center', fontSize: 10 }}
        />
      }
    >
      <LoginForm />
    </Suspense>
  )
}

export default LoginPage