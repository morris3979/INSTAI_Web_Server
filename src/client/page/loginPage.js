import React, { lazy, Suspense } from 'react'
import { Row, Col } from 'antd'
import Loading from '../loading'

const LoginForm = lazy(() => import('../component/loginPage/loginForm'))
//const RegisterForm = lazy(() => import('../component/loginPage/registerForm'))

const LoginPage = () => {
  return (
    <Row>
      <Suspense fallback={<Loading />}>
        <Col span={4} offset={10}>
          <LoginForm />
        </Col>
      </Suspense>
    </Row>
  )
}

export default LoginPage