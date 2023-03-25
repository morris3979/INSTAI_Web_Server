import axios from 'axios'
import {
  Table_Status, Modal_File, Which_Modal,
  Which_Project, Which_Host, Which_Device,
  Set_ClippedDrawer, Filter_Item, User_Information,
  Logout_Information, Project_List, Data_List,
  Members_List, Device_List, Label_List,
  Model_List, Data_Item, Project_Item,
  S3_Image, S3_Train, User_Import, Organization_Import,
  Project_Import, Data_Import, Model_Import
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

export const SetClippedDrawer = (text) => {
  return({
    type: Set_ClippedDrawer,
    value: text
  })
}

export const FilterItem = (text) => {
  return({
    type: Filter_Item,
    value: text
  })
}

export const CleanFilterItem = () => {
  return({
    type: Filter_Item,
    value: {}
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
          const user = UserImport(response.data.id)
          dispatch(user)
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

export const RegisterFormData = (data) => {
  return (
    async (dispatch) => {
      try {
        const response = await axios.post('/api/user/register', data)
        if(response.data){
          const action = DeliverData(response.data, User_Information)
          dispatch(action)
          const user = UserImport(response.data.id)
          dispatch(user)
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
        const response = await axios.post('/api/organization', data)
        const converted = {}
        converted.userId = id
        converted.organizationId = response.data.id
        if(converted) {
          await axios.post('/api/user/group', converted)
          const user = await axios.get(`/api/user/${id}`)
          const action = DeliverData(user.data, User_Information)
          dispatch(action)
          return
        }
      } catch (e) {
        alert(e.response.data.message)
      }
    }
  )
}

export const GetLoginUser = (id) => {
  return (
    async (dispatch) => {
      const action = TableStatus(true)
      dispatch(action)
      try {
        const response = await axios.get(`/api/user/${id}`)
        const action = DeliverData(response.data, User_Information)
        dispatch(action)
      } catch (e) {
        alert(e.response.data.message)
        location.reload()
        return
      }
    }
  )
}

export const GetProjectList = (id) => {
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

export const GetDataList = (id) => {
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

export const GetDeviceList = (id) => {
  return (
    async (dispatch) => {
      const action = TableStatus(true)
      dispatch(action)
      try {
        const response = await axios.get(`/api/project/${id}/device`)
        const action = DeliverData(response.data, Device_List)
        dispatch(action)
        return
      } catch (e) {
        alert(e.response.data.message)
        location.reload()
        return
      }
    }
  )
}

export const GetLabelList = (id) => {
  return (
    async (dispatch) => {
      try {
        const response = await axios.get(`/api/project/${id}/label`)
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

export const GetModelList = (id) => {
  return (
    async (dispatch) => {
      const action = TableStatus(true)
      dispatch(action)
      try {
        const response = await axios.get(`/api/project/${id}/model`)
        const action = DeliverData(response.data, Model_List)
        dispatch(action)
      } catch (e) {
        alert(e.response.data.message)
        location.reload()
        return
      }
    }
  )
}

export const GetProjectItem = (id) => {
  return (
    async (dispatch) => {
      const action = TableStatus(true)
      dispatch(action)
      try {
        const response = await axios.get(`/api/project/${id}`)
        const action = DeliverData(response.data, Project_Item)
        dispatch(action)
      } catch (e) {
        alert(e.response.data.message)
        location.reload()
        return
      }
    }
  )
}

export const GetOrganizationMembers = (id) => {
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

export const GetDataItem = (id) => {
  return (
    async (dispatch) => {
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

export const PatchProjectItem = (id, data) => {
  return (
    async (dispatch) => {
      try {
        const response = await axios.patch(`/api/project/${id}`, data)
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

export const PostDataItem = (data) => {
  return (
    async (dispatch) => {
      try {
        const response = await axios.post('/api/data', data)
        if (response.data) {
          return
        }
      } catch (e) {
        alert(e.response.data.message)
      }
    }
  )
}

export const PatchDataItem = (id, data) => {
  return (
    async (dispatch) => {
      try {
        const response = await axios.patch(`/api/data/${id}`, data)
        if (response.data) {
          const response_dataItem = await axios.get(`/api/data/${id}`)
          const action = DeliverData(response_dataItem.data, Data_Item)
          dispatch(action)
          const response_dataList = await axios.get(`/api/project/${response.data.ProjectId}/data`)
          const secondAction = DeliverData(response_dataList.data, Data_List)
          dispatch(secondAction)
          setTimeout(() => {
            location.reload()
          }, 300)
          return
        }
      } catch (e) {
        alert(e.response.data.message)
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

export const PatchDeviceData = (id, data) => {
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

export const AddLabel = (data) => {
  return (
    async (dispatch) => {
      try {
        const response = await axios.post('/api/label', data)
        if (response.data) {
          const response_labelList = await axios.get(`/api/project/${response.data.ProjectId}/label`)
          const action = DeliverData(response_labelList.data, Label_List)
          dispatch(action)
          setTimeout(() => {
            location.reload()
          }, 300)
          return
        }
      } catch (e) {
        alert(e.response.data.message)
      }
    }
  )
}

export const GetS3Image = (filename) => {
  return (
    async (dispatch) => {
      try {
        const response = await axios.get(
          `/api/aws/s3/getFile/image/${filename}`, //AWS
          { responseType: 'blob' }
        )
        if(response.data){
          const action = DeliverData({filename: filename}, S3_Image)
          dispatch(action)
        }
      } catch (error) {
        alert(error)
      }
    }
  )
}

export const ResetS3ImageData = () => {
  return ({
    type: S3_Image,
    value: {}
  })
}

export const UploadImageFile = (file) => {
  return (
    async (dispatch) => {
      let formData = new FormData();
      formData.append('file', file)
      return axios.post(
        `/api/data/uploadToS3`, formData
      ).then(response => {
        // console.log('response', response)
        if(response.data){
          const action = GetS3Image(response.data.filename)
          dispatch(action)
        }
        // JSON responses are automatically parsed.
      }).catch(e => {
        this.errors.push(e);
      });
    }
  )
}

export const UploadJsonFile = (file) => {
  return (
    async () => {
      let formData = new FormData();
      formData.append('file', file)
      return axios.post(
        `/api/aws/s3/upload/json/label`, formData
      ).then(response => {
        console.log('response', response)
        // JSON responses are automatically parsed.
      }).catch(e => {
        this.errors.push(e);
      });
    }
  )
}

export const GetS3TrainData = (filename) => {
  return (
    async (dispatch) => {
      try {
        const response = await axios.get(
          `/api/aws/s3/getFile/train/${filename}`, //AWS
          { responseType: 'blob' }
        )
        if(response.data){
          const action = DeliverData({filename: filename}, S3_Train)
          dispatch(action)
        }
      } catch (error) {
        alert(error)
      }
    }
  )
}

export const UploadTrainData = (file) => {
  return (
    async (dispatch) => {
      let formData = new FormData();
      formData.append('file', file)
      return axios.post(
        `/api/aws/s3/upload/json/train`, formData
      ).then(response => {
        // console.log('response', response)
        // JSON responses are automatically parsed.
        if(response.data){
          const action = GetS3TrainData(response.data.key.slice(6))
          dispatch(action)
        }
      }).catch(e => {
        this.errors.push(e);
      });
    }
  )
}

export const PostTrainData = (data) => {
  return (
    async (dispatch) => {
      try {
        const response = await axios.post('/api/model', data)
        if (response.data) {
          const response_modelList = await axios.get(`/api/project/${data.ProjectId}/model`)
          const action = DeliverData(response_modelList.data, Model_List)
          dispatch(action)
          return
        }
      } catch (e) {
        alert(e.response.data.message)
      }
    }
  )
}

export const DownloadImage = (filename) => {
  return (
    async () => {
      try {
        const response = await axios.get(
          `/api/aws/s3/getFile/image/${filename}.jpg`, //AWS
          { responseType: 'blob' }
        )
        const url = window.URL.createObjectURL(new Blob([response.data]))
        const link = document.createElement('a')
        link.href = url
        link.setAttribute('download', `${filename}.jpg`)
        document.body.appendChild(link)
        link.click()
      } catch (error) {
        alert(error)
      }
    }
  )
}

export const DownloadJSON = (filename) => {
  return (
    async () => {
      try {
        const response = await axios.get(
          `/api/aws/s3/getFile/json/${filename}.json`, //AWS
          { responseType: 'blob' }
        )
        const url = window.URL.createObjectURL(new Blob([response.data]))
        const link = document.createElement('a')
        link.href = url
        link.setAttribute('download', `${filename}.json`)
        document.body.appendChild(link)
        link.click()
      } catch (error) {
        alert(error)
      }
    }
  )
}


export const PostDeviceMQTT = (data) => {
  const sendData = { 'command': data.command }
  return (
    async (dispatch) => {
      try {
        await axios.post('/api/aws/iot/publish', sendData, {
          params: {
            topic: data.serialNumber,
            deviceName: data.deviceName
          }
        })
        alert(`Packet sent to (${data.serialNumber} - ${data.deviceName}) successfully!`)
        setTimeout(() => {
          location.reload()
        }, 300)
      } catch (error) {
        alert(error)
      }
    }
  )
}


export const PostAIServerMQTT = (data) => {
  const sendData = {
    'project': data.project,
    'modelName': data.modelName
  }
  return (
    async (dispatch) => {
      try {
        await axios.post('/api/aws/iot/publish/AIServer', sendData)
        alert(`Packet sent to AIServer successfully!`)
      } catch (error) {
        alert(error)
      }
    }
  )
}

// >>>

// <<< Import

export const UserImport = (id) => {
  return (
    async (dispatch) => {
      const action = DeliverData(id, User_Import)
      dispatch(action)
    }
  )
}

export const OrganizationImport = (id) => {
  return (
    async (dispatch) => {
      const action = DeliverData(id, Organization_Import)
      dispatch(action)
    }
  )
}

export const ProjectImport = (id) => {
  return (
    async (dispatch) => {
      const action = DeliverData(id, Project_Import)
      dispatch(action)
    }
  )
}

export const DataImport = (id) => {
  return (
    async (dispatch) => {
      const action = DeliverData(id, Data_Import)
      dispatch(action)
    }
  )
}

// >>>