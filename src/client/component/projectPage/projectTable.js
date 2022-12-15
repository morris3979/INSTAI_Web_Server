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
    Affix,
    Select
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
    PostProjectTableData,
    GetAccountTableData,
} from '../../store/actionCreater'

const { Column } = Table
const { Item } = Form
const border = {
    borderTopLeftRadius: '8px',
    borderTopRightRadius: '8px',
    borderBottomLeftRadius: '8px',
    borderBottomRightRadius: '8px',
}

const convertedValues = {}

class ProjectTable extends Component {
  constructor(props) {
    super(props)
    this.state = { isModalVisible: false }
  }

  componentDidMount() {
    this.props.getProjectTableData()
    this.props.getAccountTableData()
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
          <Column title='Action' render={this.buttonGroup} align='center' width='10%' />
          <Column title='Project ID' dataIndex='UserId' align='center' width='15%' />
          <Column title='Display Name' dataIndex='displayName' align='center' width='15%' />
          <Column title='Builded Host' dataIndex='Hosts' key="Hosts" align='center'
            render={(Hosts) => Hosts.map(c => c.serialNumber+' ('+c.hostName+')'+'\n').join('')} />
          <Column title='Builded Device' dataIndex='Hosts' key='Hosts' align='center'
            render={(Hosts) => Hosts.map( c => c.Devices.map(d => d.deviceId+' ('+d.deviceName+')'+'\n').join(''))}
          />
          <Column title='Owner' dataIndex={['User', 'username']} align='center' width='15%' />
        </Table>
        <Modal
          visible={this.state.isModalVisible}
          onCancel={this.handleCancel}
          footer={null}
          destroyOnClose={true}
        >
          <Form size='large' layout='vertical' onFinish={this.onFinish}>
            <Item label='Please Input Project ID' name='UserId' rules={[this.rule('專案代號')]}>
              <Input
                defaultValue={
                  `${this.defaultValue(this.props.whichModal.UserId)}`
                }
              />
            </Item>
            <Item label='Please Input Project Name' name='displayName' rules={[this.rule('專案名稱')]}>
              <Input
                defaultValue={
                  `${this.defaultValue(this.props.whichModal.displayName)}`
                }
              />
            </Item>
            <Item label='Please Select Project Owner' name='UserId' hidden={this.props.whichModal.admin == true}>
              <Select placeholder='Select a Project Owner' onChange={this.handleSelectUser}
                defaultValue={this.defaultValue(this.props.whichModal.UserId)}>
                {this.props.accountData.map(c => {
                  return ( <Option key={c.id} value={c.id}>{c.username}</Option> )
                })}
              </Select>
            </Item>
            <Item>
              <Button htmlType='submit'>
                submit
              </Button>
            </Item>
          </Form>
        </Modal>
        <Affix style={{ position: 'fixed', bottom: 10, right: 10 }}>
          <Button
            type='primary'
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

  handleSelectUser = (value) => {
    this.setState({ selectUser: value })
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
        <Popconfirm
          title='確定刪除?'
          onConfirm={() => { this.props.deleteProjectTableData(text.id) }}
        >
          <Button style={ border } icon={<DeleteOutlined />} type='primary' danger />
        </Popconfirm>
        <Button
          style={ border }
          type='primary'
          onClick={() => { this.onClick(text) }}
          icon={<EditOutlined />}
        />
      </Space>
    )
  }
}

const mapStateToProps = (state) => {
  //state指的是store裡的數據
  return {
    projectTableData: state.projectTableData,
    tableStatus: state.tableStatus,
    whichModal: state.whichModal,
    accountData: state.accountData,
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
    },
    getAccountTableData() {
      const action = GetAccountTableData()
      dispatch(action)
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectTable)