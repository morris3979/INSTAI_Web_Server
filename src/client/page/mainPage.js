import React, { lazy, Suspense } from 'react'
import { connect } from 'react-redux'
import { LoadingOutlined } from '@ant-design/icons'

const MainMap = lazy(() => import('../component/mainPage/mainMap'))

const MainPage = () => {
  return (
    <Suspense
      fallback={
        <div style={{ textAlign: 'center', fontSize: 100 }}>
          <LoadingOutlined />
        </div>
      }
    >
      <MainMap />
    </Suspense>
  )
}

export default connect(null, null)(MainPage)