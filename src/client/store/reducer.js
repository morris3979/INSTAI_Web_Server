import {
  Init_Model_Version_Table,
  Model_Version_Table_Status,
  Model_Version_Table_Input,
  Model_Version_Table_Column
} from './actionType'

const defaultState = {
  modelVersionTableData: [],
  modelVersionTableStatus: false,
  modelVersionTableInput: '',
  modelVersionTableColumn: ''
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
    case Model_Version_Table_Input: {
      newState.modelVersionTableInput = action.value
      return newState
    }
    case Model_Version_Table_Column: {
      newState.modelVersionTableColumn = action.value
      return newState
    }
    default: {
      return newState
    }
  }
}

export default reducer