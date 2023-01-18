import React, { lazy, Suspense } from 'react'
import Loading from '../loading'
import { Helmet } from "react-helmet"

const ResponsiveAppBar = lazy(() => import('../component/HomePage/ResponsiveAppBar'))

const InvitePeoplePage = () => {
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
          <title>Organization Management - InstAI</title>
        </Helmet>
        <ResponsiveAppBar />
      </div>
    </Suspense>
  )
}

export default InvitePeoplePage