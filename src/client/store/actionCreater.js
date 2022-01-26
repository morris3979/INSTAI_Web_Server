import axios from 'axios'
import { message } from 'antd'
import {
  Init_Model_Version_Table
} from './actionType'

message.config({ maxCount: 1 })

export const InitModelVersionTable = (data) => {
  return ({
    type: Init_Model_Version_Table,
    value: data
  })
}

export const GetModelVersionTableData = () => {
  return (
    async (dispatch) => {
      message.loading('載入中...', 0)
      try {
        const response = await axios.get('http://localhost:8080/api/carnumber')
        const action = InitModelVersionTable(response.data)
        dispatch(action)
        message.success('完成')
      } catch (error) {
        message.error(`${error}`)
      }
    }
  )
}