import React from 'react'
import { Result } from 'antd'

const ErrorPage = () => {
  return (
    <Result status='403' title='您沒有權限使用' />
  )
}

export default ErrorPage