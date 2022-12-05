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
    Select,
    Affix,
    Tag
} from 'antd'
import {
    EditOutlined,
    DeleteOutlined,
    PlusOutlined,
    DeploymentUnitOutlined
} from '@ant-design/icons'
import {
    SetWhichModal,
    GetProjectTableData,
    GetHostTableData,
    DeleteHostTableData,
    PatchHostTableData,
    PostHostTableData,
    PostHostMQTT
} from '../../store/actionCreater'

const { Column } = Table
const { Item } = Form
const { Option } = Select
const border = {
    borderTopLeftRadius: '8px',
    borderTopRightRadius: '8px',
    borderBottomLeftRadius: '8px',
    borderBottomRightRadius: '8px',
}

const convertedValues = {}

class HostTable extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isModalVisible: false, selectProject: null,  selectCommand: null
    }
  }

  componentDidMount() {
    this.props.getProjectTableData()
    this.props.getHostTableData()
  }

  render() {
    return (
      <Fragment>
        <Table
          dataSource={this.props.hostTableData}
          loading={this.props.tableStatus}
          pagination={{ position: ['bottomCenter'] }}
          style={{ whiteSpace: 'pre'}}
          scroll={{ x: 1500, y: 750 }}
        >
          <Column title='Action' render={this.buttonGroup} fixed='left' align='center' width={150} />
          <Column title='SerialNumber' dataIndex='serialNumber' align='center' />
          <Column title='Host Name' dataIndex='hostName' align='center' width={180} />
          <Column title='Type' dataIndex='type' align='center' width={180} render={(data) => {return(<Tag>{data}</Tag>)}} />
          <Column title='Command' dataIndex='command' align='center' />
          <Column title='Message' dataIndex='response' align='center' />
          <Column title='Project' dataIndex={['Project', 'displayName']} align='center' width={150} />
          <Column title='Builded Device' dataIndex='Devices' key="Devices" align='center' width={150}
            render={(Devices) => Devices.map(c => c.deviceId+' ('+c.deviceName+')'+'\n').join('')} />
        </Table>
        <Modal
          visible={this.state.isModalVisible}
          onCancel={this.handleCancel}
          footer={null}
          destroyOnClose={true}
        >
          <Form size='large' layout='vertical' onFinish={this.onFinish}>
            <Item label='Please Input SerialNumber' name='serialNumber' rules={[this.rule('主機代號')]}>
              <Input
                defaultValue={
                  `${this.defaultValue(this.props.whichModal.serialNumber)}`
                }
              />
            </Item>
            <Item label='Please Input Host Name' name='hostName' rules={[this.rule('主機名稱')]}>
              <Input
                defaultValue={
                  `${this.defaultValue(this.props.whichModal.hostName)}`
                }
              />
            </Item>
            <Item label='Please Input Type' name='type'>
              <Input
                defaultValue={
                  `${this.defaultValue(this.props.whichModal.type)}`
                }
              />
            </Item>
            <Item label='Please Select Project to deploy' name='ProjectId'>
              <Select placeholder='Select a Project to deploy' onChange={this.handleSelectProject}
                defaultValue={this.defaultValue(this.props.whichModal.ProjectId)}>
                {this.props.projectTableData.map(c => {
                  return ( <Option key={c.id} value={c.id}>{`${c.project} (${c.displayName})`}</Option> )
                })}
              </Select>
            </Item>
            <Item label='Please Select Command' name='command'>
              <Select placeholder='Please select command to send' onChange={this.handleSelectCommand}
                defaultValue={this.defaultValue(this.props.whichModal.command)}>
                <Option value='deviceList?'>deviceList?</Option>
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

  handleSelectProject = (value) => {
    this.setState({ selectProject: value })
  }

  handleSelectCommand = (value) => {
    this.setState({ selectCommand: value })
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
      console.log('values: ', values)
      if (values.command) {
        var command = `${values.command}`
        var response = ''
      } else {
        var command = ''
        var response = ''
      }
      convertedValues.command = command
      convertedValues.response = response
      this.props.patchHostTableData(this.props.whichModal.id, convertedValues)
    } else {
      this.props.postHostTableData(convertedValues)
    }
  }

  buttonGroup = (text) => {
    return (
      <Space size={10}>
        <Popconfirm
          title='確定刪除?'
          onConfirm={() => { this.props.deleteHostTableData(text.id) }}
        >
          <Button style={ border } icon={<DeleteOutlined />} type='primary' danger />
        </Popconfirm>
        <Button
          style={ border }
          type='primary'
          onClick={() => { this.onClick(text) }}
          icon={<EditOutlined />}
        />
        <Button
          style={ border }
          type='primary'
          onClick={() => { this.props.postHostMQTT(text) }}
          icon={<DeploymentUnitOutlined />}
        />
      </Space>
    )
  }
}

const mapStateToProps = (state) => {
  //state指的是store裡的數據
  return {
    projectTableData: state.projectTableData,
    hostTableData: state.hostTableData,
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
    getHostTableData() {
      const action = GetHostTableData()
      dispatch(action)
    },
    deleteHostTableData(id) {
      const action = DeleteHostTableData(id)
      dispatch(action)
    },
    patchHostTableData(id, data) {
      const action = PatchHostTableData(id, data)
      dispatch(action)
    },
    postHostTableData(data) {
      const action = PostHostTableData(data)
      dispatch(action)
    },
    postHostMQTT(data) {
      const action = PostHostMQTT(data)
      dispatch(action)
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HostTable)