import React, { lazy, Suspense } from 'react'
import Loading from '../loading'

const ResponsiveAppBar = lazy(() => import('../component/homePage/ResponsiveAppBar'))
const ActionAreaCard = lazy(() => import('../component/homePage/ActionAreaCard'))

const HomePage = () => {
  return (
    <Suspense fallback={<Loading />}>
      <div
        style={{
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        //   justifyContent: 'center',
          backgroundColor: '#1c2127',
        }}
      >
        <ResponsiveAppBar />
        <ActionAreaCard />
      </div>
    </Suspense>
  )
}

export default HomePage