import axios from 'axios'
import {
  Table_Status, Modal_File, Which_Modal,
  Which_Project, Which_Host, Which_Device,
  User_Information, Logout_Information
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
        console.log('err: ', e)
        // alert(e.response.data.message)
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
        console.log('err: ', e)
        alert(e.response.data.message)
      }
    }
  )
}

export const LogoutData = () => {
  return ({
    type: Logout_Information,
    value: {
      developer: false,
      admin: false
    }
  })
}

export const GetLoginUser = (id, data) => {
  return (
    async (dispatch) => {
      const action = TableStatus(true)
      dispatch(action)
      try {
        const response = await axios.get(`/api/user/${id}`)
        console.log(response.data)
        const action = DeliverData(response.data, User_Information)
        dispatch(action)
      } catch (e) {
        console.log('err: ', e)
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
        }
      } catch (e) {
        console.log('err: ', e)
        alert(e.response.data.message)
        // location.reload()
        return
      }
    }
  )
}

export const OrganizationFormData = (data, id) => {
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
        }
        alert('Complete !')
      } catch (e) {
        console.log('err: ', e)
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
      }catch (e) {
        console.log('err: ', e)
        alert(e.response.data.message)
      }
    }
  )
}
// >>>