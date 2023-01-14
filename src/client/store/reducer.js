import {
  Modal_File, Which_Modal, Table_Status, Map_Position,
  Which_Project, Which_Host, Which_Device,
  Logout_Information, User_Information,
  Project_List, Data_List
} from './actionType'

const defaultState = {
  tableStatus: false,
  whichModal: {},
  mapPositionData: [],
  modalFile: [],
  whichProjectName:[],
  whichHostName:[],
  whichDeviceName:[],
  userInformation: {},
  projectList: {},
  dataList: {}
}

const Reducer = (state = defaultState, action) => {
  const newState = JSON.parse(JSON.stringify(state))
  switch (action.type) {
    case Table_Status: {
      newState.tableStatus = action.value
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
    case User_Information: {
      newState.userInformation = action.value
      return newState
    }
    case Logout_Information: {
      newState.userInformation = action.value
      return newState
    }
    case Project_List: {
      newState.projectList = action.value
      return newState
    }
    case Data_List: {
      newState.dataList = action.value
      return newState
    }
    default: {
      return state
    }
  }
}

export default Reducer