import axios from 'axios'
import {
  Table_Status, Modal_File, Which_Modal,
  Which_Project, Which_Host, Which_Device,
  User_Information, Logout_Information,
  Project_List, Data_List, Members_List,
  Device_List, Data_Item, Label_List
} from './actionType'

//共用Function <<<
export const TableStatus = (status) => {
  return ({
    type: Table_Status,
    value: status
  })
}

export const DeliverData = (data, actionType) => {
  return ({
    type: actionType,
    value: data
  })
}
// >>>

//獨立Function <<<
export const GetModalFile = (data) => {
  return ({
    type: Modal_File,
    value: data
  })
}

export const SetWhichModal = (data) => {
  return ({
    type: Which_Modal,
    value: data
  })
}

export const WhichProject = (text) => {
  return({
    type: Which_Project,
    value: text
  })
}

export const WhichHost = (text) => {
  return({
    type: Which_Host,
    value: text
  })
}

export const WhichDevice = (text) => {
  return({
    type: Which_Device,
    value: text
  })
}
// >>>

//API <<<
export const LoginFormData = (data) => {
  return (
    async (dispatch) => {
      try {
        const response = await axios.post('/api/user/login', data)
        if (response.data.token) {
          const action = LoginToken(response.data)
          dispatch(action)
        }
      } catch (e) {
        alert(e.response.data.message)
      }
    }
  )
}

export const LoginToken = (data) => {
  return (
    async (dispatch) => {
      const headers = { 'x-access-token': data.token }
      try {
        await axios.post('/api/user/welcome', null, { headers: headers })
        const action = DeliverData(data, User_Information)
        dispatch(action)
      } catch (e) {
        alert(e.response.data.message)
      }
    }
  )
}

export const LogoutData = () => {
  return ({
    type: Logout_Information,
    value: {}
  })
}

export const GetLoginUser = (id, data) => {
  return (
    async (dispatch) => {
      const action = TableStatus(true)
      dispatch(action)
      try {
        const response = await axios.get(`/api/user/${id}`)
        // console.log(response.data)
        const action = DeliverData(response.data, User_Information)
        dispatch(action)
      } catch (e) {
        alert(e.response.data.message)
        location.reload()
        return
      } finally {
        const action = TableStatus(false)
        dispatch(action)
      }
    }
  )
}

export const RegisterFormData = (data) => {
  return (
    async (dispatch) => {
      try {
        const response = await axios.post('/api/user/register', data)
        if(response.data){
          const action = DeliverData(response.data, User_Information)
          dispatch(action)
          return
        }
      } catch (e) {
        alert(e.response.data.message)
        return
      }
    }
  )
}

export const CreateNewOrganization = (data, id) => {
  return (
    async (dispatch) => {
      try {
        const converted = {}
        const response = await axios.post('/api/organization', data)
        converted.userId = id
        converted.organizationId = `${response.data.id}`
        if(converted) {
          const action = UserBindOrganization(converted)
          dispatch(action)
          const second = GetProjectList(response.data.id)
          dispatch(second)
          const third = GetLoginUser(id)
          dispatch(third)
          return
        }
      } catch (e) {
        alert(e.response.data.message)
      }
    }
  )
}

export const UserBindOrganization = (data) => {
  return(
    async () => {
      try {
        await axios.post('/api/user/group', data)
      } catch (e) {
        alert(e.response.data.message)
      }
    }
  )
}

export const GetProjectList = (id, data) => {
  return (
    async (dispatch) => {
      const action = TableStatus(true)
      dispatch(action)
      try {
        const response = await axios.get(`/api/organization/${id}/projects`)
        // console.log(response.data)
        const action = DeliverData(response.data, Project_List)
        dispatch(action)
      } catch (e) {
        alert(e.response.data.message)
        location.reload()
        return
      }
    }
  )
}

export const CreateProject = (data) => {
  return (
    async (dispatch) => {
      try {
        const response = await axios.post('/api/project', data)
        if (response.data) {
          const action = GetProjectList(response.data.OrganizationId)
          dispatch(action)
          location.reload()
          return
        }
      } catch (e) {
        alert(e.response.data.message)
      }
    }
  )
}

export const GetDataList = (id, data) => {
  return (
    async (dispatch) => {
      const action = TableStatus(true)
      dispatch(action)
      try {
        const response = await axios.get(`/api/project/${id}/data`)
        // console.log(response.data)
        const action = DeliverData(response.data, Data_List)
        dispatch(action)
      } catch (e) {
        alert(e.response.data.message)
        location.reload()
        return
      }
    }
  )
}

export const GetOrganizationMembers = (id, data) => {
  return (
    async (dispatch) => {
      const action = TableStatus(true)
      dispatch(action)
      try {
        const response = await axios.get(`/api/organization/${id}/users`)
        // console.log(response.data)
        const action = DeliverData(response.data, Members_List)
        dispatch(action)
      } catch (e) {
        alert(e.response.data.message)
        location.reload()
        return
      }
    }
  )
}

export const InviteMember = (data) => {
  return (
    async (dispatch) => {
      try {
        const response = await axios.post('/api/user/invite', data)
        if (response.data) {
          location.reload()
          return
        }
      } catch (e) {
        alert(e.response.data.message)
      }
    }
  )
}

export const GetDeviceList = (id, data) => {
  return (
    async (dispatch) => {
      const action = TableStatus(true)
      dispatch(action)
      try {
        const response = await axios.get(`/api/project/${id}/device`)
        // console.log(response.data)
        const action = DeliverData(response.data, Device_List)
        dispatch(action)
      } catch (e) {
        alert(e.response.data.message)
        location.reload()
        return
      }
    }
  )
}

export const AddDevice = (data) => {
  return (
    async (dispatch) => {
      try {
        const response = await axios.post('/api/device', data)
        if (response.data) {
          location.reload()
          return
        }
      } catch (e) {
        alert(e.response.data.message)
      }
    }
  )
}

export const PatchDeviceData = (id,data) => {
  return (
    async (dispatch) => {
      try {
        const response = await axios.patch(`/api/device/${id}`, data)
        if (response.data) {
          location.reload()
          return
        }
      } catch (e) {
        alert(e.response.data.message)
      }
    }
  )
}

export const GetDataItem = (id, data) => {
  return (
    async (dispatch) => {
      const action = TableStatus(true)
      dispatch(action)
      try {
        const response = await axios.get(`/api/data/${id}`)
        // console.log(response.data)
        const action = DeliverData(response.data, Data_Item)
        dispatch(action)
      } catch (e) {
        alert(e.response.data.message)
        location.reload()
        return
      }
    }
  )
}

export const GetLabelList = (id, data) => {
  return (
    async (dispatch) => {
      const action = TableStatus(true)
      dispatch(action)
      try {
        const response = await axios.get(`/api/project/${id}/label`)
        // console.log(response.data)
        const action = DeliverData(response.data, Label_List)
        dispatch(action)
      } catch (e) {
        alert(e.response.data.message)
        location.reload()
        return
      }
    }
  )
}

export const AddLabel = (data) => {
  return (
    async (dispatch) => {
      try {
        const response = await axios.post('/api/label', data)
        if (response.data) {
          location.reload()
          return
        }
      } catch (e) {
        alert(e.response.data.message)
      }
    }
  )
}

// >>>