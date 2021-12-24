import React from 'react'
import { connect } from 'react-redux'
import { Modal, Button, Form, Input } from 'antd'
import { CLOSE_MODAL, OPEN_MODAL } from '../store/actionType'

const TableModal = (props) => {
  const { isModalVisible, openModal, closeModal } = props

  return (
    <>
      <Button onClick={openModal} >
        新增表單
      </Button>
      <Modal title='新增表單名稱' visible={isModalVisible} onOk={closeModal} onCancel={closeModal}>
        <Form>

        </Form>
      </Modal>
    </>
  )
}

const mapStateToProps = (state) => {
  //state指的是store裡的數據
  return {
    isModalVisible: state.isModalVisible,
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
    closeModal() {
      const action = {
        type: CLOSE_MODAL
      }
      dispatch(action)
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TableModal)