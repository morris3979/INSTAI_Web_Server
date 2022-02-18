import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Table } from 'antd'
import {
  GetModelVersionTableData
} from '../../store/actionCreater'

const { Column } = Table

class ModelVersionTable extends Component {
  componentDidMount() {
    this.props.getModelVersionTableData()
  }

  render() {
    return (
      <Table
        dataSource={this.props.modelVersionTableData}
        loading={this.props.tableStatus}
        pagination={false}
      >
        <Column title='版號' dataIndex='boardId' align='center' />
        <Column title='車號' dataIndex='plateNumber' align='center' />
        <Column title='模型' dataIndex='modelName' align='center' />
        <Column title='版本' dataIndex='version' align='center' />
      </Table>
    )
  }
}

const mapStateToProps = (state) => {
  //state指的是store裡的數據
  return {
    modelVersionTableData: state.modelVersionTableData,
    tableStatus: state.tableStatus
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