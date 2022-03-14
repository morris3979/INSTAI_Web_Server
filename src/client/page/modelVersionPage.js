import React, { lazy, Suspense } from 'react'
import Loading from '../loading'

const ModelVersionTable = lazy(() => import('../component/modelVersionPage/modelVersionTable'))

const ModelVersionPage = () => {
  return (
    <Suspense fallback={<Loading />}>
      <ModelVersionTable />
    </Suspense>
  )
}

export default ModelVersionPage