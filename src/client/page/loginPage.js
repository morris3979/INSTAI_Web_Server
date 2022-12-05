import React, { lazy, Suspense } from 'react'
import { Row, Col, Layout } from 'antd'
import Loading from '../loading'

const { Header, Footer, Content } = Layout;

const LoginForm = lazy(() => import('../component/loginPage/loginForm'))
//const RegisterForm = lazy(() => import('../component/loginPage/registerForm'))

const LoginPage = () => {
  return (
    <Layout>
      <Header />
      <Content style={{ height: '1000px' }}>
        <Row style={{ padding: '100px' }}>
          <Suspense fallback={<Loading />}>
            <Col span={4} offset={10}>
              <LoginForm />
            </Col>
          </Suspense>
        </Row>
      </Content>
    </Layout>
  )
}

export default LoginPage