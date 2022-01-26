import {
  Init_Model_Version_Table
} from './actionType'

const defaultState = {
  modelVersionTableData: []
}

const reducer = (state = defaultState, action) => {
  const newState = JSON.parse(JSON.stringify(state))
  switch (action.type) {
    case Init_Model_Version_Table: {
      newState.modelVersionTableData = action.value
    }
    default: {
      return newState
    }
  }
}

export default reducer