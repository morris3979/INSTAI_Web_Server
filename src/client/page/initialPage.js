import React, { lazy, Suspense } from 'react'
import { connect } from 'react-redux'
import { Result, Spin } from 'antd'

const { Navigate } = lazy(() => import('react-router-dom'))

const InitialPage = (props) => {
  const { loginInformation } = props

  if (loginInformation.administrator == false) {
    return (
      <Suspense fallback={<Spin size='large' />}>
        <Navigate to='/login' />
      </Suspense>
    )
  } else {
    return (
      <Result status='success' title='登入成功，歡迎使用' />
    )
  }
}

const mapStateToProps = (state) => {
  //state指的是store裡的數據
  return {
    loginInformation: state.loginInformation
  }
}

export default connect(mapStateToProps)(InitialPage)