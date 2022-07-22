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
  GetModelVersionTableData, SetWhichModal, DeleteModelVersionTableData,
  PatchModelVersionTableData, PostModelVersionTableData, PostMQTTTest
} from '../../store/actionCreater'

const { Column } = Table
const { Item } = Form
const { Option } = Select

const convertedValues = {}

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
        <Table
          dataSource={this.props.modelVersionTableData}
          loading={this.props.tableStatus}
          pagination={{ position: ['bottomCenter'] }}
        >
          <Column title='板號' dataIndex='boardId' align='center' />
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
            <Item label='板號' name='boardId' rules={[this.rule('板號')]}>
              <Input
                defaultValue={
                  `${this.defaultValue(this.props.whichModal.boardId)}`
                }
              />
            </Item>
            <Item label='車號' name='plateNumber' rules={[this.rule('車號')]}>
              <Input
                defaultValue={
                  `${this.defaultValue(this.props.whichModal.plateNumber)}`
                }
              />
            </Item>
            <Item label='模型' name='modelName' rules={[this.rule('模型')]}>
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
            <Item label='版本' name='version' rules={[this.rule('版本')]}>
              <Select
                defaultValue={
                  `${this.defaultValue(this.props.whichModal.version)}`
                }
              >
                <Option value='1'>1</Option>
                <Option value='2'>2</Option>
                <Option value='3'>3</Option>
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
      this.props.patchModelVersionTableData(this.props.whichModal.id, convertedValues)
    } else {
      this.props.postModelVersionTableData(convertedValues)
    }
  }

  buttonGroup = (text) => {
    return (
      <Space size='large'>
        <Button
          onClick={() => { this.props.postMQTTTest(text) }}
          icon={<DeploymentUnitOutlined />}
        />
        <Button
          onClick={() => { this.onClick(text) }}
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
    setWhichModal(text) {
      const action = SetWhichModal(text)
      dispatch(action)
    },
    getModelVersionTableData() {
      const action = GetModelVersionTableData()
      dispatch(action)
    },
    deleteModelVersionTableData(id) {
      const action = DeleteModelVersionTableData(id)
      dispatch(action)
    },
    patchModelVersionTableData(id, data) {
      const action = PatchModelVersionTableData(id, data)
      dispatch(action)
    },
    postModelVersionTableData(data) {
      const action = PostModelVersionTableData(data)
      dispatch(action)
    },
    postMQTTTest(data) {
      const action = PostMQTTTest(data)
      dispatch(action)
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ModelVersionTable)