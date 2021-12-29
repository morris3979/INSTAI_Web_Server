import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { Card, Button, Modal, Input } from 'antd'
import { EditOutlined } from '@ant-design/icons'
import {
  CHANGE_MAINTAIN_BOARD_CARD_MODAL_INPUT_VALUE,
  CLOSE_MAINTAIN_BOARD_CARD_MODAL_CANCEL,
  CLOSE_MAINTAIN_BOARD_CARD_MODAL_OK,
  OPEN_MAINTAIN_BOARD_CARD_MODAL
} from '../../store/actionType'

const MaintainBoardCard = (props) => {
  const {
    maintainBoardCardName,
    isMaintainBoardCardModalVisible,
    openMaintainBoardCardModal,
    closeMaintainBoardCardModalOk,
    closeMaintainBoardCardModalCancel,
    maintainModalInputValue,
    changeMaintainBoardCardModalInputValue
  } = props

  return (
    <Card
      title={maintainBoardCardName}
      extra={
        <Fragment>
          <Button
            icon={<EditOutlined />}
            size='large'
            onClick={openMaintainBoardCardModal}
          />
          <Modal
            title='修改名稱'
            visible={isMaintainBoardCardModalVisible}
            onOk={closeMaintainBoardCardModalOk}
            onCancel={closeMaintainBoardCardModalCancel}
          >
            <Input
              value={maintainModalInputValue}
              onChange={changeMaintainBoardCardModalInputValue}
            />
          </Modal>
        </Fragment>
      }
    >
    </Card>
  )
}

const mapStateToProps = (state) => {
  //state指的是store裡的數據
  return {
    maintainBoardCardName: state.maintainBoardCardName,
    isMaintainBoardCardModalVisible: state.isMaintainBoardCardModalVisible,
    maintainModalInputValue: state.maintainModalInputValue
    //props裡的參數與store的數據對應關係
  }
}

const mapDispatchToProps = (dispatch) => {
  //dispatch指store.dispatch這個方法
  return {
    openMaintainBoardCardModal() {
      const action = {
        type: OPEN_MAINTAIN_BOARD_CARD_MODAL
      }
      dispatch(action)
    },
    closeMaintainBoardCardModalOk() {
      const action = {
        type: CLOSE_MAINTAIN_BOARD_CARD_MODAL_OK
      }
      dispatch(action)
    },
    closeMaintainBoardCardModalCancel() {
      const action = {
        type: CLOSE_MAINTAIN_BOARD_CARD_MODAL_CANCEL
      }
      dispatch(action)
    },
    changeMaintainBoardCardModalInputValue(event) {
      const action = {
        type: CHANGE_MAINTAIN_BOARD_CARD_MODAL_INPUT_VALUE,
        value: event.target.value
      }
      dispatch(action)
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MaintainBoardCard)