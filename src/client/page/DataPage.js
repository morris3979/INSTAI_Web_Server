import React, { lazy, Suspense } from 'react'
import Loading from '../loading'
import { Helmet } from "react-helmet"
import { CirclesWithBar } from 'react-loader-spinner'

const ResponsiveAppBar = lazy(() => import('../component/DataPage/ResponsiveAppBar'))

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
        <div
            style={{
                marginTop: 200,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
            }}
        >
            <CirclesWithBar
            height="100"
            width="100"
            color="#4fa94d"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
            outerCircleColor=""
            innerCircleColor="lightblue"
            barColor="red"
            ariaLabel='circles-with-bar-loading'
            />
            <h1 style={{ color: 'yellow' }}>SITE UNDER CONSTRUCTION ...</h1>
        </div>
      </div>
    </Suspense>
  )
}

export default HomePage