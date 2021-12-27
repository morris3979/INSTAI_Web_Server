import {
  OPEN_MAINTAIN_MODAL,
  CLOSE_MAINTAIN_MODAL_OK,
  CLOSE_MAINTAIN_MODAL_CANCEL,
  CHANGE_MAINTAIN_MODAL_INPUT_VALUE,
  CHANGE_MAINTAIN_MODEL_CARD_KEY
} from './actionType'

const defaultState = {
  isModalVisible: false,
  inputValue: '',
  maintainModelCardName: [],
  maintainModelCardKey: ''
}

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case OPEN_MAINTAIN_MODAL: {
      const newState = JSON.parse(JSON.stringify(state))
      newState.isModalVisible = true
      return newState
    }
    case CLOSE_MAINTAIN_MODAL_OK: {
      const newState = JSON.parse(JSON.stringify(state))
      newState.isModalVisible = false
      newState.maintainModelCardName.push({
        key: newState.inputValue,
        tab: newState.inputValue
      })
      newState.maintainModelCardKey = newState.inputValue
      newState.inputValue = ''
      return newState
    }
    case CLOSE_MAINTAIN_MODAL_CANCEL: {
      const newState = JSON.parse(JSON.stringify(state))
      newState.isModalVisible = false
      newState.inputValue = ''
      return newState
    }
    case CHANGE_MAINTAIN_MODAL_INPUT_VALUE: {
      const newState = JSON.parse(JSON.stringify(state))
      newState.inputValue = action.value
      return newState
    }
    case CHANGE_MAINTAIN_MODEL_CARD_KEY: {
      const newState = JSON.parse(JSON.stringify(state))
      newState.maintainModelCardKey = action.value
      console.log(newState)
      return newState
    }
    default: {
      return state
    }
  }
}

export default reducer