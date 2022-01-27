import React, { Fragment } from 'react'
import { Table, Image, Typography } from 'antd'

const { Column } = Table
const { Text, Link } = Typography

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
      <Image
        width={32}
        src={require('../../icon image/green car.png')}
        preview={false}
      />
    )
  } else {
    return (
      <Image
        width={32}
        src={require('../../icon image/red car.png')}
        preview={false}
      />
    )
  }
}

const MapLegend = () => {
  return (
    <Fragment>
      <Table dataSource={data} pagination={false}>
        <Column title='圖示' render={iconStyle} align='center' />
        <Column title='說明' dataIndex='description' align='center' />
      </Table>
      <Text>
        Icons made by { }
        <Link href='https://www.flaticon.com/authors/aquariid' target='_blank'>
          AquariiD
        </Link>
        { } from { }
        <Link href='https://www.flaticon.com/' target='_blank'>
          www.flaticon.com
        </Link>
      </Text>
    </Fragment>
  )
}

export default MapLegend