import axios from 'axios'
import { message, Modal } from 'antd'
import {
  Table_Status, Map_Position, Modal_File, Which_Modal,
  Which_Project, Which_Host, Which_Device, Login_State,
  Login_Information, Account_Information
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
export const MapPosition = (data) => {
  return ({
    type: Map_Position,
    value: data
  })
}

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
export const LoginState = (text) => {
  return({
    type: Login_State,
    value: text
  })
}
// >>>

//API <<<

export const LoginFormData = (data) => {
  return (
    async (dispatch) => {
      message.loading('Loading...', 0)
      try {
        const response = await axios.post('/api/user/login', data)
        if (response.data.token) {
          const action = LoginToken(response.data)
          dispatch(action)
        }
      } catch (error) {
        message.destroy()
        message.error('login failed, please check again！')
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
        const action = DeliverData(data, Login_Information)
        dispatch(action)
        message.destroy()
      } catch (error) {
        message.destroy()
        message.error(`${error}`)
      }
    }
  )
}

export const RegisterFormData = (data) => {
  return (
    async () => {
      message.loading('Loading...', 0)
      try {
        await axios.post('/api/user/register', data)
        message.destroy()
      } catch (error) {
        message.destroy()
        message.error(`${error}`)
        Modal.error({
          title: 'Account Already Exist !',
          onOk: () => { location.reload() }
        })
      }
    }
  )
}

export const OrganizationFormData = (data) => {
  return (
    async () => {
      message.loading('Loading...', 0)
      try {
        await axios.post('/api/user/organization', data)
        message.destroy()
        Modal.success({
          title: 'Complete !',
          onOk: () => { location.reload() }
        })
      } catch (error) {
        message.destroy()
        message.error(`${error}`)
      }
    }
  )
}

export const GetAccountTableData = () => {
  return (
    async (dispatch) => {
      const action = TableStatus(true)
      dispatch(action)
      try {
        const response = await axios.get('/api/user/register')
        // console.log(response.data)
        if (Object.keys(response.data).length > 0) {
          const action = DeliverData(response.data, Account_Information)
          dispatch(action)
        } else {
          throw 'No Data'
        }
      } catch (error) {
        Modal.warning({
          title: 'Warning',
          content: `${error}`
        })
      } finally {
        const action = TableStatus(false)
        dispatch(action)
      }
    }
  )
}
// >>>