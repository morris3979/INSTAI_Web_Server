import {
  Login_Information, Account_Information, Logout_Information, Modal_File, Which_Modal,
  Table_Status, Get_Project_Table, Get_Host_Table, Get_Device_Table, Map_Position,
  Get_Project_Data, Which_Project, Get_Host_Data, Which_Host, Which_Device,
  Get_Model_List, Get_Event_Data, Get_Event_Data_Id,
} from './actionType'

const defaultState = {
  loginInformation: { admin: false },
  tableStatus: false,
  whichModal: {},
  mapPositionData: [],
  reportTableData: [],
  projectTableData: [],
  hostTableData: [],
  deviceTableData: [],
  modalFile: [],
  accountData: [],
  projectList:[],
  hostList:[],
  whichProjectName:[],
  whichHostName:[],
  whichDeviceName:[],
  modelListData: [],
  eventList:[],
  eventListID:[],
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
    case Get_Model_List: {
      newState.modelListData = action.value
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
      newState.hostList = action.value
      return newState
    }
    case Get_Device_Table: {
      newState.deviceTableData = action.value
      return newState
    }
    case Get_Event_Data:{
      newState.eventList = action.value
      return newState
    }
    case Get_Event_Data_Id:{
      newState.eventListID = action.value
      return newState
    }
    case Map_Position: {
      newState.mapPositionData = action.value
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
      newState.whichProjectName = action.value
      return newState
    }
    case Which_Host:{
      newState.whichHostName = action.value
      return newState
    }
    case Which_Device:{
      newState.whichDeviceName = action.value
      return newState
    }
    default: {
      return state
    }
  }
}

export default Reducer