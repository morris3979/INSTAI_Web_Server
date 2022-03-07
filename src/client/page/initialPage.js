import React from 'react'
import { connect } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { Result } from 'antd'

const InitialPage = (props) => {
  const { loginInformation } = props

  if (Object.keys(loginInformation).length == 0) {
    return (
      <Navigate to='/login' />
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