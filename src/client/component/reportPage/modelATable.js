import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { Table, Button, Modal, Image, Typography } from 'antd'
import ReactPlayer from 'react-player/lazy'
import {
  GetModelATableData, GetModalFile
} from '../../store/actionCreater'
import { FileOutlined, DownloadOutlined } from '@ant-design/icons'
import {
  CarNumberFilter, CarNumberOnFilter, DateFilter, DateOnFilter, DateChange
} from './tools'

const { Column } = Table
const { Text } = Typography

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
      <Fragment>
        <Table
          dataSource={this.props.modelATableData}
          loading={this.props.tableStatus}
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
          <Text>圖片</Text>
          {this.modalFileImage()}
          <Text>影片</Text>
          {this.modalFileVideo()}
        </Modal>
      </Fragment>
    )
  }

  eventButton = (text) => {
    return (
      <Button
        onClick={() => {
          this.setState({ isModalVisible: true })
          this.props.getModalFile(text.Details)
        }}
        icon={<FileOutlined />}
      />
    )
  }

  handleCancel = () => {
    this.setState({ isModalVisible: false })
  }

  modalFileImage = () => {
    return (
      this.props.modalFile.map((value) => {
        if (value.image) {
          return (
            <Image
              src={`https://d20cmf4o2f77jz.cloudfront.net/image/${value.details}.jpg`}
            />
            // <Image
            //   src={`https://carview.oss-accelerate.aliyuncs.com/image/${value.details}.jpg`}
            // />
          )
        }
      })
    )
  }

  modalFileVideo = () => {
    return (
      this.props.modalFile.map((value) => {
        if (value.video) {
          return (
            <ReactPlayer
              url={`https://d20cmf4o2f77jz.cloudfront.net/video/${value.details}.mp4`}
              controls={true}
            />
            // <ReactPlayer
            //   url={`https://carview.oss-accelerate.aliyuncs.com/video/${value.details}.mp4`}
            //   controls={true}
            // />
          )
        }
      })
    )
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