import {
  OPEN_MAINTAIN_MODAL,
  CLOSE_MAINTAIN_MODAL_OK,
  CLOSE_MAINTAIN_MODAL_CANCEL,
  CHANGE_MAINTAIN_MODAL_INPUT_VALUE,
  CHANGE_MAINTAIN_MODEL_CARD_KEY,
  OPEN_MAINTAIN_CAR_CARD_MODAL,
  CLOSE_MAINTAIN_CAR_CARD_MODAL_OK,
  CLOSE_MAINTAIN_CAR_CARD_MODAL_CANCEL,
  CHANGE_MAINTAIN_CAR_CARD_MODAL_INPUT_VALUE
} from './actionType'

const defaultState = {
  isMaintainModalVisible: false,
  maintainModalInputValue: '',
  maintainModelCardName: [],
  maintainModelCardKey: '',
  isMaintainCarCardModalVisible: false,
  maintainCarCardName: '車輛編號表'
}

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case OPEN_MAINTAIN_MODAL: {
      const newState = JSON.parse(JSON.stringify(state))
      newState.isMaintainModalVisible = true
      return newState
    }
    case CLOSE_MAINTAIN_MODAL_OK: {
      const newState = JSON.parse(JSON.stringify(state))
      newState.isMaintainModalVisible = false
      newState.maintainModelCardName.push({
        key: newState.maintainModalInputValue,
        tab: newState.maintainModalInputValue
      })
      newState.maintainModelCardKey = newState.maintainModalInputValue
      newState.maintainModalInputValue = ''
      return newState
    }
    case CLOSE_MAINTAIN_MODAL_CANCEL: {
      const newState = JSON.parse(JSON.stringify(state))
      newState.isMaintainModalVisible = false
      newState.maintainModalInputValue = ''
      return newState
    }
    case CHANGE_MAINTAIN_MODAL_INPUT_VALUE: {
      const newState = JSON.parse(JSON.stringify(state))
      newState.maintainModalInputValue = action.value
      return newState
    }
    case CHANGE_MAINTAIN_MODEL_CARD_KEY: {
      const newState = JSON.parse(JSON.stringify(state))
      newState.maintainModelCardKey = action.value
      return newState
    }
    case OPEN_MAINTAIN_CAR_CARD_MODAL: {
      const newState = JSON.parse(JSON.stringify(state))
      newState.isMaintainCarCardModalVisible = true
      return newState
    }
    case CLOSE_MAINTAIN_CAR_CARD_MODAL_OK: {
      const newState = JSON.parse(JSON.stringify(state))
      newState.isMaintainCarCardModalVisible = false
      newState.maintainCarCardName = newState.maintainModalInputValue
      newState.maintainModalInputValue = ''
      return newState
    }
    case CLOSE_MAINTAIN_CAR_CARD_MODAL_CANCEL: {
      const newState = JSON.parse(JSON.stringify(state))
      newState.isMaintainCarCardModalVisible = false
      newState.maintainModalInputValue = ''
      return newState
    }
    case CHANGE_MAINTAIN_CAR_CARD_MODAL_INPUT_VALUE: {
      const newState = JSON.parse(JSON.stringify(state))
      newState.maintainModalInputValue = action.value
      console.log(newState)
      return newState
    }
    default: {
      return state
    }
  }
}

export default reducer