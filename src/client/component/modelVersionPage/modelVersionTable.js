import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { Table, Input, Button, Space, Calendar } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import {
  GetModelVersionTableData
} from '../../store/actionCreater'

const { Column } = Table

class ModelVersionTable extends Component {
  componentDidMount() {
    this.props.getModelVersionTableData()
  }

  filter = ({ setSelectedKeys, selectedKeys, confirm }) => {
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

    /*const onSelect = (value) => {
      console.log(value.format('YYYY-MM-DD'))
      if (value) {
        return (
          setSelectedKeys([value.format('YYYY-MM-DD')])
        )
      } else {
        return (
          setSelectedKeys([])
        )
      }
    }*/

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
      /*<Fragment>
        <Calendar fullscreen={false} onSelect={onSelect} />
        <Button
          type='text'
          size='large'
          onClick={onClick}
          icon={<SearchOutlined />}
        />
      </Fragment>*/
    )
  }

  onFilter = (value, record) => {
    return (
      record.boardId.toLowerCase().includes(value.toLowerCase())
    )
  }

  render() {
    return (
      <Table
        dataSource={this.props.modelVersionTableData}
        loading={this.props.modelVersionTableStatus}
        pagination={false}
      >
        <Column
          title='版號'
          dataIndex='boardId'
          filterDropdown={this.filter}
          onFilter={this.onFilter}
          align='center'
        />
      </Table>
    )
  }
}

const mapStateToProps = (state) => {
  //state指的是store裡的數據
  return {
    modelVersionTableData: state.modelVersionTableData,
    modelVersionTableStatus: state.modelVersionTableStatus
  }
}

const mapDispatchToProps = (dispatch) => {
  //dispatch指store.dispatch這個方法
  return {
    getModelVersionTableData() {
      const action = GetModelVersionTableData()
      dispatch(action)
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ModelVersionTable)