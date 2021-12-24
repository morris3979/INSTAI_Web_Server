import React from 'react'
import { connect } from 'react-redux'
import { Table, Popconfirm } from 'antd'

const { Column } = Table

const data = [
  {
    key: '1',
    carNumber: 'AA001',
    modelType: 'A',
  },
  {
    key: '2',
    carNumber: 'BB002',
    modelType: 'B',
  },
  {
    key: '3',
    carNumber: 'CC003',
    modelType: 'C',
  },
]

const DataTable = () => {
  return (
    <Table dataSource={data}>
      <Column align='center' title="carNumber" dataIndex="carNumber" />
      <Column align='center' title="modelType" dataIndex="modelType" />
      <Column
        align='center'
        title="Action"
        key="action"
        render={() => (
          <Popconfirm title='Sure to delete'>
            <a href='#?'>Delete</a>
          </Popconfirm>
        )}
      />
    </Table>
  )
}

export default connect(null, null)(DataTable)