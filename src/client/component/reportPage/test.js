import React, { Fragment } from 'react'
import { Modal, Button, Image } from 'antd'
import { connect } from 'react-redux'
import {
  ShowModal,
  CloseModalOk,
  CloseModalCancel
} from '../../store/actionCreater'

const Test = (props) => {
  const {
    isModalVisible,
    onClick,
    handleOk,
    handleCancel
  } = props

  return (
    <Fragment>
      <Button onClick={onClick}>
        Open Modal
      </Button>
      <Modal visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <Image
          src='https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
        />
      </Modal>
    </Fragment>
  )
}

const mapStateToProps = (state) => {
  //state指的是store裡的數據
  return {
    isModalVisible: state.isModalVisible
  }
}

const mapDispatchToProps = (dispatch) => {
  //dispatch指store.dispatch這個方法
  return {
    onClick() {
      const action = ShowModal()
      dispatch(action)
    },
    handleOk() {
      const action = CloseModalOk()
      dispatch(action)
    },
    handleCancel() {
      const action = CloseModalCancel()
      dispatch(action)
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Test)