import React, { lazy, Suspense } from 'react'
import Loading from '../../loading'
import { Helmet } from "react-helmet"

const ResponsiveAppBar = lazy(() => import('../../component/projectPage/ResponsiveAppBar'))
const ProjectAppBar = lazy(() => import('../../component/projectPage/ProjectAppBar'))
const ClippedDrawer = lazy(() => import('../../component/projectPage/ClippedDrawer'))
const ModelTable = lazy(() => import('../../component/projectPage/ModelTable'))

const ProjectModelPage = () => {
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
          <title>Model - InstAI</title>
        </Helmet>
        <ResponsiveAppBar />
        <ProjectAppBar />
        <ClippedDrawer />
        <ModelTable />
      </div>
    </Suspense>
  )
}

export default ProjectModelPage