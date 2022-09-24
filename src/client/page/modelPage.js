import React, { lazy, Suspense } from 'react'
import Loading from '../loading'

const ModelTable = lazy(() => import('../component/modelPage/modelTable'))

const ModelPage = () => {
  return (
    <Suspense fallback={<Loading />}>
      <ModelTable />
    </Suspense>
  )
}

export default ModelPage