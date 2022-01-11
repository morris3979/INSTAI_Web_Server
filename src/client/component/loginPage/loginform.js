import React from 'react'
import { Form, Input, Button } from 'antd'

const { Item } = Form

const LoginForm = () => {
  return (
    <Form>
      <Item
        rules={{ required: true, message: '請輸入名稱' }}
      >
        <Input />
      </Item>
      <Item
        rules={{ required: true, message: '請輸入名稱' }}
      >
        <Input />
      </Item>
    </Form>
  )
}

export default LoginForm