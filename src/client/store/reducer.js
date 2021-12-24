import {
  COLLAPSED_CHANGE,
  OPEN_MODAL,
  CLOSE_MODAL_OK,
  CLOSE_MODAL_CANCEL,
  CHANGE_INPUT_VALUE
} from './actionType'

const defaultState = {
  collapsed: false,
  isModalVisible: false,
  inputValue: ''
}

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case COLLAPSED_CHANGE: {
      const newState = JSON.parse(JSON.stringify(state))
      newState.collapsed = !newState.collapsed
      return newState
    }
    case OPEN_MODAL: {
      const newState = JSON.parse(JSON.stringify(state))
      newState.isModalVisible = true
      return newState
    }
    case CLOSE_MODAL_OK: {
      const newState = JSON.parse(JSON.stringify(state))
      newState.isModalVisible = false
      newState.inputValue = ''
      return newState
    }
    case CLOSE_MODAL_CANCEL: {
      const newState = JSON.parse(JSON.stringify(state))
      newState.isModalVisible = false
      newState.inputValue = ''
      return newState
    }
    case CHANGE_INPUT_VALUE: {
      const newState = JSON.parse(JSON.stringify(state))
      newState.inputValue = action.value
      return newState
    }
  }
  return state
}

export default reducer