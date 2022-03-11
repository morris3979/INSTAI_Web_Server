import React, { lazy, Suspense } from 'react'
import { connect } from 'react-redux'
import { Spin, Row, Col } from 'antd'

const { Navigate } = lazy(() => import('react-router-dom'))
const LoginForm = lazy(() => import('../component/loginPage/loginForm'))
const RegisterForm = lazy(() => import('../component/loginPage/registerForm'))

const LoginPage = (props) => {
  const { loginInformation } = props

  if (loginInformation.administrator == false) {
    return (
      <Row justify='space-around'>
        <Suspense fallback={<Spin size='large' />}>
          <Col xs={24} sm={24} md={10}>
            <LoginForm />
          </Col>
          <Col xs={24} sm={24} md={10}>
            <RegisterForm />
          </Col>
        </Suspense>
      </Row>
    )
  } else {
    return (
      <Suspense fallback={<Spin size='large' />}>
        <Navigate to='/' />
      </Suspense>

    )
  }
}

const mapStateToProps = (state) => {
  //state指的是store裡的數據
  return {
    loginInformation: state.loginInformation
  }
}

export default connect(mapStateToProps)(LoginPage)