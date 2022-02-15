import React, { lazy, Suspense } from 'react'
import { Spin } from 'antd'

const ModelBTable = lazy(() => import('../component/reportPage/modelBTable'))

const ModelBPage = () => {
  return (
    <Suspense fallback={<Spin size='large' />}>
      <ModelBTable />
    </Suspense>
  )
}

export default ModelBPage