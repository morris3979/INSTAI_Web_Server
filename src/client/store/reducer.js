import {
  Table_Status, Get_Model_Version_Table, Map_Position, Status_Table,
  Model_A_Table, Model_B_Table, Model_C_Table, Modal_File, Which_Modal,
  Login_Information, Account_Information
} from './actionType'

const defaultState = {
  loginInformation: { admin: false },
  tableStatus: false,
  modelVersionTableData: [],
  mapPositionData: [],
  reportTableData: [],
  modelATableData: [],
  modelBTableData: [],
  modelCTableData: [],
  modalFile: [],
  accountData: [],
  whichModal: {}
}

const reducer = (state = defaultState, action) => {
  const newState = JSON.parse(JSON.stringify(state))
  switch (action.type) {
    case Table_Status: {
      newState.tableStatus = !newState.tableStatus
      return newState
    }
    case Login_Information: {
      newState.loginInformation = action.value
      return newState
    }
    case Account_Information: {
      newState.accountData = action.value
      return newState
    }
    case Get_Model_Version_Table: {
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
    case Model_A_Table: {
      newState.modelATableData = action.value
      return newState
    }
    case Model_B_Table: {
      newState.modelBTableData = action.value
      return newState
    }
    case Model_C_Table: {
      newState.modelCTableData = action.value
      return newState
    }
    case Modal_File: {
      newState.modalFile = action.value
      return newState
    }
    case Which_Modal: {
      newState.whichModal = action.value
      return newState
    }
    default: {
      return state
    }
  }
}

export default reducer