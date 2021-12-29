import React, { lazy, Suspense } from 'react'
import { connect } from 'react-redux'

const MaintainCarCard = lazy(() => import('../component/maintainPage/maintainCarCard'))

const MaintainPage = () => {
  return (
    <Suspense
      fallback={
        <div style={{ textAlign: 'center', fontSize: 100 }}>
          載入中...
        </div>
      }
    >
      <MaintainCarCard />
    </Suspense>
  )
}

export default connect(null, null)(MaintainPage)