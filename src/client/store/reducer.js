import {
  Modal_File, Which_Modal, Table_Status,
  Which_Project, Which_Host, Which_Device,
  Set_ClippedDrawer, Logout_Information, User_Information,
  Project_List, Data_List, Members_List,
  Device_List, Label_List, Model_List,
  Data_Item, Project_Item, S3_Image,
  S3_Train, User_Import, Organization_Import,
  Project_Import, Data_Import
} from './actionType'

const defaultState = {
  tableStatus: false,
  whichModal: {},
  modalFile: [],
  whichProjectName:[],
  whichHostName:[],
  whichDeviceName:[],
  clippedDrawer: 'Overview',
  userInformation: {},
  projectList: {},
  dataList: {},
  membersList: {},
  deviceList: {},
  dataItem: {},
  labelList: {},
  projectItem: {},
  modelList: {},
  userImport: {},
  organizationImport: {},
  projectImport: {},
  dataImport: {},
  s3Image: {},
  s3Train: {}
}

const Reducer = (state = defaultState, action) => {
  const newState = JSON.parse(JSON.stringify(state))
  switch (action.type) {
    case Table_Status: {
      newState.tableStatus = action.value
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
    case Set_ClippedDrawer: {
      newState.clippedDrawer = action.value
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
    case Members_List: {
      newState.membersList = action.value
      return newState
    }
    case Device_List: {
      newState.deviceList = action.value
      return newState
    }
    case Data_Item: {
      newState.dataItem = action.value
      return newState
    }
    case Label_List: {
      newState.labelList = action.value
      return newState
    }
    case Project_Item: {
      newState.projectItem = action.value
      return newState
    }
    case Model_List: {
      newState.modelList = action.value
      return newState
    }
    case User_Import: {
      newState.userImport = action.value
      return newState
    }
    case Organization_Import: {
      newState.organizationImport = action.value
      return newState
    }
    case Project_Import: {
      newState.projectImport = action.value
      return newState
    }
    case Data_Import: {
      newState.dataImport = action.value
    }
    case S3_Image: {
      newState.s3Image = action.value
      return newState
    }
    case S3_Train: {
      newState.s3Train = action.value
      return newState
    }
    default: {
      return state
    }
  }
}

export default Reducer