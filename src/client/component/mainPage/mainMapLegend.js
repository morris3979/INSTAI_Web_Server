import React from 'react'
import { Table } from 'antd'
import { CarOutlined } from '@ant-design/icons'

const { Column } = Table

const data = [
  {
    status: '1',
    description: '行駛中(10分內有動)'
  },
  {
    status: '0',
    description: '怠速中(10分內未動)'
  }
]

const iconStyle = (text) => {
  if (text.status == '1') {
    return (
      <CarOutlined style={{ color: 'green' }} />
    )
  } else {
    return (
      <CarOutlined style={{ color: 'red' }} />
    )
  }
}

const MainMapLegend = () => {
  return (
    <Table dataSource={data} pagination={false}>
      <Column title='圖示' render={iconStyle} />
      <Column title='說明' dataIndex='description' />
    </Table>
  )
}

export default MainMapLegend