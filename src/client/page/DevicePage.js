import React, { lazy, Suspense } from 'react'
import Loading from '../loading'
import { Helmet } from "react-helmet"

const ResponsiveAppBar = lazy(() => import('../component/ProjectPage/responsiveAppBar'))
const ProjectAppBar = lazy(() => import('../component/ProjectPage/projectAppBar'))
const ClippedDrawer = lazy(() => import('../component/ProjectPage/clippedDrawer'))
const DeviceTable = lazy(() => import('../component/ProjectPage/deviceTable'))

const devicePage = () => {
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
          <title>Device - InstAI</title>
        </Helmet>
        <ResponsiveAppBar />
        <ProjectAppBar />
        <ClippedDrawer />
        <DeviceTable />
      </div>
    </Suspense>
  )
}

export default devicePage