import React, { lazy, Suspense } from 'react'
import Loading from '../../loading'
import { Helmet } from "react-helmet"

const ResponsiveAppBar = lazy(() => import('../../component/homePage/ResponsiveAppBar'))
const UserInformation = lazy(() => import('../../component/homePage/UserInformation'))

const UserPage = () => {
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
          <title>User Information - InstAI</title>
        </Helmet>
        <ResponsiveAppBar />
        <UserInformation />
      </div>
    </Suspense>
  )
}

export default UserPage