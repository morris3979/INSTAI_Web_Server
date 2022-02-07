import React, { Fragment } from 'react'
import { Modal, Button, Image } from 'antd'
import { connect } from 'react-redux'
import ReactPlayer from 'react-player/lazy'
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
      <Modal
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        destroyOnClose={true}
        width={690}
      >
        <Image
          src='http://localhost:8080/api/s3/files/4.jpg'
        />
        <ReactPlayer
          url='http://localhost:8080/api/s3/files/1.mp4'
          controls={true}
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