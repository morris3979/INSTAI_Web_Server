import React, { lazy, Suspense } from 'react'
import { Row, Col, Layout } from 'antd'
import Loading from '../loading'

const { Header, Footer, Content } = Layout;

const LoginForm = lazy(() => import('../component/loginPage/loginForm'))
//const RegisterForm = lazy(() => import('../component/loginPage/registerForm'))

const LoginPage = () => {
  return (
    <Layout>
      <Header style={{ backgroundColor: '#ffffff' }} />
      <Content style={{ height: '1000px', backgroundColor: '#ffffff' }}>
        {/* <div style={{ backgroundColor: '#1c2127' }}> */}
          <Row style={{ padding: '20px' }}>
            <Suspense fallback={<Loading />}>
              <Col span={4} offset={10}>
                <LoginForm />
              </Col>
            </Suspense>
          </Row>
        {/* </div> */}
      </Content>
    </Layout>
  )
}

export default LoginPage