import React, { lazy, Suspense } from 'react'
import Loading from '../loading'

const ObjectDetector = lazy(() => import('../component/trainingPage/objectDetector'))

const DetectingPage = () => {
  return (
    <Suspense fallback={<Loading />}>
        <div
            style={{
                width: '100%',
                height: '100%',
                backgroundColor: '#1c2127',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff'
            }}
        >
            <ObjectDetector />
        </div>
    </Suspense>
  )
}

export default DetectingPage
