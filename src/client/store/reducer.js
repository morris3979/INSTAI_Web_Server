import {
  COLLAPSED_CHANGE,
  OPEN_MAINTAIN_MODAL,
  CLOSE_MAINTAIN_MODAL_OK,
  CLOSE_MAINTAIN_MODAL_CANCEL,
  CHANGE_MAINTAIN_MODAL_INPUT_VALUE
} from './actionType'

const defaultState = {
  collapsed: false,
  isMaintainModalVisible: false,
  maintainModalInputValue: '',
  maintainCardName: ['test1', 'test2']
}

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case COLLAPSED_CHANGE: {
      const newState = JSON.parse(JSON.stringify(state))
      newState.collapsed = !newState.collapsed
      return newState
    }
    case OPEN_MAINTAIN_MODAL: {
      const newState = JSON.parse(JSON.stringify(state))
      newState.isMaintainModalVisible = true
      return newState
    }
    case CLOSE_MAINTAIN_MODAL_OK: {
      const newState = JSON.parse(JSON.stringify(state))
      newState.isMaintainModalVisible = false
      newState.maintainCardName.push(newState.maintainModalInputValue)
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
    default: {
      return state
    }
  }
}

export default reducer