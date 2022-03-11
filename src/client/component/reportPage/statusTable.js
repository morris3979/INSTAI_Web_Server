import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Table } from 'antd'
import { GetStatusTableData } from '../../store/actionCreater'
import {
  CarNumberFilter, CarNumberOnFilter, DateFilter, DateOnFilter, DateChange
} from './filter'

const { Column } = Table

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
          filterDropdown={CarNumberFilter}
          onFilter={CarNumberOnFilter}
          align='center'
        />
        <Column
          title='紀錄時間'
          render={DateChange}
          filterDropdown={DateFilter}
          onFilter={DateOnFilter}
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