import React, { lazy, Suspense } from 'react'
import { Spin } from 'antd'

const ModelVersionTable = lazy(() => import('../component/modelVersionPage/modelVersionTable'))

const ModelVersionPage = () => {
  return (
    <Suspense fallback={<Spin size='large' />}>
      <ModelVersionTable />
    </Suspense>
  )
}

export default ModelVersionPage