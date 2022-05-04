import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import {
  Table, Modal, Switch, Form, Button, Space, Popconfirm
} from 'antd'
import {
  GetAccountTableData, SetWhichModal, PatchAccountTableData,
  DeleteAccountTableData
} from '../../store/actionCreater'
import {
  CheckOutlined, CloseOutlined, EditOutlined, DeleteOutlined
} from '@ant-design/icons'

const { Column, ColumnGroup } = Table
const { Item } = Form

const convertedValues = {}

const adminStatus = (text) => {
  if (text.admin == true) {
    return (
      <CheckOutlined />
    )
  } else {
    return (
      <CloseOutlined />
    )
  }
}

const modelAStatus = (text) => {
  if (text.authA == true) {
    return (
      <CheckOutlined />
    )
  } else {
    return (
      <CloseOutlined />
    )
  }
}

const modelBStatus = (text) => {
  if (text.authB == true) {
    return (
      <CheckOutlined />
    )
  } else {
    return (
      <CloseOutlined />
    )
  }
}

const modelCStatus = (text) => {
  if (text.authC == true) {
    return (
      <CheckOutlined />
    )
  } else {
    return (
      <CloseOutlined />
    )
  }
}

class AccountManageTable extends Component {
  constructor(props) {
    super(props)
    this.state = { isModalVisible: false }
  }

  componentDidMount() {
    this.props.getAccountTableData()
  }

  render() {
    return (
      <Fragment>
        <Table
          dataSource={this.props.accountData}
          loading={this.props.tableStatus}
        >
          <Column title='帳號' dataIndex='username' align='center' />
          <ColumnGroup title='權限' align='center'>
            <Column title='admin' render={adminStatus} align='center' />
            <Column title='modelA' render={modelAStatus} align='center' />
            <Column title='modelB' render={modelBStatus} align='center' />
            <Column title='modelC' render={modelCStatus} align='center' />
            <Column title='操作' render={this.buttonGroup} align='center' />
          </ColumnGroup>
        </Table >
        <Modal
          visible={this.state.isModalVisible}
          onCancel={this.handleCancel}
          footer={null}
          destroyOnClose={true}
        >
          <Form size='large' layout='vertical' onFinish={this.onFinish}>
            <Item label='admin' name='admin'>
              <Switch
                defaultChecked={this.props.whichModal.admin}
              />
            </Item>
            <Item label='modelA' name='authA'>
              <Switch
                defaultChecked={this.props.whichModal.authA}
              />
            </Item>
            <Item label='modelB' name='authB'>
              <Switch
                defaultChecked={this.props.whichModal.authB}
              />
            </Item>
            <Item label='modelC' name='authC'>
              <Switch
                defaultChecked={this.props.whichModal.authC}
              />
            </Item>
            <Item>
              <Button htmlType='submit' onClick={this.handleCancel}>
                確認
              </Button>
            </Item>
          </Form>
        </Modal>
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

  onFinish = (values) => {
    Object.keys(JSON.parse(JSON.stringify(values))).forEach((key) => {
      convertedValues[String(key)] = values[key]
    })
    this.props.patchAccountTableData(this.props.whichModal.id, convertedValues)
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
          onConfirm={() => { this.props.deleteAccountTableData(text.id) }}
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
    accountData: state.accountData,
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
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountManageTable)