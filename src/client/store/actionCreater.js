import axios from 'axios'
import { message, Modal } from 'antd'
import {
  Get_Model_Version_Table, Table_Status, Map_Position, Status_Table,
  Model_A_Table, Model_B_Table, Model_C_Table, Modal_File, Which_Modal,
  Login_Information, Account_Information, Logout_Information
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
// >>>

//API Function <<<
export const LoginFormData = (data) => {
  return (
    async (dispatch) => {
      message.loading('登入中，請稍後...', 0)
      const convertedData = {}
      Object.keys(data).forEach((key) => {
        convertedData[String(key).slice(5)] = data[key]
      })
      try {
        const response = await axios.post('/api/user/login', convertedData)
        if (response.data.token) {
          const action = LoginToken(response.data)
          dispatch(action)
        }
      } catch (error) {
        message.destroy()
        message.error('登入失敗')
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

export const LogoutData = () => {
  return ({
    type: Logout_Information,
    value: { admin: false }
  })
}

export const RegisterFormData = (data) => {
  return (
    async () => {
      message.loading('註冊中，請稍後...', 0)
      const convertedData = {}
      delete data['registerConfirmPassword']
      Object.keys(data).forEach((key) => {
        convertedData[String(key).slice(8)] = data[key]
      })
      try {
        await axios.post('/api/user/register', convertedData)
        message.destroy()
        Modal.success({
          title: '註冊成功',
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
        const response = await axios.get('/api/user')
        console.log(response.data)
        if (Object.keys(response.data).length > 0) {
          const action = DeliverData(response.data, Account_Information)
          dispatch(action)
        } else {
          throw '資料獲取失敗'
        }
      } catch (error) {
        Modal.error({
          title: `${error}`,
          content: '請重新整理來獲取資料'
        })
      } finally {
        const action = TableStatus(false)
        dispatch(action)
      }
    }
  )
}

export const PatchAccountTableData = (id, data) => {
  return (
    async (dispatch) => {
      message.loading('修改中，請稍後...', 0)
      try {
        await axios.patch(`/api/user/${id}`, data)
        message.destroy()
        Modal.success({
          title: '修改成功',
          onOk: () => {
            const action = GetAccountTableData()
            dispatch(action)
          }
        })
      } catch (error) {
        message.destroy()
        message.error(`${error}`)
      }
    }
  )
}

export const DeleteAccountTableData = (data) => {
  return (
    async (dispatch) => {
      try {
        if (data.admin == false) {
          message.loading('刪除中，請稍後...', 0)
          await axios.delete(`/api/user/${data.id}`)
          message.destroy()
          Modal.success({
            title: '刪除成功',
            onOk: () => {
              const action = GetAccountTableData()
              dispatch(action)
            }
          })
        } else {
          throw '權限管理員帳號無法刪除'
        }
      } catch (error) {
        message.destroy()
        message.error(`${error}`)
      }
    }
  )
}

export const GetModelVersionTableData = () => {
  return (
    async (dispatch) => {
      const action = TableStatus(true)
      dispatch(action)
      try {
        const response = await axios.get('/api/device')
        console.log(response.data)
        if (Object.keys(response.data).length > 0) {
          const action = DeliverData(response.data, Get_Model_Version_Table)
          dispatch(action)
        } else {
          throw '資料獲取失敗'
        }
      } catch (error) {
        Modal.error({
          title: `${error}`,
          content: '請重新整理來獲取資料'
        })
      } finally {
        const action = TableStatus(false)
        dispatch(action)
      }
    }
  )
}

export const DeleteModelVersionTableData = (id) => {
  return (
    async (dispatch) => {
      message.loading('刪除中，請稍後...', 0)
      try {
        await axios.delete(`/api/device/${id}`)
        message.destroy()
        Modal.success({
          title: '刪除成功',
          onOk: () => {
            const action = GetModelVersionTableData()
            dispatch(action)
          }
        })
      } catch (error) {
        message.destroy()
        message.error(`${error}`)
      }
    }
  )
}

export const PatchModelVersionTableData = (id, data) => {
  return (
    async (dispatch) => {
      message.loading('修改中，請稍後...', 0)
      try {
        await axios.patch(`/api/device/${id}`, data)
        message.destroy()
        Modal.success({
          title: '修改成功',
          onOk: () => {
            const action = GetModelVersionTableData()
            dispatch(action)
          }
        })
      } catch (error) {
        message.destroy()
        message.error(`${error}`)
      }
    }
  )
}

export const PostModelVersionTableData = (data) => {
  return (
    async (dispatch) => {
      message.loading('新增中，請稍後...', 0)
      try {
        const response = await axios.post('/api/device', data)
        message.destroy()
        if (response.data == 'Already Exist') {
          Modal.warning({
            title: '資料已存在'
          })
        } else {
          Modal.success({
            title: '新增成功',
            onOk: () => {
              const action = GetModelVersionTableData()
              dispatch(action)
            }
          })
        }
      } catch (error) {
        message.destroy()
        message.error(`${error}`)
      }
    }
  )
}

export const PostMQTTTest = (data) => {
  const sendData = {
    'deviceId': data.deviceId,
    'command': data.command
  }
  return (
    async (dispatch) => {
      try {
        await axios.post('/api/aws/iot/publish', sendData, {
          params: {
            topic: '0000000039aed1d2',
            device: 'RaspberryPi',
            type: 'OTADevice'
          }
        })
        Modal.success(
          {
            title: `封包已傳送至板號: ${data.deviceId}`,
            content: `傳送內容: ${data.command}`,
            onOk: () => {
              const action = GetModelVersionTableData()
              dispatch(action)
            }
          }
        )
      } catch (error) {
        message.error(`${error}`)
      }
    }
  )
}

export const GetStatusTableData = () => {
  return (
    async (dispatch) => {
      const action = TableStatus(true)
      dispatch(action)
      try {
        const response = await axios.get('/api/event')
        console.log(response.data)
        if (Object.keys(response.data).length > 0) {
          const action = DeliverData(response.data, Status_Table)
          dispatch(action)
        } else {
          throw '資料獲取失敗'
        }
      } catch (error) {
        Modal.error({
          title: `${error}`,
          content: '請重新整理來獲取資料'
        })
      } finally {
        const action = TableStatus(false)
        dispatch(action)
      }
    }
  )
}

export const GetModelATableData = () => {
  return (
    async (dispatch) => {
      const action = TableStatus(true)
      dispatch(action)
      try {
        const response = await axios.get('/api/event')
        console.log(response)
        if (Object.keys(response.data).length > 0) {
          const filterData = response.data.filter((value) => {
            if (value.CarNumber) {
              return (value.CarNumber.modelName[0] == 'A')
            }
          })
          const action = DeliverData(filterData, Model_A_Table)
          dispatch(action)
        } else {
          throw '資料獲取失敗'
        }
      } catch (error) {
        Modal.error({
          title: `${error}`,
          content: '請重新整理來獲取資料'
        })
      } finally {
        const action = TableStatus(false)
        dispatch(action)
      }
    }
  )
}

export const GetModelBTableData = () => {
  return (
    async (dispatch) => {
      const action = TableStatus(true)
      dispatch(action)
      try {
        const response = await axios.get('/api/event')
        console.log(response)
        if (Object.keys(response.data).length > 0) {
          const filterData = response.data.filter((value) => {
            if (value.CarNumber) {
              return (value.CarNumber.modelName[0] == 'B')
            }
          })
          const action = DeliverData(filterData, Model_B_Table)
          dispatch(action)
        } else {
          throw '資料獲取失敗'
        }
      } catch (error) {
        Modal.error({
          title: `${error}`,
          content: '請重新整理來獲取資料'
        })
      } finally {
        const action = TableStatus(false)
        dispatch(action)
      }
    }
  )
}

export const GetModelCTableData = () => {
  return (
    async (dispatch) => {
      const action = TableStatus(true)
      dispatch(action)
      try {
        const response = await axios.get('/api/event')
        console.log(response)
        if (Object.keys(response.data).length > 0) {
          const filterData = response.data.filter((value) => {
            if (value.CarNumber) {
              return (value.CarNumber.modelName[0] == 'C')
            }
          })
          const action = DeliverData(filterData, Model_C_Table)
          dispatch(action)
        } else {
          throw '資料獲取失敗'
        }
      } catch (error) {
        Modal.error({
          title: `${error}`,
          content: '請重新整理來獲取資料'
        })
      } finally {
        const action = TableStatus(false)
        dispatch(action)
      }
    }
  )
}

export const DownloadImage = (imageName) => {
  return (
    async () => {
      try {
        const response = await axios.get(
          `/api/aws/s3/getFile/image/${imageName}.jpg`, //AWS
          // `/api/aliyun/oss/getFile/image/${imageName}.jpg`, //Aliyun
          { responseType: 'blob' }
        )
        const url = window.URL.createObjectURL(new Blob([response.data]))
        const link = document.createElement('a')
        link.href = url
        link.setAttribute('download', `${imageName}.jpg`)
        document.body.appendChild(link)
        link.click()
      } catch (error) {
        message.error(error)
      }
    }
  )
}

export const DownloadVideo = (videoName) => {
  return (
    async () => {
      try {
        const response = await axios.get(
          `/api/aws/s3/getFile/video/${videoName}.mp4`, //AWS
          // `/api/aliyun/oss/getFile/video/${videoName}.mp4`, //Aliyun
          { responseType: 'blob' }
        )
        const url = window.URL.createObjectURL(new Blob([response.data]))
        const link = document.createElement('a')
        link.href = url
        link.setAttribute('download', `${videoName}.mp4`)
        document.body.appendChild(link)
        link.click()
      } catch (error) {
        message.error(error)
      }
    }
  )
}
// >>>