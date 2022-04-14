import React from 'react'
import { Input, Button, Space, DatePicker } from 'antd'
import { SearchOutlined } from '@ant-design/icons'

export const CarNumberFilter = ({ setSelectedKeys, selectedKeys, confirm }) => {
  const onClick = () => { confirm() }

  const onChange = (event) => {
    if (event.target.value) {
      return (
        setSelectedKeys([event.target.value])
      )
    } else {
      return (
        setSelectedKeys([])
      )
    }
  }

  return (
    <Space>
      <Input
        bordered={false}
        placeholder='搜尋資料'
        size='large'
        value={selectedKeys}
        onChange={onChange}
      />
      <Button
        type='text'
        size='large'
        onClick={onClick}
        icon={<SearchOutlined />}
      />
    </Space>
  )
}
export const CarNumberOnFilter = (value, record) => {
  if (record.CarNumber) {
    return (
      record.CarNumber.plateNumber.toLowerCase().includes(value.toLowerCase())
    )
  }
}

export const DateFilter = ({ setSelectedKeys, selectedKeys, confirm }) => {
  const onClick = () => { confirm() }

  const onChange = (value) => {
    if (value) {
      return (
        setSelectedKeys([value.format('YYYY-MM-DD')])
      )
    } else {
      return (
        setSelectedKeys([])
      )
    }
  }

  return (
    <Space>
      <DatePicker
        bordered={false} size='large' onChange={onChange}
      />
      <Button
        type='text' size='large' onClick={onClick} icon={<SearchOutlined />}
      />
    </Space>
  )
}
export const DateOnFilter = (value, record) => {
  if (record.createAt) {
    return (
      record.createAt.toLowerCase().includes(value.toLowerCase())
    )
  }
}

export const DateChange = (text) => {
  if (text.createAt) {
    return (
      text.createAt.slice(0, -5).replace('T', ' ')
    )
  }
}