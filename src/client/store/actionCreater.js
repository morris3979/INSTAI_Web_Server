import {
  Init_Model_Version_Table
} from './actionType'

export const InitModelVersionTable = (data) => {
  return ({
    type: Init_Model_Version_Table,
    value: data
  })
}