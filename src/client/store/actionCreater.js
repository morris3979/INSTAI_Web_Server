import axios from 'axios'
import { message } from 'antd'
import {
  Init_Model_Version_Table,
  Model_Version_Table_Status,
  Map_Position
} from './actionType'

export const ModelVersionTableStatus = () => {
  return ({
    type: Model_Version_Table_Status
  })
}

export const InitModelVersionTable = (data) => {
  return ({
    type: Init_Model_Version_Table,
    value: data
  })
}

export const GetModelVersionTableData = () => {
  return (
    async (dispatch) => {
      const action = ModelVersionTableStatus()
      dispatch(action)
      try {
        const response = await axios.get('http://localhost:8080/api/carnumber')
        const action = InitModelVersionTable(response.data)
        dispatch(action)
        message.success('完成')
      } catch (error) {
        message.error(`${error}`)
      } finally {
        const action = ModelVersionTableStatus()
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