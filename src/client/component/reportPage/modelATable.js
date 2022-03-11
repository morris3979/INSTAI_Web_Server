import React, { Component, lazy, Suspense } from 'react'
import { connect } from 'react-redux'
import { Table, Button, Modal, Image, Spin } from 'antd'
import {
  GetModelATableData, GetModalFile
} from '../../store/actionCreater'

const { FileOutlined, DownloadOutlined } = lazy(() => import('@ant-design/icons'))
const {
  CarNumberFilter, CarNumberOnFilter, DateFilter, DateOnFilter, DateChange
} = lazy(() => import('./filter'))

const { Column } = Table

class ModelATable extends Component {
  constructor(props) {
    super(props)
    this.state = { isModalVisible: false }
  }

  componentDidMount() {
    this.props.getModelATableData()
  }

  render() {
    return (
      <Suspense fallback={<Spin size='large' />}>
        <Table
          dataSource={this.props.modelATableData}
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
            title='事件'
            render={this.eventButton}
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
        <Modal
          visible={this.state.isModalVisible}
          onCancel={this.handleCancel}
          footer={<Button size='large' icon={<DownloadOutlined />} />}
          destroyOnClose={true}
          width={690}
        >
          <Image
            src={`/api/s3/files/${this.props.modalFile}.jpg`}
          />
        </Modal>
      </Suspense>
    )
  }

  eventButton = (text) => {
    return (
      <Suspense fallback={<Spin size='large' />}>
        <Button
          onClick={() => {
            this.setState({ isModalVisible: true })
            this.props.getModalFile(text.event)
          }}
          icon={<FileOutlined />}
        />
      </Suspense>
    )
  }

  handleCancel = () => {
    this.setState({ isModalVisible: false })
  }
}

const mapStateToProps = (state) => {
  //state指的是store裡的數據
  return {
    modelATableData: state.modelATableData,
    tableStatus: state.tableStatus,
    modalFile: state.modalFile
  }
}

const mapDispatchToProps = (dispatch) => {
  //dispatch指store.dispatch這個方法
  return {
    getModelATableData() {
      const action = GetModelATableData()
      dispatch(action)
    },
    getModalFile(text) {
      const action = GetModalFile(text)
      dispatch(action)
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ModelATable)