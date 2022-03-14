import React, { lazy, Suspense } from 'react'
import { connect } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { Row, Col } from 'antd'
import Loading from '../loading'

const LoginForm = lazy(() => import('../component/loginPage/loginForm'))
const RegisterForm = lazy(() => import('../component/loginPage/registerForm'))

const LoginPage = (props) => {
  const { loginInformation } = props

  if (loginInformation.administrator == false) {
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
  } else {
    return (
      <Navigate to='/' />
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