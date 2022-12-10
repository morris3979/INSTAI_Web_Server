import React, { lazy, Suspense } from 'react'
import Loading from '../loading'

const Tensorflow = lazy(() => import('../component/trainingPage/Tensorflow'))

const TensorflowPage = () => {
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
        <Tensorflow />
      </div>
    </Suspense>
  )
}

export default TensorflowPage