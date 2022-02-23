import axios from 'axios'
import { message, Modal } from 'antd'
import {
  Get_Model_Version_Table, Table_Status, Map_Position, Status_Table,
  Model_A_Table, Model_B_Table, Model_C_Table, Modal_File, Which_Modal
} from './actionType'

export const MapPosition = (data) => {
  return ({
    type: Map_Position,
    value: data
  })
}

export const TableStatus = () => {
  return ({
    type: Table_Status
  })
}

export const TableData = (data, actionType) => {
  return ({
    type: actionType,
    value: data
  })
}

export const GetModelVersionTableData = () => {
  return (
    async (dispatch) => {
      const action = TableStatus()
      dispatch(action)
      try {
        const response = await axios.get('http://localhost:8080/api/carnumber')
        const action = TableData(response.data, Get_Model_Version_Table)
        dispatch(action)
      } catch (error) {
        message.error(`${error}`)
      } finally {
        const action = TableStatus()
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
        await axios.delete(`http://localhost:8080/api/carnumber/${id}`)
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
        await axios.patch(`http://localhost:8080/api/carnumber/${id}`, data)
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
        await axios.post('http://localhost:8080/api/carnumber', data)
        message.destroy()
        Modal.success({
          title: '新增成功',
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

export const GetStatusTableData = () => {
  return (
    async (dispatch) => {
      const action = TableStatus()
      dispatch(action)
      try {
        const response = await axios.get('http://localhost:8080/api/details')
        const action = TableData(response.data, Status_Table)
        dispatch(action)
      } catch (error) {
        message.error(`${error}`)
      } finally {
        const action = TableStatus()
        dispatch(action)
      }
    }
  )
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

export const GetModelATableData = () => {
  return (
    async (dispatch) => {
      const action = TableStatus()
      dispatch(action)
      try {
        const response = await axios.get('http://localhost:8080/api/details')
        const filterData = response.data.filter((value) => {
          return (value.CarNumber.modelName[0] == 'A')
        })
        const action = TableData(filterData, Model_A_Table)
        dispatch(action)
      } catch (error) {
        message.error(`${error}`)
      } finally {
        const action = TableStatus()
        dispatch(action)
      }
    }
  )
}

export const GetModelBTableData = () => {
  return (
    async (dispatch) => {
      const action = TableStatus()
      dispatch(action)
      try {
        const response = await axios.get('http://localhost:8080/api/details')
        const filterData = response.data.filter((value) => {
          return (value.CarNumber.modelName[0] == 'B')
        })
        const action = TableData(filterData, Model_B_Table)
        dispatch(action)
      } catch (error) {
        message.error(`${error}`)
      } finally {
        const action = TableStatus()
        dispatch(action)
      }
    }
  )
}

export const GetModelCTableData = () => {
  return (
    async (dispatch) => {
      const action = TableStatus()
      dispatch(action)
      try {
        const response = await axios.get('http://localhost:8080/api/details')
        const filterData = response.data.filter((value) => {
          return (value.CarNumber.modelName[0] == 'C')
        })
        const action = TableData(filterData, Model_C_Table)
        dispatch(action)
      } catch (error) {
        message.error(`${error}`)
      } finally {
        const action = TableStatus()
        dispatch(action)
      }
    }
  )
}