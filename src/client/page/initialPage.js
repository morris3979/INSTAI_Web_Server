import React from 'react'
import { Navigate } from 'react-router-dom'
import { connect } from 'react-redux'
import { Result } from 'antd'
import { LikeOutlined } from '@ant-design/icons'

const InitialPage = (props) => {
  const { loginFlag } = props

  if (loginFlag == false) {
    return (
      <Navigate to='/login' />
    )
  } else {
    return (
      <Result icon={<LikeOutlined />} title='歡迎使用' />
    )
  }
}

const mapStateToProps = (state) => {
  //state指的是store裡的數據
  return {
    loginFlag: state.loginFlag
  }
}

export default connect(mapStateToProps)(InitialPage)