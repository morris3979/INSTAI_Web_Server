import React, { lazy, Suspense } from 'react'
import { Spin } from 'antd'

const MaintainBoardCard = lazy(() => import('../component/maintainPage/maintainBoardCard'))

const MaintainPage = () => {
  return (
    <Suspense
      fallback={
        <div style={{ textaligh: 'center', lineheight: '100vh' }}>
          <Spin size='large' />
        </div>
      }
    >
      <MaintainBoardCard />
    </Suspense>
  )
}

export default MaintainPage