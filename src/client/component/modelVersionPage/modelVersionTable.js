import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Table } from 'antd'
import {
  GetModelVersionTableData
} from '../../store/actionCreater'

const { Column } = Table

class ModelVersionTable extends Component {
  /*componentDidMount() {
    this.props.getModelVersionTableData()
  }

  render() {
    const columns = [
      {
        title: '版號',
        dataIndex: 'boardId',
        align: 'center',
        filterDropdown: ({ setSelectedKey, selectedKey, confirm }) => {
          return (
            <div style={{ padding: 4 }}>
              <Space direction='vertical' align='center'>
                <Input
                  autoFocus
                  placeholder={'搜尋資料'}
                  value={console.log(selectedKey)}
                  onChange={
                    (e) => {
                      setSelectedKey(
                        e.target.value ? [e.target.value] : []
                      )
                    }
                  }
                />
                <Button
                  onClick={() => { confirm() }}
                >
                  搜尋
                </Button>
              </Space>
            </div>
          )
        }
      },
      {
        title: '車號',
        dataIndex: 'plateNumber',
        align: 'center'
      }
    ]

    return (
      <Table
        dataSource={this.props.modelVersionTableData}
        loading={this.props.modelVersionTableStatus}
        columns={columns}
      />
    )
  }*/

  componentDidMount() {
    this.props.getModelVersionTableData()
  }

  onFilter = (value, record) => {
    return (
      record.boardId.indexOf(value) === 0
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
          align='center'
          filters={this.props.filters}
          onFilter={this.onFilter}
        />
        <Column
          title='車號'
          dataIndex='plateNumber'
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
    modelVersionTableStatus: state.modelVersionTableStatus,
    filters: state.filters
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