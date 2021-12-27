import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { Card, Button, Modal, Input } from 'antd'
import { EditOutlined } from '@ant-design/icons'
import {
  CHANGE_MAINTAIN_CAR_CARD_MODAL_INPUT_VALUE,
  CLOSE_MAINTAIN_CAR_CARD_MODAL_CANCEL,
  CLOSE_MAINTAIN_CAR_CARD_MODAL_OK,
  OPEN_MAINTAIN_CAR_CARD_MODAL
} from '../../store/actionType'

const MaintainCarCard = (props) => {
  const {
    maintainCarCardName,
    isMaintainCarCardModalVisible,
    openMaintainCarCardModal,
    closeMaintainCarCardModalOk,
    closeMaintainCarCardModalCancel,
    maintainModalInputValue,
    changeMaintainCarCardModalInputValue
  } = props

  return (
    <Card
      title={maintainCarCardName}
      extra={
        <Fragment>
          <Button
            icon={<EditOutlined style={{ color: 'black' }} />}
            size='large'
            onClick={openMaintainCarCardModal}
          />
          <Modal
            title='修改名稱'
            visible={isMaintainCarCardModalVisible}
            onOk={closeMaintainCarCardModalOk}
            onCancel={closeMaintainCarCardModalCancel}
          >
            <Input
              value={maintainModalInputValue}
              onChange={changeMaintainCarCardModalInputValue}
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
    maintainCarCardName: state.maintainCarCardName,
    isMaintainCarCardModalVisible: state.isMaintainCarCardModalVisible,
    maintainModalInputValue: state.maintainModalInputValue
    //props裡的參數與store的數據對應關係
  }
}

const mapDispatchToProps = (dispatch) => {
  //dispatch指store.dispatch這個方法
  return {
    openMaintainCarCardModal() {
      const action = {
        type: OPEN_MAINTAIN_CAR_CARD_MODAL
      }
      dispatch(action)
    },
    closeMaintainCarCardModalOk() {
      const action = {
        type: CLOSE_MAINTAIN_CAR_CARD_MODAL_OK
      }
      dispatch(action)
    },
    closeMaintainCarCardModalCancel() {
      const action = {
        type: CLOSE_MAINTAIN_CAR_CARD_MODAL_CANCEL
      }
      dispatch(action)
    },
    changeMaintainCarCardModalInputValue(event) {
      const action = {
        type: CHANGE_MAINTAIN_CAR_CARD_MODAL_INPUT_VALUE,
        value: event.target.value
      }
      dispatch(action)
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MaintainCarCard)