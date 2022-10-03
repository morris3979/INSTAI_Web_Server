import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import {
    Popconfirm, Table, Button, Space, Modal, Form, Input, Select, Affix, Switch, Typography
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
import { mapValues } from 'async'

const { Column } = Table
const { Item } = Form
const { Option } = Select

const convertedValues = {}

class DeviceTable extends Component {
  constructor(props) {
    super(props)
    this.state = { isModalVisible: false , isSelectVisible:true ,detailvisible : true , recvisible : true , REC:false , detailvisible2:false , 
                   modelselect:false , Uploadserver:true,Settings:false,RECtime:false,RECfps:true}
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
          style={{ whiteSpace: 'pre'}}
        >
          <Column title='操作' render={this.buttonGroup} align='center' />
          <Column title='設備代號' dataIndex='deviceId' align='center' />
          <Column title='設備名稱' dataIndex='deviceName' align='center' />
          <Column title='設備描述' dataIndex='description' align='center' />
          <Column title='指令' dataIndex='command' align='center' />
          <Column title='訊息' dataIndex='message' align='center' />
          <Column title='模型更新紀錄 (模型, 更新時間)' dataIndex='HwUpdateLogs' key="HwUpdateLogs" align='center'
            render={(HwUpdateLogs) => HwUpdateLogs.map(c => c.modelName+', '+c.createdAt.slice(0, -5).replace('T', ' ')+'\n').join('')} />
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
            <Item label='請輸入設備描述' name='description' rules={[this.rule('設備描述')]}>
              <Input
                defaultValue={
                  `${this.defaultValue(this.props.whichModal.description)}`
                }
              />
            </Item>
            <Item label='切換運作模式' name='Change_Model'>
              <Switch onChange={this.handleswitch2}></Switch>
            </Item>
            <Item label='請選擇PAG7681模式' name='modelselect' disabled={this.state.isSelectVisible} hidden={this.state.isSelectVisible}>
              <Select onChange={this.handlechange} disabled={this.state.isSelectVisible} hidden={this.state.isSelectVisible}>
                <Option value='CNN'>CNN</Option>
                <Option value='S_MOTION_CNN'>S_MOTION_CNN</Option>
                <Option value='S_MOTION_CNN_JPEG'>S_MOTION_CNN_JPEG</Option>
                <Option value='JPEG_REC'>JPEG_REC</Option>
                <Option value='JPEG_CNN'>JPEG_CNN</Option>
                <Option value='UPDATE_MODEL'>UPDATE_MODEL</Option>
              </Select>
            </Item>
            <Item label='可用模型' name='selectmodel' disabled={!this.state.modelselect} hidden={!this.state.modelselect}>
              <Select onChange={this.handleselect} disabled={!this.state.modelselect} hidden={!this.state.modelselect}>
                <Option value='0615CNNFit_pad_CNNInit.bin'>0615CNNFit_pad_CNNInit.bin</Option>
                <Option value='0719CNNFit_pad_CNNInit.bin'>0719CNNFit_pad_CNNInit.bin</Option>
                <Option value='CNNFit_20210223_PDFD_BW_400K.bin'>CNNFit_20210223_PDFD_BW_400K.bin</Option>
                <Option value='CNNFit_20210223_PDFD_BW.bin'>CNNFit_20210223_PDFD_BW.bin</Option>
              </Select>
            </Item>
            <Item label='切換運作模式' name='REC_switch' hidden={this.state.recvisible}>
              <Switch disabled={this.state.recvisible} defaultChecked={false} onChange={this.handleswitch} hidden={this.state.recvisible}></Switch>
            </Item>
            <Item label='CNN 事件觸發後是否開始錄影' name='Rec after Event' hidden={this.state.detailvisible}>
              <Switch disabled={this.state.detailvisible} hidden={this.state.detailvisible}></Switch>
            </Item>
            <Item label='錄影時間(秒)' name='REC_Time' hidden={!this.state.RECtime}>
              <Input disabled={!this.state.RECtime} hidden={!this.state.RECtime}></Input>
            </Item>
            <Item label='錄影時每秒幀數 FPS' name='REC_FPS' hidden={this.state.RECfps}>
              <Input disabled={this.state.RECfps} hidden={this.state.RECfps} defaultValue={`${'15'}`}></Input>
            </Item>
            <Item label='CNN 事件觸發後錄影循環次數' name='REC_after_event_cycle' hidden={this.state.detailvisible}>
              <Input disabled={this.state.detailvisible} hidden={this.state.detailvisible} defaultValue={1}></Input>
            </Item>
            <Item label='CNN 事件觸發後每次循環時間長度 ' name='Cycle_Duration' hidden={this.state.detailvisible}>
              <Input disabled={this.state.detailvisible} hidden={this.state.detailvisible} defaultValue={5}></Input>
            </Item>
            <Item label='是否將錄製影片上傳至雲端' name='UPLOAD_DATA' hidden={this.state.Uploadserver}>
              <Switch defaultChecked={true} hidden={this.state.Uploadserver}></Switch>
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
    this.setState({ isSelectVisible: true })
    this.setState({ recvisible:true})
    this.setState({ detailvisible :true})
    this.setState({ detailvisible2:false})
    this.setState({ modelselect:false})
    this.setState({ Uploadserver:true})
    this.setState({ Settings:false})
    this.setState({ RECtime:false})
    this.setState({ RECfps:true})
    this.setState({ REC:false})
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
      //this.props.patchDeviceTableData(this.props.whichModal.id, convertedValues)
      if(values.modelselect==='CNN'||values.modelselect==='S_MOTION_CNN'){
        var command = `"${mapValues.modelselect}"`
      }
      else if(values.modelselect==='S_MOTION_CNN_JPEG'||values.modelselect==='JPEG_REC'){
        if(values.REC_FPS<16&&values.REC_FPS>0){
          if(values.modelselect==='S_MOTION_CNN_JPEG'){
            var command = `"rec_after_event;${values.REC_switch}\\\\rec_fps;${values.REC_FPS}\\\\rec_after_event_cycle;${values.REC_after_event_cycle}\\\\rec_after_event_duration;${values.Cycle_Duration}\\\\upload_to_server;${values.UPLOAD_DATA}"`
          }
          else if(values.modelselect==='JPEG_REC'){
            var command = `"rec_fps;${values.REC_FPS}\\\\upload_to_server;${values.UPLOAD_DATA}\\\\rec;${values.REC_Time}"`
          }
        }
        else{
          Modal.error({
            title: '此FPS無效，請重新輸入!',
            onOk: () => {
              message.destroy()
            }
          })
        }
     }else{
      console.log(values)
     }
     Modal.success({
      title:'指令傳送成功 ! ',
      content:`${command}`
    })
    } else {
      //this.props.postDeviceTableData(convertedValues)
    }
  }
  handleswitch = (value) => {
    if(value === true){
      this.setState({REC:true})  
      this.setState({ detailvisible:false})
      this.setState({ Uploadserver:false })
      this.setState({ RECtime:false})
      this.setState({ RECfps:false})
    }
    else{
      this.setState({ REC:false})
      this.setState({ detailvisible:true})
      this.setState({ Uploadserver:true})
      this.setState({ RECtime:false})
      this.setState({ RECfps:true})
    }
  }
  handleswitch2 = (value) => {
    if(value === true){
      this.setState({isSelectVisible:false})
    }
    else{
      this.setState({isSelectVisible:true})
    }
  }
  handlechange = (value) => {
    console.log(value)
    if(value === 'S_MOTION_CNN_JPEG'){
      this.setState({RECtime:false})
      this.setState({ recvisible:false})
      this.setState({ Settings:true})
      if(this.state.REC === true){
        this.setState({ detailvisible:false})
        this.setState({ RECfps:false})
        this.setState({ modelselect:false})
        this.setState({ Uploadserver:false})
      }
      else{
        this.setState({ detailvisible:true})
        this.setState({ RECfps:true})
        this.setState({ modelselect:false})
        this.setState({ Uploadserver:true})
      }
    }
    else if(value === 'JPEG_REC'){
      this.setState({ Uploadserver:false})
      this.setState({ Settings:true})
      this.setState({ detailvisible2:true})
      this.setState({ detailvisible:true})
      this.setState({ RECfps:false})
      this.setState({ recvisible:true})
      this.setState({ modelselect:false})
      this.setState({ RECtime:true})
    }
    else if(value === 'UPDATE_MODEL'){
      this.setState({ Uploadserver:false})
      this.setState({ Settings:true})
      this.setState({ modelselect:true})
      this.setState({ recvisible:true})
      this.setState({ detailvisible :true})
      this.setState({ detailvisible2:false})
      this.setState({ RECtime:false})
      this.setState({ RECfps:true})
    }
    else if(value === 'JPEG_CNN'){
      this.setState({ recvisible:true})
      this.setState({ detailvisible :true})
      this.setState({ detailvisible2:false})
      this.setState({ modelselect:false})
      this.setState({ Uploadserver:true})
      this.setState({ Settings:true})
      this.setState({ RECtime:false})
      this.setState({ RECfps:true})
    }
    else{
      this.setState({ recvisible:true})
      this.setState({ detailvisible :true})
      this.setState({ detailvisible2:false})
      this.setState({ modelselect:false})
      this.setState({ Uploadserver:true})
      this.setState({ Settings:false})
      this.setState({ RECtime:false})
      this.setState({ RECfps:true})
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