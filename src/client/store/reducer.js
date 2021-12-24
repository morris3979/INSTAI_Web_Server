import { COLLAPSED_CHANGE, OPEN_MODAL, CLOSE_MODAL } from './actionType'

const defaultState = {
  collapsed: false,
  isModalVisible: false
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
    case CLOSE_MODAL: {
      const newState = JSON.parse(JSON.stringify(state))
      newState.isModalVisible = false
      return newState
    }
  }
  return state
}

export default reducer