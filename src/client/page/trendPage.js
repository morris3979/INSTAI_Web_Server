import React, { lazy, Suspense } from 'react'
import Loading from '../loading'

const TrendChart = lazy(() => import('../component/trendPage/trendChart'))

const TrendPage = () => {
  return (
    <Suspense fallback={<Loading />}>
      <TrendChart />
    </Suspense>
  )
}

export default TrendPage