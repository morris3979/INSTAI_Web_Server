import React, { lazy, Suspense } from 'react'
import { connect } from 'react-redux'
import { LoadingOutlined } from '@ant-design/icons'

const MaintainCarCard = lazy(() => import('../component/maintainPage/maintainCarCard'))

const MaintainPage = () => {
  return (
    <Suspense
      fallback={
        <div style={{ textAlign: 'center', fontSize: 100 }}>
          <LoadingOutlined />
        </div>
      }
    >
      <MaintainCarCard />
    </Suspense>
  )
}

export default connect(null, null)(MaintainPage)