import React, { lazy, Suspense } from 'react'
import { Table, Image, Spin } from 'antd'

const greenCar = lazy(() => import('../../icon image/green car.png'))
const redCar = lazy(() => import('../../icon image/red car.png'))

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
      <Suspense fallback={<Spin size='large' />}>
        <Image width={32} src={greenCar} preview={false} />
      </Suspense>
    )
  } else {
    return (
      <Suspense fallback={<Spin size='large' />}>
        <Image width={32} src={redCar} preview={false} />
      </Suspense>
    )
  }
}

const MapLegend = () => {
  return (
    <Table dataSource={data} pagination={false}>
      <Column title='圖示' render={iconStyle} align='center' />
      <Column title='說明' dataIndex='description' align='center' />
    </Table>
  )
}

export default MapLegend