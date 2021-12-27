import React, { lazy, Suspense } from 'react'
import { connect } from 'react-redux'
import { Col, Row } from 'antd'

const MaintainCarCard = lazy(() => import('../component/maintainPage/maintainCarCard'))
const MaintainModal = lazy(() => import('../component/maintainPage/maintainModal'))
const MaintainModelCard = lazy(() => import('../component/maintainPage/maintainModelCard'))

const MaintainPage = () => {
  return (
    <Row>
      <Suspense>
        <Col xs={24} sm={24} xl={8}>
          <MaintainCarCard />
        </Col>
        <Col xs={24} sm={24} xl={16}>
          <MaintainModelCard />
          <MaintainModal />
        </Col>
      </Suspense>
    </Row>
  )
}

export default connect(null, null)(MaintainPage)