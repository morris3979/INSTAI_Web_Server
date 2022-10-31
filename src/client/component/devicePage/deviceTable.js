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
    Switch,
    Typography,
    Row,
    Col,
    InputNumber,
    Slider
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

const { Column, ColumnGroup } = Table
const { Item } = Form
const { Option } = Select

const convertedValues = {}

class DeviceTable extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isModalVisible: false, isSelectMode: false,
      modeSelect: false, modelVisible: false,
      relatedParamsVisible: false, related_params_switch: false,
      recTimeVisible: false, recFpsVisible: false,
      cnnEventTriggerVisible: false, recAfterEventVisible: false,
      rec_after_event_switch: false, rec_after_event_duration: 5,
      rec_fps: 15, rec_after_event_cycle: 1, rec_time: 5,
      uploadPicturesVisible: false, upload_all_pictures_switch: true,
      uploadServerVisible: false, upload_all_files_switch: true,
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
          scroll={{ x: 2000, y: 750 }}
        >
          <Column title='操作' render={this.buttonGroup} fixed='left' align='center' width={150} />
          <Column title='設備代號' dataIndex='deviceId' align='center' width={150} />
          <Column title='設備名稱' dataIndex='deviceName' align='center' width={150} />
          <Column title='設備描述' dataIndex='description' align='center' width={150} />
          <Column title='指令' dataIndex='command' align='center' />
          <Column title='訊息' dataIndex='message' align='center' />
          <ColumnGroup title="模型更新紀錄">
            <Column title='模型' dataIndex='HwUpdateLogs' key="HwUpdateLogs" align='center'
              render={(HwUpdateLogs) => HwUpdateLogs.map(c => c.modelName+'\n').join('')} />
            <Column title='更新時間' dataIndex='HwUpdateLogs' key="HwUpdateLogs" align='center' width={180}
              render={(HwUpdateLogs) => HwUpdateLogs.map(c => '('+c.createdAt.slice(0, -5).replace('T', ' ')+')'+'\n').join('')} />
          </ColumnGroup>
          <Column title='所屬主機' dataIndex={['Host', 'hostName']} align='center' width={180} />
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
              <Select placeholder='Please select command to send' onChange={this.handleSelectAskStatus}>
                <Option value='reset'>reset</Option>
                <Option value='mode?'>mode?</Option>
                <Option value='fw_ver?'>fw_ver?</Option>
                <Option value='progress?'>progress?</Option>
                <Option value='current_model?'>current_model?</Option>
              </Select>
            </Item>
            <Item label='切換運作模式' name='Change_Mode'>
              <Switch onChange={this.handleOperationModeSwitch}></Switch>
            </Item>
            <Item label='請選擇執行模式' name='modeSelect' disabled={!this.state.isSelectMode} hidden={!this.state.isSelectMode}>
              <Select placeholder='Please select mode to change'
                      onChange={this.onChangeSelectMode} disabled={!this.state.isSelectMode} hidden={!this.state.isSelectMode}>
                <Option value='CNN'>CNN</Option>
                <Option value='S_MOTION_CNN'>S_MOTION_CNN</Option>
                <Option value='S_MOTION_CNN_JPEG'>S_MOTION_CNN_JPEG</Option>
                <Option value='JPEG_REC'>JPEG_REC</Option>
                <Option value='CNN_JPEG'>CNN_JPEG</Option>
                <Option value='CONT_JPEG_CNN'>CONT_JPEG_CNN</Option>
                <Option value='UPDATE_MODEL'>UPDATE_MODEL</Option>
              </Select>
            </Item>
            <Item label='請選擇可用模型' name='selectModel' disabled={!this.state.modelVisible} hidden={!this.state.modelVisible}>
              <Select placeholder='Please select model to update' defaultValue={this.state.selectModel}
                      onChange={this.handleSelectModel} disabled={!this.state.modelVisible} hidden={!this.state.modelVisible}>
                {this.props.modelListData.map(c => {
                  return ( <Option key={c.id} value={c.modelName}>{c.modelName}</Option> )
                })}
              </Select>
            </Item>
            <Item label='相關參數配置' name='related_params' hidden={!this.state.relatedParamsVisible}>
              <Switch
                disabled={!this.state.relatedParamsVisible}
                hidden={!this.state.relatedParamsVisible}
                defaultChecked={false}
                onChange={this.handleRelatedParamsSwitch}
                value={this.state.related_params_switch}
              />
            </Item>
            <Item label='CNN 事件觸發後是否開始錄影' name='rec_after_event' hidden={!this.state.recAfterEventVisible}>
              <Switch
                disabled={!this.state.recAfterEventVisible}
                hidden={!this.state.recAfterEventVisible}
                defaultChecked={false}
                onChange={this.handleRecAfterEventSwitch}
                value={this.state.rec_after_event_switch}
              />
            </Item>
            <Item label='錄影時間(秒)' name='rec_time' hidden={!this.state.recTimeVisible}>
            <Row>
                <Col span={12}>
                  <Slider
                    disabled={!this.state.recTimeVisible} hidden={!this.state.recTimeVisible}
                    min={1} max={60} onChange={this.rec_time_onChange}
                    value={typeof this.state.rec_time === 'number' ? this.state.rec_time : 15}
                  />
                </Col>
                <Col span={4}>
                  <InputNumber
                    disabled={!this.state.recTimeVisible} hidden={!this.state.recTimeVisible}
                    min={1} max={60} style={{ margin: '0 12px', }}
                    value={this.state.rec_time}
                    onChange={this.rec_time_onChange}
                  />
                </Col>
              </Row>
            </Item>
            <Item label='錄影時每秒幀數(fps)' name='rec_fps' hidden={!this.state.recFpsVisible}>
              <Row>
                <Col span={12}>
                  <Slider
                    disabled={!this.state.recFpsVisible} hidden={!this.state.recFpsVisible}
                    min={1} max={15} onChange={this.rec_fps_onChange}
                    value={typeof this.state.rec_fps === 'number' ? this.state.rec_fps : 15}
                  />
                </Col>
                <Col span={4}>
                  <InputNumber
                    disabled={!this.state.recFpsVisible} hidden={!this.state.recFpsVisible}
                    min={1} max={15} style={{ margin: '0 12px', }}
                    value={this.state.rec_fps}
                    onChange={this.rec_fps_onChange}
                  />
                </Col>
              </Row>
            </Item>
            <Item label='CNN 事件觸發後錄影循環次數' name='rec_after_event_cycle' hidden={!this.state.cnnEventTriggerVisible}>
              <Row>
                <Col span={12}>
                  <Slider
                    disabled={!this.state.cnnEventTriggerVisible} hidden={!this.state.cnnEventTriggerVisible}
                    min={1} max={15} onChange={this.rec_after_event_cycle_onChange}
                    value={typeof this.state.rec_after_event_cycle === 'number' ? this.state.rec_after_event_cycle : 1}
                  />
                </Col>
                <Col span={4}>
                  <InputNumber
                    disabled={!this.state.cnnEventTriggerVisible} hidden={!this.state.cnnEventTriggerVisible}
                    min={1} max={15} style={{ margin: '0 12px', }}
                    value={this.state.rec_after_event_cycle}
                    onChange={this.rec_after_event_cycle_onChange}
                  />
                </Col>
              </Row>
            </Item>
            <Item label='CNN 事件觸發後每次循環時間長度' name='rec_after_event_duration' hidden={!this.state.cnnEventTriggerVisible}>
              <Row>
                <Col span={12}>
                  <Slider
                    disabled={!this.state.cnnEventTriggerVisible} hidden={!this.state.cnnEventTriggerVisible}
                    min={1} max={60} onChange={this.rec_after_event_duration_onChange}
                    value={typeof this.state.rec_after_event_duration === 'number' ? this.state.rec_after_event_duration : 5}
                  />
                </Col>
                <Col span={4}>
                  <InputNumber
                    disabled={!this.state.cnnEventTriggerVisible} hidden={!this.state.cnnEventTriggerVisible}
                    min={1} max={60} style={{ margin: '0 12px', }}
                    value={this.state.rec_after_event_duration}
                    onChange={this.rec_after_event_duration_onChange}
                  />
                </Col>
              </Row>
            </Item>
            <Item label='是否將所有圖片上傳' name='upload_all_pictures' hidden={!this.state.uploadPicturesVisible}>
              <Switch
                defaultChecked={true}
                hidden={!this.state.uploadPicturesVisible}
                value={this.state.upload_all_pictures_switch === 'boolean' ? this.state.upload_all_pictures_switch : true}
                onChange={this.uploadAllPics2ServerChange}>
              </Switch>
            </Item>
            <Item label='是否將採集資料上傳至雲端' name='upload_all_files' hidden={!this.state.uploadServerVisible}>
              <Switch
                defaultChecked={true}
                hidden={!this.state.uploadServerVisible}
                value={this.state.upload_all_files_switch === 'boolean' ? this.state.upload_all_files_switch : true}
                onChange={this.uploadAll2ServerChange}>
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

  uploadAll2ServerChange  = (newValue) => {
    this.setState({ upload_all_files_switch: newValue })
  }

  uploadAllPics2ServerChange  = (newValue) => {
    this.setState({ upload_all_pictures_switch: newValue })
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
    this.setState({
      isModalVisible: false, isSelectMode: false, relatedParamsVisible: false,
      recAfterEventVisible: false, cnnEventTriggerVisible: false, modeSelect: false,
      modelVisible: false, recTimeVisible: false, recFpsVisible: false,
      uploadPicturesVisible: false, uploadServerVisible: false
    })
  }

  handleOperationModeSwitch = (value) => {
    this.setState({
      isSelectMode: value, relatedParamsVisible: false, recFpsVisible: false,
      recAfterEventVisible: false, cnnEventTriggerVisible: false,
      uploadPicturesVisible: false, uploadServerVisible: false
    })
  }

  handleRelatedParamsSwitch = (value) => {
    if (value == true) {
      this.setState({
        related_params_switch: true,
        recAfterEventVisible: true, recTimeVisible: false,
        recFpsVisible: false, cnnEventTriggerVisible: false,
        uploadPicturesVisible: true, uploadServerVisible: true
      })
    } else {
      this.setState({
        related_params_switch: false,
        recAfterEventVisible: false, recTimeVisible: false,
        recFpsVisible: false, cnnEventTriggerVisible: false,
        uploadPicturesVisible: false, uploadServerVisible: false
      })
    }
  }

  handleRecAfterEventSwitch = (value) => {
    if (value == true) {
      this.setState({
        rec_after_event_switch: true,
        recAfterEventVisible: true, rec_after_event_switch: true,
        recTimeVisible: false, recFpsVisible: true, cnnEventTriggerVisible: true,
        uploadPicturesVisible: true, uploadServerVisible: true
      })
    } else {
      this.setState({
        rec_after_event_switch: false,
        recAfterEventVisible: true, rec_after_event_switch: false,
        recTimeVisible: false, recFpsVisible: false, cnnEventTriggerVisible: false,
        uploadPicturesVisible: true, uploadServerVisible: true
      })
    }
  }

  onChangeSelectMode = (value) => {
    // console.log('SelectMode: ', value)
    if (value == 'S_MOTION_CNN_JPEG') {
      this.setState({
        modeSelect: true, modelVisible: false, relatedParamsVisible: true,
        related_params_switch: false, recAfterEventVisible: false,
        recTimeVisible: false, recFpsVisible: false, cnnEventTriggerVisible: false,
        uploadPicturesVisible: false, uploadServerVisible: false
      })
    } else if (value == 'JPEG_REC') {
      this.setState({
        modeSelect: false, modelVisible: false, relatedParamsVisible: false,
        related_params_switch: false, recAfterEventVisible: false,
        recTimeVisible: true, recFpsVisible: true, cnnEventTriggerVisible: false,
        uploadPicturesVisible: true, uploadServerVisible: true
      })
    } else if (value == 'UPDATE_MODEL') {
      this.setState({
        modeSelect: false, modelVisible: true, relatedParamsVisible: false,
        related_params_switch: false, recAfterEventVisible: false,
        recTimeVisible: false, recFpsVisible: false, cnnEventTriggerVisible: false,
        uploadPicturesVisible: false, uploadServerVisible: true
      })
    } else if (value == 'CNN_JPEG' || value == 'CONT_JPEG_CNN') {
      this.setState({
        modeSelect: false, modelVisible: false, relatedParamsVisible: false,
        related_params_switch: false, recAfterEventVisible: false,
        recTimeVisible: false, recFpsVisible: false, cnnEventTriggerVisible: false,
        uploadPicturesVisible: false, uploadServerVisible: true
      })
    } else {
      this.setState({
        modeSelect: false, modelVisible: false, relatedParamsVisible: false,
        related_params_switch: false, recAfterEventVisible: false,
        recTimeVisible: false, recFpsVisible: false, cnnEventTriggerVisible: false,
        uploadPicturesVisible: false, uploadServerVisible: false
      })
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
      if (values.modeSelect == 'CNN' || values.modeSelect == 'S_MOTION_CNN') {
        var command = `mode: ${values.modeSelect}`
        var message = ''
      }
      else if (values.modeSelect == 'S_MOTION_CNN_JPEG' || values.modeSelect == 'JPEG_REC') {
        if (this.state.rec_fps) {
          if (values.modeSelect == 'S_MOTION_CNN_JPEG') {
            const rec_value = this.state.rec_after_event_switch == true ?
                              `rec_fps: ${this.state.rec_fps},\n`+
                              `rec_after_event_cycle: ${this.state.rec_after_event_cycle},\n`+
                              `rec_after_event_duration: ${this.state.rec_after_event_duration},\n` : ''
            var command = `mode: ${values.modeSelect},\n`+
                          `rec_after_event_switch: ${this.changeValue(this.state.rec_after_event_switch)},\n`+
                          rec_value+
                          `upload_all_pics: ${this.changeValue(this.state.upload_all_pictures_switch)},\n`+
                          `upload_to_server: ${this.changeValue(this.state.upload_all_files_switch)}`
            var message = ''
          }
          else if (values.modeSelect == 'JPEG_REC') {
            var command = `mode: ${values.modeSelect},\n`+
                          `rec_fps: ${this.state.rec_fps},\n`+
                          `upload_all_pics: ${this.changeValue(this.state.upload_all_pictures_switch)},\n`+
                          `upload_to_server: ${this.changeValue(this.state.upload_all_files_switch)},\n`+
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
     else if (values.modeSelect == 'CNN_JPEG' || values.modeSelect == 'CONT_JPEG_CNN') {
      var command = `mode: ${values.modeSelect},\n`+
                    `upload_to_server: ${this.changeValue(this.state.upload_all_files_switch)}`
      var message = ''

     }
     else if (values.modeSelect == 'UPDATE_MODEL') {
      var command = `mode: ${values.modeSelect},\n`+
                    `upload_to_server: ${this.changeValue(this.state.upload_all_files_switch)},\n`+
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

  buttonGroup = (text) => {
    return (
      <Space size={10}>
        <Button
          onClick={() => { this.props.postDeviceMQTT(text) }}
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
    postDeviceMQTT(data) {
      const action = PostDeviceMQTT(data)
      dispatch(action)
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DeviceTable)