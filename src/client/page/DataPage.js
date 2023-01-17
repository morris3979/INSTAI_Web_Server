import React, { lazy, Suspense } from 'react'
import Loading from '../loading'
import { Helmet } from "react-helmet"
import Grid from '@mui/material/Grid';

const ResponsiveAppBar = lazy(() => import('../component/DataPage/ResponsiveAppBar'))
const ProjectAppBar = lazy(() => import('../component/DataPage/ProjectAppBar'))
const ClippedDrawer = lazy(() => import('../component/DataPage/ClippedDrawer'))
const DataStore = lazy(() => import('../component/DataPage/DataStore'))

const HomePage = () => {
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
        <DataStore />
      </div>
    </Suspense>
  )
}

export default HomePage