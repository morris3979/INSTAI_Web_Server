import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Table, Input, Button, Space } from 'antd'
import {
  GetModelVersionTableData,
  ModelVersionTableInput,
  ModelVersionTableColumn
} from '../../store/actionCreater'

const { Column } = Table

class ModelVersionTable extends Component {
  filter = (dataIndex) => {
    return (
      <div style={{ padding: 4 }}>
        <Space direction='vertical' align='center'>
          <Input
            placeholder={'搜尋資料'}
            onChange={this.props.modelVersionTableInput}
          />
          <Button
            onClick={this.props.modelVersionTableColumn}
          >
            搜尋
          </Button>
        </Space>
      </div>
    )
  }

  componentDidMount() {
    this.props.getModelVersionTableData()
  }

  render() {
    return (
      <Table
        dataSource={this.props.modelVersionTableData}
        loading={this.props.modelVersionTableStatus}
      >
        <Column
          title='版號'
          dataIndex='boardId'
          align='center'
          filterDropdown={this.filter('boardID')}
        />
        <Column
          title='車號'
          dataIndex='plateNumber'
          align='center'
          filterDropdown={this.filter('plateNumber')}
        />
      </Table>
    )
  }
}

const mapStateToProps = (state) => {
  //state指的是store裡的數據
  return {
    modelVersionTableData: state.modelVersionTableData,
    modelVersionTableStatus: state.modelVersionTableStatus,
  }
}

const mapDispatchToProps = (dispatch) => {
  //dispatch指store.dispatch這個方法
  return {
    getModelVersionTableData() {
      const action = GetModelVersionTableData()
      dispatch(action)
    },
    modelVersionTableInput(event) {
      console.log(event)
      const action = ModelVersionTableInput(event.target.value)
      dispatch(action)
    },
    modelVersionTableColumn(dataIndex) {
      const action = ModelVersionTableColumn(dataIndex)
      dispatch(action)
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ModelVersionTable)