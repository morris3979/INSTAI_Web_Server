import React, { lazy, Suspense } from 'react'
import Loading from '../../loading'
import { Helmet } from "react-helmet"

const ResponsiveAppBar = lazy(() => import('../../component/projectPage/ResponsiveAppBar'))
const ProjectAppBar = lazy(() => import('../../component/projectPage/ProjectAppBar'))
const ClippedDrawer = lazy(() => import('../../component/projectPage/ClippedDrawer'))
const ObjectDetection = lazy(() => import('../../component/projectPage/ObjectDetection'))

const ProjectDetectorPage = () => {
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
          position: 'relative'
        }}
      >
        <Helmet>
          <title>Detector - InstAI</title>
        </Helmet>
        <div style={{ position: 'absolute', zIndex: 3 }}>
          <ResponsiveAppBar />
        </div>
        <div style={{ position: 'absolute', zIndex: 1 }}>
          <ProjectAppBar />
        </div>
        <div style={{ position: 'absolute', zIndex: 2 }}>
          <ClippedDrawer />
        </div>
        <ObjectDetection />
      </div>
    </Suspense>
  )
}

export default ProjectDetectorPage