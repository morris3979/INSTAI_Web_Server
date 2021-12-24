import React from 'react'
import { connect } from 'react-redux'
import { Modal, Button, Form, Input } from 'antd'
import {
  CHANGE_INPUT_VALUE,
  CLOSE_MODAL_CANCEL,
  CLOSE_MODAL_OK,
  OPEN_MODAL
} from '../store/actionType'

const TableModal = (props) => {
  const {
    isModalVisible,
    openModal,
    closeModalOk,
    closeModalCancel,
    inputValue,
    changeInputValue,
  } = props

  return (
    <>
      <Button onClick={openModal} >
        新增表單
      </Button>
      <Modal
        title='新增表單名稱'
        visible={isModalVisible}
        onOk={closeModalOk}
        onCancel={closeModalCancel}
      >
        <Input
          value={inputValue}
          onChange={changeInputValue}
        />
      </Modal>
    </>
  )
}

const mapStateToProps = (state) => {
  //state指的是store裡的數據
  return {
    isModalVisible: state.isModalVisible,
    inputValue: state.inputValue
    //props裡的參數與store的數據對應關係
  }
}

const mapDispatchToProps = (dispatch) => {
  //dispatch指store.dispatch這個方法
  return {
    openModal() {
      const action = {
        type: OPEN_MODAL
      }
      dispatch(action)
    },
    closeModalOk() {
      const action = {
        type: CLOSE_MODAL_OK
      }
      dispatch(action)
    },
    closeModalCancel() {
      const action = {
        type: CLOSE_MODAL_CANCEL
      }
      dispatch(action)
    },
    changeInputValue(event) {
      const action = {
        type: CHANGE_INPUT_VALUE,
        value: event.target.value
      }
      dispatch(action)
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TableModal)