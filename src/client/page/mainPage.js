import React, { lazy, Suspense } from 'react'
import { Row, Col, Spin } from 'antd'

const MainMap = lazy(() => import('../component/mainPage/mainMap'))
const MainMapLegend = lazy(() => import('../component/mainPage/mainMapLegend'))

const MainPage = () => {
  return (
    <Row>
      <Suspense fallback={<Spin size='large' />}>
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