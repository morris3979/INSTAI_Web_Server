import {
  Table_Status, Get_Project_Table, Get_Host_Table, Get_Device_Table, Map_Position, Status_Table,
  Model_A_Table, Model_B_Table, Model_C_Table, Modal_File, Which_Modal,
  Login_Information, Account_Information, Logout_Information, Get_Project_Data, Which_Project,
   Get_Host_Data, Which_Host
} from './actionType'

const defaultState = {
  loginInformation: { admin: false },
  tableStatus: false,
  projectTableData: [],
  hostTableData: [],
  deviceTableData: [],
  mapPositionData: [],
  reportTableData: [],
  modelATableData: [],
  modelBTableData: [],
  modelCTableData: [],
  modalFile: [],
  accountData: [],
  whichModal: {},
  projectList:[],
  whichprojectname:[],
  hosttList:[],
  whichhostname:[],
}

const Reducer = (state = defaultState, action) => {
  const newState = JSON.parse(JSON.stringify(state))
  switch (action.type) {
    case Table_Status: {
      newState.tableStatus = action.value
      return newState
    }
    case Login_Information: {
      newState.loginInformation = action.value
      return newState
    }
    case Logout_Information: {
      newState.loginInformation = action.value
      return newState
    }
    case Account_Information: {
      newState.accountData = action.value
      return newState
    }
    case Get_Project_Table: {
      newState.projectTableData = action.value
      return newState
    }
    case Get_Project_Data:{
      newState.projectList=action.value
      return newState
    }
    case Get_Host_Table: {
      newState.hostTableData = action.value
      return newState
    }
    case Get_Host_Data:{
      newState.hostList=action.value
      return newState
    }
    case Get_Device_Table: {
      newState.deviceTableData = action.value
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
    case Which_Project:{
      newState.whichprojectname = action.value
      return newState
    }
    case Which_Host:{
      newState.whichhostname = action.value
      return newState
    }
    default: {
      return state
    }
  }
}

export default Reducer