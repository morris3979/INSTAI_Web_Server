import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { Col, Row } from 'antd'
import MaintainCard from '../component/maintainPage/maintainCard'
import MaintainModal from '../component/maintainPage/maintainModal'

const MaintainPage = () => {
  return (
    <Row>
      <Col>
        <MaintainCard />
      </Col>
      <Col>
        <MaintainModal />
      </Col>
    </Row>
  )
}

export default connect(null, null)(MaintainPage)