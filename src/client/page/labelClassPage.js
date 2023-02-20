import React, { lazy, Suspense } from 'react'
import Loading from '../loading'
import { Helmet } from "react-helmet"
import Toolbar from '@mui/material/Toolbar';

const ResponsiveDrawer = lazy(() => import('../component/labelPage/responsiveDrawer'))
const LabelStudio = lazy(() => import('../component/labelPage/LabelStudio'))

const LabelClassPage = () => {
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
          <title>Label - InstAI</title>
        </Helmet>
        <ResponsiveDrawer />\
        <div style={{ position: 'absolute', left: 250, top: 80 }}>
          <LabelStudio />
        </div>
      </div>
    </Suspense>
  )
}

export default LabelClassPage