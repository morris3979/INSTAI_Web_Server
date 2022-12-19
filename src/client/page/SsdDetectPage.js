import React, { lazy, Suspense } from 'react'
import Loading from '../loading'

const SsdDetect = lazy(() => import('../component/tensorflowPage/tfSsdPage/SsdDetect'))

const SsdDetectPage = () => {
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
        <SsdDetect />
      </div>
    </Suspense>
  )
}

export default SsdDetectPage