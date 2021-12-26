import React from 'react'
import { connect } from 'react-redux'
import { Card, Button } from 'antd'

const MaintainCard = (props) => {
  return (
    <Card
      title='test'
      extra={
        <Button>
          編輯
        </Button>
      }
    >

    </Card>
  )
}

export default connect(null, null)(MaintainCard)