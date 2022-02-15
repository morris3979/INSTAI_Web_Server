import axios from 'axios'
import { message } from 'antd'
import {
  Model_Version_Table,
  Table_Status,
  Map_Position,
  Status_Table
} from './actionType'

export const TableStatus = () => {
  return ({
    type: Table_Status
  })
}

export const ModelVersionTable = (data) => {
  return ({
    type: Model_Version_Table,
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
        const action = ModelVersionTable(response.data)
        dispatch(action)
        message.success('完成')
      } catch (error) {
        message.error(`${error}`)
      } finally {
        const action = TableStatus()
        dispatch(action)
      }
    }
  )
}

export const MapPosition = (data) => {
  return ({
    type: Map_Position,
    value: data
  })
}

export const StatusTable = (data) => {
  return ({
    type: Status_Table,
    value: data
  })
}
export const GetStatusTableData = () => {
  return (
    async (dispatch) => {
      const action = TableStatus()
      dispatch(action)
      try {
        const response = await axios.get('http://localhost:8080/api/details')
        /*let filterData = response.data.filter((value) => { return (value.CarNumber.modelName[0] == 'A') })
        console.log(filterData)*/
        const action = StatusTable(response.data)
        dispatch(action)
        message.success('完成')
      } catch (error) {
        message.error(`${error}`)
      } finally {
        const action = TableStatus()
        dispatch(action)
      }
    }
  )
}

export const ShowModal = () => {
  return ({
    type: 'show_modal'
  })
}
export const CloseModalOk = () => {
  return ({
    type: 'close_modal_ok'
  })
}
export const CloseModalCancel = () => {
  return ({
    type: 'close_modal_cancel'
  })
}