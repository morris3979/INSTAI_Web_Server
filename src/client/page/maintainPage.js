import React, { lazy, Suspense } from 'react'
import { Spin } from 'antd'

const MaintainBoardCard = lazy(() => import('../component/maintainPage/maintainBoardCard'))

const MaintainPage = () => {
  return (
    <Suspense fallback={<Spin size='large' />}>
      <MaintainBoardCard />
    </Suspense>
  )
}

export default MaintainPage