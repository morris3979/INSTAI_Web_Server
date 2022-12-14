import React, { lazy, Suspense } from 'react'
import Loading from '../loading'

const TFYolo = lazy(() => import('../component/tfYoloPage/index'))

const TFYoloPage = () => {
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
        <TFYolo />
      </div>
    </Suspense>
  )
}

export default TFYoloPage