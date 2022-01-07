import React, { lazy, Suspense } from 'react'
import { LoadingOutlined } from '@ant-design/icons'

const MaintainBoardCard = lazy(() => import('../component/maintainPage/maintainBoardCard'))

const MaintainPage = () => {
  return (
    <Suspense
      fallback={
        <div style={{ textAlign: 'center', fontSize: 100 }}>
          <LoadingOutlined />
        </div>
      }
    >
      <MaintainBoardCard />
    </Suspense>
  )
}

export default MaintainPage