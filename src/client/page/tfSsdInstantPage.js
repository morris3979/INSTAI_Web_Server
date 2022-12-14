import React, { lazy, Suspense } from 'react'
import Loading from '../loading'

const TFSsdInstant = lazy(() => import('../component/trainingPage/tfSsdInstant'))

const TFSsdInstantPage = () => {
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
        <TFSsdInstant />
      </div>
    </Suspense>
  )
}

export default TFSsdInstantPage