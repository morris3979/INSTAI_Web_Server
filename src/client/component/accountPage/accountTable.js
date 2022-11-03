import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import {
  Table,
  Modal,
  Switch,
  Form,
  Button,
  Space,
  Popconfirm,
  Affix,
  Select,
} from 'antd'
import {
  GetProjectTableData,
  GetAccountTableData,
  SetWhichModal,
  PatchAccountTableData,
  DeleteAccountTableData
} from '../../store/actionCreater'
import RegisterForm from './registerForm'
import {
  CheckOutlined,
  CloseOutlined,
  EditOutlined,
  DeleteOutlined,
  PlusOutlined
} from '@ant-design/icons'

const { Column, ColumnGroup } = Table
const { Item } = Form

const convertedValues = {}

const developerStatus = (text) => {
  return(text.developer == true? <CheckOutlined />: <CloseOutlined />);
}

const adminStatus = (text) => {
  return(text.admin == true? <CheckOutlined />: <CloseOutlined />);
}

const userStatus = (text) => {
  return(text.user == true? <CheckOutlined />: <CloseOutlined />);
}

class AccountManageTable extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isChangeModalVisible: false,
      isRegisterModalVisible: false
    }
  }

  componentDidMount() {
    this.props.getAccountTableData()
    this.props.getProjectTableData()
  }

  render() {
    return (
      <Fragment>
        <Table
          dataSource={this.props.accountData}
          loading={this.props.tableStatus}
          pagination={{ position: ['bottomCenter'] }}
        >
          <Column title='操作' render={this.buttonGroup} align='center' width={150} />
          <Column title='帳號' dataIndex='username' align='center' />
          <ColumnGroup title='權限' align='center'>
            <Column title='developer' render={developerStatus} align='center' />
            <Column title='admin' render={adminStatus} align='center' />
            <Column title='user' render={userStatus} align='center' />
          </ColumnGroup>
          <Column title='所屬專案' dataIndex={['Project', 'displayName']} align='center' />
        </Table >
        <Modal
          visible={this.state.isChangeModalVisible}
          onCancel={this.handleCancel}
          footer={null}
          destroyOnClose={true}
        >
          <Form size='large' layout='vertical' onFinish={this.onFinish}>
            <Item label='developer' name='developer'
              hidden={!this.props.loginInformation.developer}
            >
              <Switch
                defaultChecked={this.props.whichModal.developer}
                disabled={!this.props.loginInformation.developer}
              />
            </Item>
            <Item label='admin' name='admin'>
              <Switch
                defaultChecked={this.props.whichModal.admin}
              />
            </Item>
            <Item label='user' name='user'>
              <Switch
                defaultChecked={this.props.whichModal.user}
              />
            </Item>
            <Item label='請選擇專案配置' name='ProjectId'>
              <Select placeholder='Select a Project to deploy' onChange={this.handleSelectProject}
                defaultValue={this.defaultValue(this.props.whichModal.ProjectId)}>
                {this.props.projectTableData.map(c => {
                  return ( <Option key={c.id} value={c.id}>{`${c.project} (${c.displayName})`}</Option> )
                })}
              </Select>
            </Item>
            <Item>
              <Button htmlType='submit' onClick={this.handleCancel}>
                確認
              </Button>
            </Item>
          </Form>
        </Modal>
        <Affix style={{ position: 'fixed', bottom: 10, right: 10 }}>
          <Button
            onClick={() => { this.onRegisterClick() }}
            icon={<PlusOutlined />}
            disabled={!(this.props.loginInformation.developer || this.props.loginInformation.admin)}
            size='large'
            shape='circle'
          />
        </Affix>
        <Modal
          visible={this.state.isRegisterModalVisible}
          onCancel={this.handleCancel}
          footer={null}
          destroyOnClose={true}
        >
          <RegisterForm />
        </Modal>
      </Fragment>
    )
  }

  handleSelectProject = (value) => {
    this.setState({ selectProject: value })
  }

  defaultValue = (value) => {
    if (this.props.whichModal.id > 0) {
      return (value)
    } else {
      return ('')
    }
  }

  onChangeClick = (text) => {
    this.setState({ isChangeModalVisible: true })
    this.props.setWhichModal(text)
  }

  onRegisterClick = () => {
    this.setState({ isRegisterModalVisible: true })
  }

  handleCancel = () => {
    this.setState({
      isChangeModalVisible: false,
      isRegisterModalVisible: false
    })
  }

  onFinish = (values) => {
    convertedValues.length == 0
    Object.keys(JSON.parse(JSON.stringify(values))).forEach((key) => {
      convertedValues[String(key)] = values[key]
    })
    this.props.patchAccountTableData(this.props.whichModal.id, convertedValues)
  }

  buttonGroup = (text) => {
    return (
      <Space size='large'>
        <Button
          onClick={() => { this.onChangeClick(text) }}
          icon={<EditOutlined />}
          disabled={!(this.props.loginInformation.developer || this.props.loginInformation.admin)}
        />
        <Popconfirm
          title='確定刪除?'
          onConfirm={() => { this.props.deleteAccountTableData(text) }}
        >
          <Button
            icon={<DeleteOutlined />}
            disabled={!(this.props.loginInformation.developer || this.props.loginInformation.admin)}
          />
        </Popconfirm>
      </Space>
    )
  }
}

const mapStateToProps = (state) => {
  //state指的是store裡的數據
  return {
    accountData: state.accountData,
    tableStatus: state.tableStatus,
    whichModal: state.whichModal,
    loginInformation: state.loginInformation,
    projectTableData: state.projectTableData,
  }
}

const mapDispatchToProps = (dispatch) => {
  //dispatch指store.dispatch這個方法
  return {
    setWhichModal(text) {
      const action = SetWhichModal(text)
      dispatch(action)
    },
    getAccountTableData() {
      const action = GetAccountTableData()
      dispatch(action)
    },
    patchAccountTableData(id, data) {
      const action = PatchAccountTableData(id, data)
      dispatch(action)
    },
    deleteAccountTableData(id) {
      const action = DeleteAccountTableData(id)
      dispatch(action)
    },
    getProjectTableData() {
      const action = GetProjectTableData()
      dispatch(action)
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountManageTable)