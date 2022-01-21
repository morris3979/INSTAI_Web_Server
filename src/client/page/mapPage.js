import React, { lazy, Suspense } from 'react'
import { Row, Col, Spin } from 'antd'

const Map = lazy(() => import('../component/mapPage/map'))
const MapLegend = lazy(() => import('../component/mapPage/mapLegend'))

const MapPage = () => {
  return (
    <Row>
      <Suspense fallback={<Spin size='large' />}>
        <Col xs={24} sm={24} xl={8}>
          <MapLegend />
        </Col>
        <Col xs={24} sm={24} xl={16}>
          <Map />
        </Col>
      </Suspense>
    </Row>
  )
}

export default MapPage