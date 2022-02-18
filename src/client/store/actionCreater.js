import axios from 'axios'
import { message } from 'antd'
import {
  Model_Version_Table, Table_Status, Map_Position, Status_Table,
  Model_A_Table, Model_B_Table, Model_C_Table, Modal_File
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
        const action = TableData(response.data, Model_Version_Table)
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