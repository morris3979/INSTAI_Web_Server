import React, { lazy, Suspense } from 'react'
import { Row, Col } from 'antd'
import Loading from '../loading'

const Map = lazy(() => import('../component/mapPage/map'))
const MapLegend = lazy(() => import('../component/mapPage/mapLegend'))

const MapPage = () => {
  return (
    <Row>
      <Suspense fallback={<Loading />}>
        <Col xs={24} sm={24} md={8}>
          <MapLegend />
        </Col>
        <Col xs={24} sm={24} md={16}>
          <Map />
        </Col>
      </Suspense>
    </Row>
  )
}

export default MapPage