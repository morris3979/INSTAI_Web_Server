import { Init_Model_Version_Table } from './actionType'

export const InitModelVersionTable = (data) => {
  console.log(data)
  return ({
    type: Init_Model_Version_Table,
    data
  })
}