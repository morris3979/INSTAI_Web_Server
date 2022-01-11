import React from 'react'
import { Form, Input, Button } from 'antd'

const { Item } = Form
const { Password } = Input

const LoginForm = () => {
  return (
    <Form>
      <Item
        label='Username'
        name='username'
        rules={[{ required: true, message: '請輸入名稱' }]}
      >
        <Input />
      </Item>
      <Item
        label='Password'
        name='password'
        rules={[{ required: true, message: '請輸入名稱' }]}
      >
        <Password />
      </Item>
      <Item>
        <Button>
          確定
        </Button>
      </Item>
    </Form>
  )
}

export default LoginForm