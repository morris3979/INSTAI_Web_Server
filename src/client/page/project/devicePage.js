import React, { lazy, Suspense } from 'react'
import Loading from '../../loading'
import { Helmet } from "react-helmet"

const ResponsiveAppBar = lazy(() => import('../../component/projectPage/ResponsiveAppBar'))
const ProjectAppBar = lazy(() => import('../../component/projectPage/ProjectAppBar'))
const ClippedDrawer = lazy(() => import('../../component/projectPage/ClippedDrawer'))
const DeviceTable = lazy(() => import('../../component/projectPage/DeviceTable'))

const ProjectDevicePage = () => {
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

export default ProjectDevicePage