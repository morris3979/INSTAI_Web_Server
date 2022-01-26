import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Table, message } from 'antd'
import axios from 'axios'
import {
  InitModelVersionTable
} from '../../store/actionCreater'

const { Column } = Table

message.config({ maxCount: 1 })

class ModelVersionTable extends Component {
  async componentDidMount() {
    message.loading('載入中...', 0)
    try {
      const response = await axios.get('http://localhost:8080/api/carnumber')
      this.props.initModelVersionTable(response.data)
      message.success('完成')
    } catch (error) {
      message.error(`${error}`)
    }
  }

  render() {
    return (
      <Table dataSource={this.props.modelVersionTableData}>
        <Column title='版號' dataIndex='boardId' />
        <Column title='車號' dataIndex='plateNumber' />
      </Table>
    )
  }
}

const mapStateToProps = (state) => {
  //state指的是store裡的數據
  return {
    modelVersionTableData: state.modelVersionTableData
  }
}

const mapDispatchToProps = (dispatch) => {
  //dispatch指store.dispatch這個方法
  return {
    initModelVersionTable(data) {
      const action = InitModelVersionTable(data)
      dispatch(action)
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ModelVersionTable)