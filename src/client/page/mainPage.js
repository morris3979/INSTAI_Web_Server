import React, { lazy, Suspense } from 'react'
import { Row, Col } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'

const MainMap = lazy(() => import('../component/mainPage/mainMap'))
const MainMapLegend = lazy(() => import('../component/mainPage/mainMapLegend'))

const MainPage = () => {
  return (
    <Row>
      <Suspense
        fallback={
          <LoadingOutlined
            style={{ textAlign: 'center', fontSize: 10 }}
          />
        }
      >
        <Col xs={24} sm={24} xl={8}>
          <MainMapLegend />
        </Col>
        <Col xs={24} sm={24} xl={16}>
          <MainMap />
        </Col>
      </Suspense>
    </Row>
  )
}

export default MainPage