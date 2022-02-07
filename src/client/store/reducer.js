import {
  Init_Model_Version_Table,
  Model_Version_Table_Status,
  Map_Position
} from './actionType'

const defaultState = {
  modelVersionTableData: [],
  modelVersionTableStatus: false,
  mapPositionData: [],
  isModalVisible: false
}

const reducer = (state = defaultState, action) => {
  const newState = JSON.parse(JSON.stringify(state))
  switch (action.type) {
    case Init_Model_Version_Table: {
      newState.modelVersionTableData = action.value
      return newState
    }
    case Model_Version_Table_Status: {
      newState.modelVersionTableStatus = !newState.modelVersionTableStatus
      return newState
    }
    case Map_Position: {
      newState.mapPositionData = action.value
      return newState
    }
    case 'show_modal': {
      newState.isModalVisible = true
      return newState
    }
    case 'close_modal_ok': {
      newState.isModalVisible = false
      return newState
    }
    case 'close_modal_cancel': {
      newState.isModalVisible = false
      return newState
    }
    default: {
      return newState
    }
  }
}

export default reducer