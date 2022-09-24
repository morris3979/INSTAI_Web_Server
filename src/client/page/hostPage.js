import React, { lazy, Suspense } from 'react'
import Loading from '../loading'

const HostTable = lazy(() => import('../component/hostPage/hostTable'))

const HostPage = () => {
  return (
    <Suspense fallback={<Loading />}>
      <HostTable />
    </Suspense>
  )
}

export default HostPage