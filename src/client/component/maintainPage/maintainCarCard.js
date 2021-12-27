import React from 'react'
import { connect } from 'react-redux'
import { Card, Button } from 'antd'
import { EditOutlined } from '@ant-design/icons'

const MaintainCarCard = () => {
  return (
    <Card
      title='車輛編號表'
      extra={
        <Button
          icon={<EditOutlined style={{ color: 'black' }} />}
          size='large'
        />
      }
    >
    </Card>
  )
}

export default connect(null, null)(MaintainCarCard)