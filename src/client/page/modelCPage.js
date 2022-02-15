import React, { lazy, Suspense } from 'react'
import { Spin } from 'antd'

const ModelCTable = lazy(() => import('../component/reportPage/modelCTable'))

const ModelCPage = () => {
  return (
    <Suspense fallback={<Spin size='large' />}>
      <ModelCTable />
    </Suspense>
  )
}

export default ModelCPage