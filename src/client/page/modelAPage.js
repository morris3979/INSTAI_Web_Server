import React, { lazy, Suspense } from 'react'
import { Spin } from 'antd'

const ModelATable = lazy(() => import('../component/reportPage/modelATable'))

const ModelAPage = () => {
  return (
    <Suspense fallback={<Spin size='large' />}>
      <ModelATable />
    </Suspense>
  )
}

export default ModelAPage