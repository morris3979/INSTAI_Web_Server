import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Table, Input, Button, Space } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import {
  GetStatusTableData
} from '../../store/actionCreater'

const { Column } = Table

const filter = ({ setSelectedKeys, selectedKeys, confirm }) => {
  const onClick = () => { confirm() }

  const onChange = (event) => {
    if (event.target.value) {
      return (
        setSelectedKeys([event.target.value])
      )
    } else {
      return (
        setSelectedKeys([])
      )
    }
  }

  return (
    <Space align='center'>
      <Input
        bordered={false}
        placeholder='搜尋資料'
        size='large'
        value={selectedKeys}
        onChange={onChange}
      />
      <Button
        type='text'
        size='large'
        onClick={onClick}
        icon={<SearchOutlined />}
      />
    </Space>
  )
}

const onFilter = (value, record) => {
  return (
    record.CarNumber.plateNumber.toLowerCase().includes(value.toLowerCase())
  )
}

class StatusTable extends Component {
  componentDidMount() {
    this.props.getStatusTableData()
  }

  render() {
    return (
      <Table
        dataSource={this.props.reportTableData}
        loading={this.props.tableStatus}
        pagination={false}
      >
        <Column
          title='車輛編號'
          dataIndex={['CarNumber', 'plateNumber']}
          filterDropdown={filter}
          onFilter={onFilter}
          align='center'
        />
        <Column
          title='位置'
          dataIndex='position'
          align='center'
        />
        <Column
          title='模型'
          dataIndex={['CarNumber', 'modelName']}
          align='center'
        />
      </Table>
    )
  }
}

const mapStateToProps = (state) => {
  //state指的是store裡的數據
  return {
    reportTableData: state.reportTableData,
    tableStatus: state.tableStatus
  }
}

const mapDispatchToProps = (dispatch) => {
  //dispatch指store.dispatch這個方法
  return {
    getStatusTableData() {
      const action = GetStatusTableData()
      dispatch(action)
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(StatusTable)