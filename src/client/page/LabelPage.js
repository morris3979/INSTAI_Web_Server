import React, { lazy, Suspense } from 'react'
import Loading from '../loading'
import { Helmet } from "react-helmet"

// const ResponsiveAppBar = lazy(() => import('../component/HomePage/ResponsiveAppBar'))
const ResponsiveDrawer = lazy(() => import('../component/LabelPage/ResponsiveDrawer'))

const LabelPage = () => {
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
          <title>Label - InstAI</title>
        </Helmet>
        <h1>Hi, This is Label Page.</h1>
        <ResponsiveDrawer />
        {/* <ActionAreaCard /> */}
      </div>
    </Suspense>
  )
}

export default LabelPage