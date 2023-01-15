import React, { lazy, Suspense } from 'react'
import Loading from '../loading'
import { Helmet } from "react-helmet"
import { CirclesWithBar } from 'react-loader-spinner'

const ResponsiveAppBar = lazy(() => import('../component/DataPage/ResponsiveAppBar'))
const ClippedDrawer = lazy(() => import('../component/DataPage/ClippedDrawer'))

const HomePage = () => {
  return (
    <Suspense fallback={<Loading />}>
      <div
        style={{
          minHeight: '100vh',
          height: 'auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          // justifyContent: 'center',
          backgroundColor: '#1c2127',
        }}
      >
        <Helmet>
          <title>Data - InstAI</title>
        </Helmet>
        <ResponsiveAppBar />
        <ClippedDrawer />
      </div>
    </Suspense>
  )
}

export default HomePage