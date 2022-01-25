import React, { Component } from 'react'
import { Table, message } from 'antd'
import axios from 'axios'

const { Column } = Table
const tableDate = []

message.config({ maxCount: 1 })

const getDataTest = async () => {
  message.loading('載入中...', 0)
  try {
    const response = await axios.get('http://localhost:8080/api/carnumber')
    response.data.forEach((item) => {
      tableDate.push(item)
    })
    message.success(`${JSON.stringify(tableDate)}`)
  } catch (error) {
    message.error(`${error}`)
  }
}

class ModelVersionTable extends Component {
  componentDidMount() { getDataTest }

  render() {
    return (
      <Table dataSource={tableDate}>
        <Column title='版號' dataIndex='boardId' />
        <Column title='車號' dataIndex='plateNumber' />
      </Table>
    )
  }
}

export default ModelVersionTable