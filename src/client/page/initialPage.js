import React from 'react'
import { Result } from 'antd'
import { LikeOutlined } from '@ant-design/icons'

const InitialPage = () => {
  return (
    <Result icon={<LikeOutlined />} title='歡迎使用' />
  )
}

export default InitialPage