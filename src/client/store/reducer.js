import {
  Modal_File, Which_Modal, Table_Status, Map_Position,
  Which_Project, Which_Host, Which_Device, Login_State,
  Login_Information, Account_Information
} from './actionType'

const defaultState = {
  tableStatus: false,
  whichModal: {},
  mapPositionData: [],
  modalFile: [],
  whichProjectName:[],
  whichHostName:[],
  whichDeviceName:[],
  loginState: true,
  loginInformation: { admin: false },
  accountData: [],
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
    case Login_State:  {
      newState.loginState = action.value
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
    default: {
      return state
    }
  }
}

export default Reducer