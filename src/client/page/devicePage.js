import React, { lazy, Suspense } from 'react'
import Loading from '../loading'

const DeviceTable = lazy(() => import('../component/devicePage/deviceTable'))

const DevicePage = () => {
  return (
    <Suspense fallback={<Loading />}>
      <DeviceTable />
    </Suspense>
  )
}

export default DevicePage