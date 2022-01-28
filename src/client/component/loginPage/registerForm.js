import React, { Fragment } from 'react'
import { Form, Input, Button, Divider, Typography } from 'antd'

const { Item } = Form
const { Password } = Input
const { Title } = Typography

const RegisterForm = () => {
  return (
    <Fragment>
      <Title>
        帳號註冊
      </Title>
      <Divider />
      <Form size='large'>
        <Item
          label='Username'
          name='registerUsername'
          rules={[{ required: true, message: '請輸入帳號' }]}
        >
          <Input />
        </Item>
        <Item
          label='Password'
          name='registerPassword'
          rules={[{ required: true, message: '請輸入密碼' }]}
        >
          <Password />
        </Item>
        <Item
          label='ConfirmPassword'
          name='registerConfirmPassword'
          rules={[
            { required: true, message: '請再次輸入密碼' },
            ({ getFieldValue }) => {
              return ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve()
                  } else {
                    return Promise.reject(Error('與您設置的密碼尚未符合'))
                  }
                }
              })
            }
          ]}
        >
          <Password />
        </Item>
        <Item>
          <Button>
            註冊
          </Button>
        </Item>
      </Form>
    </Fragment>
  )
}

export default RegisterForm