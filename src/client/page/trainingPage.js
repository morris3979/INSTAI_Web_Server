import React, { lazy, Suspense } from 'react'
import Loading from '../loading'

const AIServer = lazy(() => import('../component/trainingPage/AIServer'))

const TrainingPage = () => {
  return (
    <Suspense fallback={<Loading />}>
      <AIServer />
    </Suspense>
  )
}

export default TrainingPage