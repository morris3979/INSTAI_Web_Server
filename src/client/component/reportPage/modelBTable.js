import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { Table, Button, Modal, Image } from 'antd'
import {
  GetModelBTableData, GetModalFile
} from '../../store/actionCreater'
import { FileOutlined, DownloadOutlined } from '@ant-design/icons'
import {
  CarNumberFilter, CarNumberOnFilter, DateFilter, DateOnFilter, DateChange
} from './filter'

const { Column } = Table

class ModelBTable extends Component {
  constructor(props) {
    super(props)
    this.state = { isModalVisible: false }
  }

  componentDidMount() {
    this.props.getModelBTableData()
  }

  render() {
    return (
      <Fragment>
        <Table
          dataSource={this.props.modelBTableData}
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
          <video
            src={`https://d20cmf4o2f77jz.cloudfront.net/${this.props.modalFile}.mp4`}
            preload='auto'
            controls={true}
          />
          <Image
            src={`/api/s3/files/${this.props.modalFile}.jpg`}
          />
        </Modal>
      </Fragment>
    )
  }

  eventButton = (text) => {
    return (
      <Button
        onClick={() => {
          this.setState({ isModalVisible: true })
          this.props.getModalFile(text.event)
        }}
        icon={<FileOutlined />}
      />
    )
  }

  handleCancel = () => {
    this.setState({ isModalVisible: false })
  }
}

const mapStateToProps = (state) => {
  //state指的是store裡的數據
  return {
    modelBTableData: state.modelBTableData,
    tableStatus: state.tableStatus,
    modalFile: state.modalFile
  }
}

const mapDispatchToProps = (dispatch) => {
  //dispatch指store.dispatch這個方法
  return {
    getModelBTableData() {
      const action = GetModelBTableData()
      dispatch(action)
    },
    getModalFile(text) {
      const action = GetModalFile(text)
      dispatch(action)
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ModelBTable)