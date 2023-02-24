import React, { lazy, Suspense } from 'react'
import Loading from '../../loading'
import { Helmet } from "react-helmet"

const ResponsiveAppBar = lazy(() => import('../../component/projectPage/ResponsiveAppBar'))
const ProjectAppBar = lazy(() => import('../../component/projectPage/ProjectAppBar'))
const ClippedDrawer = lazy(() => import('../../component/projectPage/ClippedDrawer'))
const DataWarehouse = lazy(() => import('../../component/projectPage/DataWarehouse'))

const ProjectDataPage = () => {
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
        <ProjectAppBar />
        <ClippedDrawer />
        <DataWarehouse />
      </div>
    </Suspense>
  )
}

export default ProjectDataPage