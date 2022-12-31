import React, { lazy, Suspense } from 'react'
import { Row, Col, Layout } from 'antd'
import Loading from '../loading'

const { Header, Footer, Content } = Layout;

const RegisterForm = lazy(() => import('../component/accountPage/registerForm'))

const RegisterPage = () => {
  return (
    <Layout>
      <Header style={{ backgroundColor: '#ffffff' }} />
      <Content style={{ height: '1000px', backgroundColor: '#ffffff' }}>
        {/* <div style={{ backgroundColor: '#1c2127' }}> */}
          <Row style={{ padding: '20px' }}>
            <Suspense fallback={<Loading />}>
              <Col span={4} offset={10}>
                <RegisterForm />
              </Col>
            </Suspense>
          </Row>
        {/* </div> */}
      </Content>
    </Layout>
  )
}

export default RegisterPage