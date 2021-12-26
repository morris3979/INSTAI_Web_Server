import React from 'react'
import { connect } from 'react-redux'
import { Modal, Button, Input } from 'antd'
import {
  CHANGE_MAINTAIN_MODAL_INPUT_VALUE,
  CLOSE_MAINTAIN_MODAL_CANCEL,
  CLOSE_MAINTAIN_MODAL_OK,
  OPEN_MAINTAIN_MODAL
} from '../store/actionType'

const MaintainModal = (props) => {
  const {
    isMaintainModalVisible,
    openMaintainModal,
    closeMaintainModalOk,
    closeMaintainModalCancel,
    maintainModalInputValue,
    changeMaintainModalInputValue,
  } = props

  return (
    <>
      <div style={{ textAlign: 'center' }}>
        <Button onClick={openMaintainModal} >
          編輯
        </Button>
      </div>
      <Modal
        title='新增表單名稱'
        visible={isMaintainModalVisible}
        onOk={closeMaintainModalOk}
        onCancel={closeMaintainModalCancel}
      >
        <Input
          value={maintainModalInputValue}
          onChange={changeMaintainModalInputValue}
        />
      </Modal>
    </>
  )
}

const mapStateToProps = (state) => {
  //state指的是store裡的數據
  return {
    isMaintainModalVisible: state.isMaintainModalVisible,
    maintainModalInputValue: state.maintainModalInputValue
    //props裡的參數與store的數據對應關係
  }
}

const mapDispatchToProps = (dispatch) => {
  //dispatch指store.dispatch這個方法
  return {
    openMaintainModal() {
      const action = {
        type: OPEN_MAINTAIN_MODAL
      }
      dispatch(action)
    },
    closeMaintainModalOk() {
      const action = {
        type: CLOSE_MAINTAIN_MODAL_OK
      }
      dispatch(action)
    },
    closeMaintainModalCancel() {
      const action = {
        type: CLOSE_MAINTAIN_MODAL_CANCEL
      }
      dispatch(action)
    },
    changeMaintainModalInputValue(event) {
      const action = {
        type: CHANGE_MAINTAIN_MODAL_INPUT_VALUE,
        value: event.target.value
      }
      dispatch(action)
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MaintainModal)