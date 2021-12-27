import React from 'react'
import { connect } from 'react-redux'
import { Col, Row } from 'antd'
import MaintainModelCard from '../component/maintainPage/maintainModelCard'
import MaintainModal from '../component/maintainPage/maintainModal'
import MaintainCarCard from '../component/maintainPage/maintainCarCard'

const MaintainPage = () => {
  return (
    <Row>
      <Col xs={24} sm={24} xl={8}>
        <MaintainCarCard />
      </Col>
      <Col xs={24} sm={24} xl={16}>
        <MaintainModelCard />
        <MaintainModal />
      </Col>
    </Row>
  )
}

export default connect(null, null)(MaintainPage)