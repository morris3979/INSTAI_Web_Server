import {
  Table_Status,
  Model_Version_Table,
  Map_Position,
  Status_Table
} from './actionType'

const defaultState = {
  tableStatus: false,
  modelVersionTableData: [],
  mapPositionData: [],
  reportTableData: [],
  isModalVisible: false
}

const reducer = (state = defaultState, action) => {
  const newState = JSON.parse(JSON.stringify(state))
  switch (action.type) {
    case Table_Status: {
      newState.tableStatus = !newState.tableStatus
      return newState
    }
    case Model_Version_Table: {
      newState.modelVersionTableData = action.value
      return newState
    }
    case Map_Position: {
      newState.mapPositionData = action.value
      return newState
    }
    case Status_Table: {
      newState.reportTableData = action.value
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