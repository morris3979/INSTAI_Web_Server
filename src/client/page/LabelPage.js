import React, { lazy, Suspense } from 'react'
import Loading from '../loading'
import { Helmet } from "react-helmet"

const ResponsiveDrawer = lazy(() => import('../component/LabelPage/ResponsiveDrawer'))
const LabelStudio = lazy(() => import('../component/LabelPage/LabelStudio'))

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
        <ResponsiveDrawer />
        <div style={{ marginTop: '80px', marginLeft: '240px' }}>
          <LabelStudio />
        </div>
      </div>
    </Suspense>
  )
}

export default LabelPage