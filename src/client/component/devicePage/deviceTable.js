import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import {
    Popconfirm, Table, Button, Space, Modal, Form, Input, Select, Affix
} from 'antd'
import {
    EditOutlined,
    DeleteOutlined,
    PlusOutlined,
    DeploymentUnitOutlined
} from '@ant-design/icons'
import {
    SetWhichModal,
    GetDeviceTableData,
    DeleteDeviceTableData,
    PatchDeviceTableData,
    PostDeviceTableData,
    PostDeviceMQTT
} from '../../store/actionCreater'

const { Column } = Table
const { Item } = Form
const { Option } = Select

const convertedValues = {}

class DeviceTable extends Component {
  constructor(props) {
    super(props)
    this.state = { isModalVisible: false }
  }

  componentDidMount() {
    this.props.getDeviceTableData()
  }

  render() {
    return (
      <Fragment>
        <Table
          dataSource={this.props.deviceTableData}
          loading={this.props.tableStatus}
          pagination={{ position: ['bottomCenter'] }}
        >
          <Column title='設備代號' dataIndex='deviceId' align='center' />
          <Column title='設備名稱' dataIndex='deviceName' align='center' />
          <Column title='設備描述' dataIndex='description' align='center' />
          <Column title='指令' dataIndex='command' align='center' />
          <Column title='訊息' dataIndex='message' align='center' />
          <Column title='操作' render={this.buttonGroup} align='center' />
        </Table>
        <Modal
          visible={this.state.isModalVisible}
          onCancel={this.handleCancel}
          footer={null}
          destroyOnClose={true}
        >
          <Form size='large' layout='vertical' onFinish={this.onFinish}>
            <Item label='請輸入設備代號' name='deviceId' rules={[this.rule('設備代號')]}>
              <Input
                defaultValue={
                  `${this.defaultValue(this.props.whichModal.deviceId)}`
                }
              />
            </Item>
            <Item label='請輸入設備名稱' name='deviceName' rules={[this.rule('設備名稱')]}>
              <Input
                defaultValue={
                  `${this.defaultValue(this.props.whichModal.deviceName)}`
                }
              />
            </Item>
            <Item label='請輸入設備描述' name='description' rules={[this.rule('設備描述')]}>
              <Input
                defaultValue={
                  `${this.defaultValue(this.props.whichModal.description)}`
                }
              />
            </Item>
            <Item label='請輸入指令' name='command' rules={[this.rule('指令')]}>
              <Input
                defaultValue={
                  `${this.defaultValue(this.props.whichModal.command)}`
                }
              />
            </Item>
            <Item label='請選擇更新模型' name='modelName' rules={[this.rule('模型')]}>
              <Select
                defaultValue={
                  `${this.defaultValue(this.props.whichModal.modelName)}`
                }
              >
                <Option value='A'>A</Option>
                <Option value='B'>B</Option>
                <Option value='C'>C</Option>
              </Select>
            </Item>
            <Item label='請選擇更新版本' name='modelVersion' rules={[this.rule('版本')]}>
              <Select
                defaultValue={
                  `${this.defaultValue(this.props.whichModal.modelVersion)}`
                }
              >
                <Option value='1.0.0'>1.0.0</Option>
                <Option value='2.0.0'>2.0.0</Option>
                <Option value='3.0.0'>3.0.0</Option>
              </Select>
            </Item>
            <Item>
              <Button htmlType='submit'>
                確認
              </Button>
            </Item>
          </Form>
        </Modal>
        <Affix style={{ position: 'fixed', bottom: 10, right: 10 }}>
          <Button
            onClick={() => { this.onClick({ id: 0 }) }}
            icon={<PlusOutlined />}
            size='large'
            shape='circle'
          />
        </Affix>
      </Fragment>
    )
  }

  onClick = (text) => {
    this.setState({ isModalVisible: true })
    this.props.setWhichModal(text)
  }

  handleCancel = () => {
    this.setState({ isModalVisible: false })
  }

  rule = (hint) => {
    if (this.props.whichModal.id == 0) {
      return ({ required: true, message: `請輸入${hint}` })
    } else {
      return ({ required: false })
    }
  }

  defaultValue = (value) => {
    if (this.props.whichModal.id > 0) {
      return (value)
    } else {
      return ('')
    }
  }

  onFinish = (values) => {
    this.handleCancel()
    Object.keys(JSON.parse(JSON.stringify(values))).forEach((key) => {
      convertedValues[String(key)] = values[key]
    })
    if (this.props.whichModal.id > 0) {
      this.props.patchDeviceTableData(this.props.whichModal.id, convertedValues)
    } else {
      this.props.postDeviceTableData(convertedValues)
    }
  }

  buttonGroup = (text) => {
    return (
      <Space size='large'>
        <Button
          onClick={() => { this.props.PostDeviceMQTT(text) }}
          icon={<DeploymentUnitOutlined />}
        />
        <Button
          onClick={() => { this.onClick(text) }}
          icon={<EditOutlined />}
        />
        <Popconfirm
          title='確定刪除?'
          onConfirm={() => { this.props.deleteDeviceTableData(text.id) }}
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
    deviceTableData: state.deviceTableData,
    tableStatus: state.tableStatus,
    whichModal: state.whichModal
  }
}

const mapDispatchToProps = (dispatch) => {
  //dispatch指store.dispatch這個方法
  return {
    setWhichModal(text) {
      const action = SetWhichModal(text)
      dispatch(action)
    },
    getDeviceTableData() {
      const action = GetDeviceTableData()
      dispatch(action)
    },
    deleteDeviceTableData(id) {
      const action = DeleteDeviceTableData(id)
      dispatch(action)
    },
    patchDeviceTableData(id, data) {
      const action = PatchDeviceTableData(id, data)
      dispatch(action)
    },
    postDeviceTableData(data) {
      const action = PostDeviceTableData(data)
      dispatch(action)
    },
    PostDeviceMQTT(data) {
      const action = PostDeviceMQTT(data)
      dispatch(action)
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DeviceTable)