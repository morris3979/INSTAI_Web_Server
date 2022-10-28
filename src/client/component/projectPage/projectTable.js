import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import {
    Popconfirm,
    Table,
    Button,
    Space,
    Modal,
    Form,
    Input,
    Affix
} from 'antd'
import {
    EditOutlined,
    DeleteOutlined,
    PlusOutlined
} from '@ant-design/icons'
import {
    SetWhichModal,
    GetProjectTableData,
    DeleteProjectTableData,
    PatchProjectTableData,
    PostProjectTableData
} from '../../store/actionCreater'

const { Column } = Table
const { Item } = Form

const convertedValues = {}

class ProjectTable extends Component {
  constructor(props) {
    super(props)
    this.state = { isModalVisible: false }
  }

  componentDidMount() {
    this.props.getProjectTableData()
  }

  render() {
    return (
      <Fragment>
        <Table
          dataSource={this.props.projectTableData}
          loading={this.props.tableStatus}
          pagination={{ position: ['bottomCenter'] }}
          style={{ whiteSpace: 'pre'}}
          scroll={{ x: 1000, y: 750 }}
        >
          <Column title='操作' render={this.buttonGroup} align='center' width='10%' />
          <Column title='專案代號' dataIndex='project' align='center' width='15%' />
          <Column title='專案名稱' dataIndex='displayName' align='center' width='15%' />
          <Column title='已配置的主機' dataIndex='Hosts' key="Hosts" align='center'
            render={(Hosts) => Hosts.map(c => c.serialNumber+' ('+c.hostName+')'+'\n').join('')} />
          <Column title='已配置的設備' dataIndex='Hosts' key='Hosts' align='center'
            render={(Hosts) => Hosts.map( c => c.Devices.map(d => d.deviceId+' ('+d.deviceName+')'+'\n').join(''))}
          />
        </Table>
        <Modal
          visible={this.state.isModalVisible}
          onCancel={this.handleCancel}
          footer={null}
          destroyOnClose={true}
        >
          <Form size='large' layout='vertical' onFinish={this.onFinish}>
            <Item label='請輸入專案代號' name='project' rules={[this.rule('專案代號')]}>
              <Input
                defaultValue={
                  `${this.defaultValue(this.props.whichModal.project)}`
                }
              />
            </Item>
            <Item label='請輸入專案名稱' name='displayName' rules={[this.rule('專案名稱')]}>
              <Input
                defaultValue={
                  `${this.defaultValue(this.props.whichModal.displayName)}`
                }
              />
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
      this.props.patchProjectTableData(this.props.whichModal.id, convertedValues)
    } else {
      this.props.postProjectTableData(convertedValues)
    }
  }

  buttonGroup = (text) => {
    return (
      <Space size='large'>
        <Button
          onClick={() => { this.onClick(text) }}
          icon={<EditOutlined />}
        />
        <Popconfirm
          title='確定刪除?'
          onConfirm={() => { this.props.deleteProjectTableData(text.id) }}
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
    projectTableData: state.projectTableData,
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
    getProjectTableData() {
      const action = GetProjectTableData()
      dispatch(action)
    },
    deleteProjectTableData(id) {
      const action = DeleteProjectTableData(id)
      dispatch(action)
    },
    patchProjectTableData(id, data) {
      const action = PatchProjectTableData(id, data)
      dispatch(action)
    },
    postProjectTableData(data) {
      const action = PostProjectTableData(data)
      dispatch(action)
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectTable)