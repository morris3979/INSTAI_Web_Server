import axios from 'axios'
import { message, Modal } from 'antd'
import {
  Table_Status, Map_Position, Modal_File, Which_Modal,
  Which_Project, Which_Host, Which_Device, Login_State
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