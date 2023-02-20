import React, { lazy, Suspense } from 'react'
import Loading from '../loading'
import { Helmet } from "react-helmet"

const ResponsiveAppBar = lazy(() => import('../component/homePage/ResponsiveAppBar'))
const InvitePeopleTable = lazy(() => import('../component/homePage/InvitePeopleTable'))

const OrganizationManegePage = () => {
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
        <InvitePeopleTable />
      </div>
    </Suspense>
  )
}

export default OrganizationManegePage