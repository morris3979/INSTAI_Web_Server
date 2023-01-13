import React, { lazy, Suspense } from 'react'
import Loading from '../loading'
import { Helmet } from "react-helmet"

const ResponsiveAppBar = lazy(() => import('../component/homePage/ResponsiveAppBar'))
const ActionAreaCard = lazy(() => import('../component/homePage/ActionAreaCard'))

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
          <title>Home - InstAI</title>
        </Helmet>
        <ResponsiveAppBar />
        <ActionAreaCard />
      </div>
    </Suspense>
  )
}

export default HomePage