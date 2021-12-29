import {
  OPEN_MAINTAIN_CAR_CARD_MODAL,
  CLOSE_MAINTAIN_CAR_CARD_MODAL_OK,
  CLOSE_MAINTAIN_CAR_CARD_MODAL_CANCEL,
  CHANGE_MAINTAIN_CAR_CARD_MODAL_INPUT_VALUE
} from './actionType'

const defaultState = {
  maintainModalInputValue: '',
  isMaintainCarCardModalVisible: false,
  maintainCarCardName: '車輛編號表'
}

const reducer = (state = defaultState, action) => {
  const newState = JSON.parse(JSON.stringify(state))
  switch (action.type) {
    case OPEN_MAINTAIN_CAR_CARD_MODAL: {
      newState.isMaintainCarCardModalVisible = true
      return newState
    }
    case CLOSE_MAINTAIN_CAR_CARD_MODAL_OK: {
      newState.isMaintainCarCardModalVisible = false
      newState.maintainCarCardName = newState.maintainModalInputValue
      newState.maintainModalInputValue = ''
      return newState
    }
    case CLOSE_MAINTAIN_CAR_CARD_MODAL_CANCEL: {
      newState.isMaintainCarCardModalVisible = false
      newState.maintainModalInputValue = ''
      return newState
    }
    case CHANGE_MAINTAIN_CAR_CARD_MODAL_INPUT_VALUE: {
      newState.maintainModalInputValue = action.value
      return newState
    }
    default: {
      return newState
    }
  }
}

export default reducer