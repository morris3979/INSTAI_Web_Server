import React, { lazy, Suspense } from 'react'
import Loading from '../loading'

const ModelATable = lazy(() => import('../component/reportPage/modelATable'))

const ModelAPage = () => {
  return (
    <Suspense fallback={<Loading />}>
      <ModelATable />
    </Suspense>
  )
}

export default ModelAPage