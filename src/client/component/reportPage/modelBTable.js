import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { Table, Input, Button, Space, Modal, Image, DatePicker } from 'antd'
import {
  SearchOutlined, FileOutlined, DownloadOutlined
} from '@ant-design/icons'
import {
  GetModelBTableData, GetModalFile
} from '../../store/actionCreater'

const { Column } = Table

const filter = ({ setSelectedKeys, selectedKeys, confirm }) => {
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

  return (
    <Space>
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
  )
}
const onFilter = (value, record) => {
  return (
    record.CarNumber.plateNumber.toLowerCase().includes(value.toLowerCase())
  )
}

const dateFilter = ({ setSelectedKeys, selectedKeys, confirm }) => {
  const onClick = () => { confirm() }

  const onChange = (value) => {
    if (value) {
      return (
        setSelectedKeys([value.format('YYYY-MM-DD')])
      )
    } else {
      return (
        setSelectedKeys([])
      )
    }
  }

  return (
    <Space>
      <DatePicker
        bordered={false} size='large' onChange={onChange}
      />
      <Button
        type='text' size='large' onClick={onClick} icon={<SearchOutlined />}
      />
    </Space>
  )
}
const dateOnFilter = (value, record) => {
  return (
    record.createAt.toLowerCase().includes(value.toLowerCase())
  )
}

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
            filterDropdown={filter}
            onFilter={onFilter}
            align='center'
          />
          <Column
            title='紀錄時間'
            dataIndex='createAt'
            filterDropdown={dateFilter}
            onFilter={dateOnFilter}
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
        >
          <Image
            src={`http://localhost:8080/api/s3/files/${this.props.modalFile}.jpg`}
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