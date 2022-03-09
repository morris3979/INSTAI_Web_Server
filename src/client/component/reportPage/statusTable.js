import React, { Component, lazy, Suspense } from 'react'
import { connect } from 'react-redux'
import { Table, Spin } from 'antd'
import { GetStatusTableData } from '../../store/actionCreater'

const {
  CarNumberFilter, CarNumberOnFilter, DateFilter, DateOnFilter, DateChange
} = lazy(() => import('./filter'))

const { Column } = Table

class StatusTable extends Component {
  componentDidMount() {
    this.props.getStatusTableData()
  }

  render() {
    return (
      <Suspense fallback={<Spin size='large' />}>
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
      </Suspense>
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