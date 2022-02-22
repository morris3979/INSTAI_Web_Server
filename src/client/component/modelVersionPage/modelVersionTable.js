import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { Popconfirm, Table, Button, Space, Modal, Form, Input } from 'antd'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import {
  GetModelVersionTableData, SetWhichModal, DeleteModelVersionTableData
} from '../../store/actionCreater'

const { Column } = Table
const { Item } = Form

class ModelVersionTable extends Component {
  constructor(props) {
    super(props)
    this.state = { isModalVisible: false }
  }

  componentDidMount() {
    this.props.getModelVersionTableData()
  }

  render() {
    return (
      <Fragment>
        <Button onClick={() => { this.onClick('post', {}) }} size='large'>
          新增
        </Button>
        <Table
          dataSource={this.props.modelVersionTableData}
          loading={this.props.tableStatus}
          pagination={false}
        >
          <Column title='版號' dataIndex='boardId' align='center' />
          <Column title='車號' dataIndex='plateNumber' align='center' />
          <Column title='模型' dataIndex='modelName' align='center' />
          <Column title='版本' dataIndex='version' align='center' />
          <Column title='操作' render={this.buttonGroup} align='center' />
        </Table>
        <Modal
          visible={this.state.isModalVisible}
          onCancel={this.handleCancel}
          footer={null}
          destroyOnClose={true}
        >
          <Form size='large' layout='vertical' onFinish={this.onFinish}>
            <Item
              label='版號'
              name='boardID'
              rules={[{ required: true, message: '請輸入版號' }]}
            >
              <Input />
            </Item>
            <Item
              label='車號'
              name='carNumber'
              rules={[{ required: true, message: '請輸入車號' }]}
            >
              <Input />
            </Item>
            <Item
              label='模型'
              name='model'
              rules={[{ required: true, message: '請輸入模型' }]}
            >
              <Input />
            </Item>
            <Item
              label='版本'
              name='vrsion'
              rules={[{ required: true, message: '請輸入版本' }]}
            >
              <Input />
            </Item>
            <Item>
              <Button
                htmlType='submit'
                onClick={this.handleCancel}
              >
                確認
              </Button>
            </Item>
          </Form>
        </Modal>
      </Fragment>
    )
  }

  onClick = (action, text) => {
    console.log(text)
    this.setState({ isModalVisible: true })
    this.props.setWhichModal(action)
  }

  handleCancel = () => {
    this.setState({ isModalVisible: false })
  }

  onFinish = (values) => {
    console.log(this.props.whichModal)
    console.log(values)
  }

  buttonGroup = (text) => {
    return (
      <Space size='large'>
        <Button
          onClick={() => { this.onClick('patch', text) }}
          icon={<EditOutlined />}
        />
        <Popconfirm
          title='確定刪除?'
          onConfirm={() => { this.props.deleteModelVersionTableData(text.id) }}
        >
          <Button icon={<DeleteOutlined />} />
        </Popconfirm>
      </Space>
    )
  }
}

const mapStateToProps = (state) => {
  //state指的是store裡的數據
  return {
    modelVersionTableData: state.modelVersionTableData,
    tableStatus: state.tableStatus,
    whichModal: state.whichModal
  }
}

const mapDispatchToProps = (dispatch) => {
  //dispatch指store.dispatch這個方法
  return {
    getModelVersionTableData() {
      const action = GetModelVersionTableData()
      dispatch(action)
    },
    setWhichModal(data) {
      const action = SetWhichModal(data)
      dispatch(action)
    },
    deleteModelVersionTableData(id) {
      const action = DeleteModelVersionTableData(id)
      dispatch(action)
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ModelVersionTable)