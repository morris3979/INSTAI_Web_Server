import React, { lazy, Suspense } from 'react'
import { Spin } from 'antd'

const StatusTable = lazy(() => import('../component/reportPage/statusTable'))

const StatusPage = () => {
  return (
    <Suspense fallback={<Spin size='large' />}>
      <StatusTable />
    </Suspense>
  )
}

export default StatusPage