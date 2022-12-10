import React, { lazy, Suspense } from 'react'
import Loading from '../loading'

const Tensorflow = lazy(() => import('../component/trainingPage/Tensorflow'))

const TensorflowPage = () => {
  return (
    <Suspense fallback={<Loading />}>
      <Tensorflow />
    </Suspense>
  )
}

export default TensorflowPage