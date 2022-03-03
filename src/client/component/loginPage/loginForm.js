import React, { Fragment } from 'react'
import { Form, Input, Button, Divider, Typography } from 'antd'

const { Item } = Form
const { Password } = Input
const { Title } = Typography

const LoginForm = () => {
  return (
    <Fragment>
      <Title>
        帳號登入
      </Title>
      <Divider />
      <Form size='large' layout='vertical'>
        <Item
          label='Username'
          name='loginusername'
          rules={[{ required: true, message: '請輸入帳號' }]}
        >
          <Input />
        </Item>
        <Item
          label='Password'
          name='loginpassword'
          rules={[{ required: true, message: '請輸入密碼' }]}
        >
          <Password />
        </Item>
        <Item>
          <Button>
            登入
          </Button>
        </Item>
      </Form>
    </Fragment>
  )
}

export default LoginForm