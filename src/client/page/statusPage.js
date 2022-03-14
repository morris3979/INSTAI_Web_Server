import React, { lazy, Suspense } from 'react'
import Loading from '../loading'

const StatusTable = lazy(() => import('../component/reportPage/statusTable'))

const StatusPage = () => {
  return (
    <Suspense fallback={<Loading />}>
      <StatusTable />
    </Suspense>
  )
}

export default StatusPage