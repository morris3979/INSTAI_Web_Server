import React, { lazy, Suspense } from 'react'
import { Spin, Row, Col } from 'antd'

const LoginForm = lazy(() => import('../component/loginPage/loginForm'))
const RegisterForm = lazy(() => import('../component/loginPage/registerForm'))

const LoginPage = () => {
  return (
    <Row justify='space-around'>
      <Suspense fallback={<Spin size='large' />}>
        <Col xs={24} sm={24} xl={10}>
          <LoginForm />
        </Col>
        <Col xs={24} sm={24} xl={10}>
          <RegisterForm />
        </Col>
      </Suspense>
    </Row>
  )
}

export default LoginPage