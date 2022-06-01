import React, { lazy, Suspense } from 'react'
import { Row, Col } from 'antd'
import Loading from '../loading'

const LoginForm = lazy(() => import('../component/loginPage/loginForm'))
const RegisterForm = lazy(() => import('../component/loginPage/registerForm'))

const LoginPage = () => {
  return (
    <Row justify='space-around'>
      <Suspense fallback={<Loading />}>
        <Col xs={24} sm={24} md={10}>
          <LoginForm />
        </Col>
        <Col xs={24} sm={24} md={10}>
          <RegisterForm />
        </Col>
      </Suspense>
    </Row>
  )
}

export default LoginPage