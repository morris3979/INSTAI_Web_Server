import React, { lazy, Suspense } from 'react'
import Loading from '../loading'
import { Helmet } from "react-helmet"

const ResponsiveAppBar = lazy(() => import('../component/DataPage/ResponsiveAppBar'))
const ProjectAppBar = lazy(() => import('../component/DataPage/ProjectAppBar'))
const ClippedDrawer = lazy(() => import('../component/DataPage/ClippedDrawer'))
const DeviceTable = lazy(() => import('../component/DataPage/DeviceTable'))

const DevicePage = () => {
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

export default DevicePage