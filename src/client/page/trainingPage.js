import React, { lazy, Suspense } from 'react'
import Loading from '../loading'

const AIServer = lazy(() => import('../component/trainingPage/AIServer'))

const TrainingPage = () => {
  return (
    <Suspense fallback={<Loading />}>
      <div
        style={{
          width: '100%',
          height: '100%',
          backgroundColor: '#1c2127',
          display: 'flex',
          flexDirection: 'column',
          // alignItems: 'center',
          // justifyContent: 'center',
          color: '#fff'
        }}
      >
        <AIServer />
      </div>
    </Suspense>
  )
}

export default TrainingPage