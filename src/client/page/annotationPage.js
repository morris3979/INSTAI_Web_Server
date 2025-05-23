import React, { lazy, Suspense } from 'react'
import Loading from '../loading'
import { Helmet } from "react-helmet"
import Toolbar from '@mui/material/Toolbar';

const ResponsiveDrawer = lazy(() => import('../component/annotationPage/ResponsiveDrawer'))
const LabelStudioWrapper = lazy(() => import('../component/annotationPage/LabelStudio'))

const AnnotationPage = () => {
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
          position: 'relative',
          backgroundColor: '#1c2127',
        }}
      >
        <Helmet>
          <title>Annotation - InstAI</title>
        </Helmet>
        <ResponsiveDrawer />\
        <div style={{ position: 'absolute', left: 250, top: 80 }}>
          <LabelStudioWrapper />
        </div>
      </div>
    </Suspense>
  )
}

export default AnnotationPage