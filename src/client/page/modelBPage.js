import React, { lazy, Suspense } from 'react'
import Loading from '../loading'

const ModelBTable = lazy(() => import('../component/reportPage/modelBTable'))

const ModelBPage = () => {
  return (
    <Suspense fallback={<Loading />}>
      <ModelBTable />
    </Suspense>
  )
}

export default ModelBPage