import React, { lazy, Suspense } from 'react'
import Loading from '../loading'

const ModelCTable = lazy(() => import('../component/reportPage/modelCTable'))

const ModelCPage = () => {
  return (
    <Suspense fallback={<Loading />}>
      <ModelCTable />
    </Suspense>
  )
}

export default ModelCPage