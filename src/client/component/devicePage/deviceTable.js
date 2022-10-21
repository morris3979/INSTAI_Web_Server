import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import {
    Popconfirm, Table, Button, Space, Modal, Form, Input, Select, Affix, Switch, Typography, Row, Col, InputNumber, Slider
} from 'antd'
import {
    EditOutlined,
    DeleteOutlined,
    PlusOutlined,
    DeploymentUnitOutlined
} from '@ant-design/icons'
import {
    SetWhichModal,
    GetModelListFromS3,
    GetHostTableData,
    GetDeviceTableData,
    DeleteDeviceTableData,
    PatchDeviceTableData,
    PostDeviceTableData,
    PostDeviceMQTT
} from '../../store/actionCreater'
import { mapValues } from 'async'

const { Column, ColumnGroup } = Table
const { Item } = Form
const { Option } = Select

const convertedValues = {}

class DeviceTable extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isModalVisible: false, isSelectMode: true,
      recVisible: true, REC: false, RECtime: false, RECfps: true,
      modeSelect: false, uploadServer: true, CNNEventVisible: true,
      rec_fps: 15, rec_after_event_cycle: 1, rec_after_event_duration: 5,
      rec_time: 5, upload2Server: true, rec_settings: false,
      selectHost: null, selectModel: null, selectAskStatus: null,
    }
  }

  componentDidMount() {
    this.props.getDeviceTableData()
    this.props.getModelListFromS3Data()
  }

  render() {
    return (
      <Fragment>
        <Table
          dataSource={this.props.deviceTableData}
          loading={this.props.tableStatus}
          pagination={{ position: ['bottomCenter'] }}
          style={{ whiteSpace: 'pre'}}
        >
          <Column title='操作' render={this.buttonGroup} align='center' width='10%' />
          <Column title='設備代號' dataIndex='deviceId' align='center' />
          <Column title='設備名稱' dataIndex='deviceName' align='center' />
          <Column title='設備描述' dataIndex='description' align='center' />
          <Column title='指令' dataIndex='command' align='center' />
          <Column title='訊息' dataIndex='message' align='center' />
          <ColumnGroup title="模型更新紀錄">
            <Column title='模型' dataIndex='HwUpdateLogs' key="HwUpdateLogs" align='center' width='15%'
              render={(HwUpdateLogs) => HwUpdateLogs.map(c => c.modelName+'\n').join('')} />
            <Column title='更新時間' dataIndex='HwUpdateLogs' key="HwUpdateLogs" align='center' width='10%'
              render={(HwUpdateLogs) => HwUpdateLogs.map(c => '('+c.createdAt.slice(0, -5).replace('T', ' ')+')'+'\n').join('')} />
          </ColumnGroup>
          <Column title='所屬主機' dataIndex={['Host', 'hostName']} align='center' />
        </Table>
        <Modal
          visible={this.state.isModalVisible}
          onCancel={this.handleCancel}
          footer={null}
          destroyOnClose={true}
        >
          <Typography id="modal-modal-title" variant="h6" component="h2">
            請選擇PAG7681功能
          </Typography>
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
            <Item label='請輸入設備描述' name='description'>
              <Input
                defaultValue={
                  `${this.defaultValue(this.props.whichModal.description)}`
                }
              />
            </Item>
            <Item label='請選擇主機配置' name='HostId'>
              <Select placeholder='Select a Host to deploy' onChange={this.handleSelectHost}
                defaultValue={this.defaultValue(this.props.whichModal.HostId)}>
                {this.props.hostTableData.map(c => {
                  return ( <Option key={c.id} value={c.id}>{`${c.serialNumber} (${c.hostName})`}</Option> )
                })}
              </Select>
            </Item>
            <Item label='請選擇指令' name='Command'>
              <Select placeholder='Select the command to ask' onChange={this.handleSelectAskStatus}>
                <Option value='reset'>reset</Option>
                <Option value='mode?'>mode?</Option>
                <Option value='fw_ver?'>fw_ver?</Option>
                <Option value='current_model?'>current_model?</Option>
                <Option value='UPDATE_MODEL;progress?'>UPDATE_MODEL;progress?</Option>
              </Select>
            </Item>
            <Item label='切換運作模式' name='Change_Mode'>
              <Switch onChange={this.handleSwitchMode}></Switch>
            </Item>
            <Item label='請選擇執行模式' name='modeSelect' disabled={this.state.isSelectMode} hidden={this.state.isSelectMode}>
              <Select placeholder='Select mode to change'
                      onChange={this.handleChange} disabled={this.state.isSelectMode} hidden={this.state.isSelectMode}>
                <Option value='CNN'>CNN</Option>
                <Option value='S_MOTION_CNN'>S_MOTION_CNN</Option>
                <Option value='S_MOTION_CNN_JPEG'>S_MOTION_CNN_JPEG</Option>
                <Option value='JPEG_REC'>JPEG_REC</Option>
                <Option value='JPEG_CNN'>JPEG_CNN</Option>
                <Option value='UPDATE_MODEL'>UPDATE_MODEL</Option>
              </Select>
            </Item>
            <Item label='請選擇可用模型' name='selectModel' disabled={!this.state.modeSelect} hidden={!this.state.modeSelect}>
              <Select placeholder='Select model to update' defaultValue={this.state.selectModel}
                      onChange={this.handleSelectModel} disabled={!this.state.modeSelect} hidden={!this.state.modeSelect}>
                {this.props.modelListData.map(c => {
                  return ( <Option key={c.id} value={c.modelName}>{c.modelName}</Option> )
                })}
              </Select>
            </Item>
            <Item label='相關參數配置' name='REC_Switch' hidden={this.state.recVisible}>
              <Switch
                disabled={this.state.recVisible}
                defaultChecked={false}
                onChange={this.handleSwitchParam}
                hidden={this.state.recVisible}
                value={this.state.rec_settings === 'boolean' ? this.state.rec_settings : false}
              />
            </Item>
            <Item label='CNN 事件觸發後是否開始錄影' name='Rec after Event' hidden={this.state.CNNEventVisible}>
              <Switch disabled={this.state.CNNEventVisible} hidden={this.state.CNNEventVisible}></Switch>
            </Item>
            <Item label='錄影時間(秒)' name='REC_Time' hidden={!this.state.RECtime}>
            <Row>
                <Col span={12}>
                  <Slider
                    disabled={!this.state.RECtime} hidden={!this.state.RECtime}
                    min={1} max={15} onChange={this.rec_time_onChange}
                    value={typeof this.state.rec_time === 'number' ? this.state.rec_time : 15}
                  />
                </Col>
                <Col span={4}>
                  <InputNumber
                    disabled={!this.state.RECtime} hidden={!this.state.RECtime}
                    min={1} max={15} style={{ margin: '0 12px', }}
                    value={this.state.rec_time}
                    onChange={this.rec_time_onChange}
                  />
                </Col>
              </Row>
              </Item>
            <Item label='錄影時每秒幀數(fps)' name='REC_FPS' hidden={this.state.RECfps}>
              <Row>
                <Col span={12}>
                  <Slider
                    disabled={this.state.RECfps} hidden={this.state.RECfps}
                    min={1} max={15} onChange={this.rec_fps_onChange}
                    value={typeof this.state.rec_fps === 'number' ? this.state.rec_fps : 15}
                  />
                </Col>
                <Col span={4}>
                  <InputNumber
                    disabled={this.state.RECfps} hidden={this.state.RECfps}
                    min={1} max={15} style={{ margin: '0 12px', }}
                    value={this.state.rec_fps}
                    onChange={this.rec_fps_onChange}
                  />
                </Col>
              </Row>
            </Item>
            <Item label='CNN 事件觸發後錄影循環次數' name='REC_after_event_cycle' hidden={this.state.CNNEventVisible}>
              <Row>
                <Col span={12}>
                  <Slider
                    disabled={this.state.CNNEventVisible} hidden={this.state.CNNEventVisible}
                    min={1} max={15} onChange={this.rec_after_event_cycle_onChange}
                    value={typeof this.state.rec_after_event_cycle === 'number' ? this.state.rec_after_event_cycle : 1}
                  />
                </Col>
                <Col span={4}>
                  <InputNumber
                    disabled={this.state.CNNEventVisible} hidden={this.state.CNNEventVisible}
                    min={1} max={15} style={{ margin: '0 12px', }}
                    value={this.state.rec_after_event_cycle}
                    onChange={this.rec_after_event_cycle_onChange}
                  />
                </Col>
              </Row>
            </Item>
            <Item label='CNN 事件觸發後每次循環時間長度' name='Cycle_Duration' hidden={this.state.CNNEventVisible}>
              <Row>
                <Col span={12}>
                  <Slider
                    disabled={this.state.CNNEventVisible} hidden={this.state.CNNEventVisible}
                    min={1} max={60} onChange={this.rec_after_event_duration_onChange}
                    value={typeof this.state.rec_after_event_duration === 'number' ? this.state.rec_after_event_duration : 5}
                  />
                </Col>
                <Col span={4}>
                  <InputNumber
                    disabled={this.state.CNNEventVisible} hidden={this.state.CNNEventVisible}
                    min={1} max={5} style={{ margin: '0 12px', }}
                    value={this.state.rec_after_event_duration}
                    onChange={this.rec_after_event_duration_onChange}
                  />
                </Col>
              </Row>
            </Item>
            <Item label='是否將錄製影片上傳至雲端' name='UPLOAD_DATA' hidden={this.state.uploadServer}>
              <Switch
                defaultChecked={true}
                hidden={this.state.uploadServer}
                value={this.state.upload2Server === 'boolean' ? this.state.upload2Server : true}
                onChange={this.upload2ServerChange}>
              </Switch>
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

  handleSelectModel = (value) => {
    this.setState({ selectModel: value })
  }

  handleSelectHost = (value) => {
    this.setState({ selectHost: value })
  }

  handleSelectAskStatus = (value) => {
    this.setState({ selectAskStatus: value })
  }

  handleCancel = () => {
    this.setState({ isModalVisible: false })
    this.setState({ isSelectMode: true })
    this.setState({ recVisible: true })
    this.setState({ CNNEventVisible: true })
    this.setState({ modeSelect: false })
    this.setState({ uploadServer: true })
    this.setState({ RECtime: false })
    this.setState({ RECfps: true })
    this.setState({ REC: false })
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
    // console.log('values: ', values)
    if (this.props.whichModal.id > 0) {
      // console.log('convertedValues: ', convertedValues)
      if (values.modeSelect === 'CNN' || values.modeSelect === 'S_MOTION_CNN') {
        var command = `${mapValues.modeSelect}`
        var message = ''
      }
      else if (values.modeSelect === 'S_MOTION_CNN_JPEG' || values.modeSelect === 'JPEG_REC') {
        if (this.state.rec_fps) {
          if (values.modeSelect === 'S_MOTION_CNN_JPEG') {
            var command = `mode: ${values.modeSelect},\n`+
                          `rec_after_event: ${this.changeValue(this.state.rec_settings)},\n`+
                          `rec_fps: ${this.state.rec_fps},\n`+
                          `rec_after_event_cycle: ${this.state.rec_after_event_cycle},\n`+
                          `rec_after_event_duration: ${this.state.rec_after_event_duration},\n`+
                          `upload_to_server: ${this.changeValue(this.state.upload2Server)}`
            var message = ''
          }
          else if (values.modeSelect === 'JPEG_REC') {
            var command = `mode: ${values.modeSelect},\n`+
                          `rec_fps: ${this.state.rec_fps},\n`+
                          `upload_to_server: ${this.changeValue(this.state.upload2Server)},\n`+
                          `rec: ${this.state.rec_time}`
            var message = ''
          }
        } else {
          Modal.error({
            title: '此FPS無效, 請重新輸入!',
            onOk: () => {
              message.destroy()
            }
          })
        }
     }
     else if (values.modeSelect == 'UPDATE_MODEL') {
      var command = `mode: ${values.modeSelect},\n`+
                    `model: ${this.state.selectModel}`
      var message = ''
     }
     else if (values.Command) {
      var command = values.Command
      var message = ''
     }
     else {
      var command = ''
      var message = ''
     }
    convertedValues.command = command
    convertedValues.message = message
    this.props.patchDeviceTableData(this.props.whichModal.id, convertedValues)
    } else {
      this.props.postDeviceTableData(convertedValues)
    }
  }
  rec_fps_onChange = (newValue) => {
    this.setState({ rec_fps: newValue })
  }
  rec_after_event_cycle_onChange = (newValue) => {
    this.setState({ rec_after_event_cycle: newValue })
  }
  rec_after_event_duration_onChange = (newValue) => {
    this.setState({ rec_after_event_duration: newValue })
  }
  rec_time_onChange = (newValue) => {
    this.setState({ rec_time: newValue })
  }
  upload2ServerChange  = (newValue) => {
    this.setState({ upload2Server: newValue })
  }

  handleSwitchParam = (value) => {
    if (value === true) {
      this.setState({ REC: true })
      this.setState({ CNNEventVisible: false })
      this.setState({ uploadServer: false })
      this.setState({ RECtime: false })
      this.setState({ RECfps: false })
      this.setState({ rec_settings: true})
    } else {
      this.setState({ REC: false })
      this.setState({ CNNEventVisible: true })
      this.setState({ uploadServer: true })
      this.setState({ RECtime: false })
      this.setState({ RECfps: true })
      this.setState({ rec_settings: false })
    }
  }

  handleSwitchMode = (value) => {
    if (value === true) {
      this.setState({ isSelectMode: false })
    } else {
      this.setState({ isSelectMode: true })
    }
  }

  handleChange = (value) => {
    console.log('handleChange: ', value)
    if (value === 'S_MOTION_CNN_JPEG') {
      this.setState({ RECtime: false })
      this.setState({ recVisible: false })
      if (this.state.REC === true) {
        this.setState({ CNNEventVisible: false })
        this.setState({ RECfps: false })
        this.setState({ modeSelect: false })
        this.setState({ uploadServer: false })
      } else {
        this.setState({ CNNEventVisible: true })
        this.setState({ RECfps: true })
        this.setState({ modeSelect: false })
        this.setState({ uploadServer: true })
      }
    } else if (value === 'JPEG_REC') {
      this.setState({ uploadServer: false })
      this.setState({ CNNEventVisible: true })
      this.setState({ RECfps: false })
      this.setState({ recVisible: true })
      this.setState({ modeSelect: false })
      this.setState({ RECtime: true })
    } else if (value === 'UPDATE_MODEL') {
      this.setState({ uploadServer: false })
      this.setState({ modeSelect: true })
      this.setState({ recVisible: true })
      this.setState({ CNNEventVisible: true })
      this.setState({ RECtime: false })
      this.setState({ RECfps: true })
    } else if (value === 'JPEG_CNN') {
      this.setState({ recVisible: true })
      this.setState({ CNNEventVisible: true })
      this.setState({ modeSelect: false })
      this.setState({ uploadServer: true })
      this.setState({ RECtime: false })
      this.setState({ RECfps: true })
    } else {
      this.setState({ recVisible: true })
      this.setState({ CNNEventVisible: true })
      this.setState({ modeSelect: false })
      this.setState({ uploadServer: true })
      this.setState({ RECtime: false })
      this.setState({ RECfps: true })
    }
  }

  changeValue = (value) => {
    if(value === true){
      return 'ON'
    }
    else if(value === false){
      return 'OFF'
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
    hostTableData: state.hostTableData,
    deviceTableData: state.deviceTableData,
    modelListData: state.modelListData,
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
    getModelListFromS3Data() {
      const action = GetModelListFromS3()
      dispatch(action)
    },
    getHostTableData() {
      const action = GetHostTableData()
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