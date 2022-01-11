import React, { lazy, Suspense } from 'react'
import { LoadingOutlined } from '@ant-design/icons'

const MaintainBoardCard = lazy(() => import('../component/maintainPage/maintainBoardCard'))

const MaintainPage = () => {
  return (
    <Suspense
      fallback={
        <LoadingOutlined
          style={{ textAlign: 'center', fontSize: 10 }}
        />
      }
    >
      <MaintainBoardCard />
    </Suspense>
  )
}

export default MaintainPage