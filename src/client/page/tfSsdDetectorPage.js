import React, { lazy, Suspense } from 'react'
import Loading from '../loading'

const TFSsdDetector = lazy(() => import('../component/trainingPage/tfSsdDetector'))

const TFSsdDetectorPage = () => {
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
        <TFSsdDetector />
      </div>
    </Suspense>
  )
}

export default TFSsdDetectorPage
