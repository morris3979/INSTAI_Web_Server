import React, { lazy, Suspense } from 'react'
import { connect } from 'react-redux'
import { Row, Col } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'

const MainMap = lazy(() => import('../component/mainPage/mainMap'))

const MainPage = () => {
  return (
    <Row>
      <Suspense
        fallback={
          <div style={{ textAlign: 'center', fontSize: 100 }}>
            <LoadingOutlined />
          </div>
        }
      >
        <Col span={24}>
          <MainMap />
        </Col>
      </Suspense>
    </Row>
  )
}

export default connect(null, null)(MainPage)