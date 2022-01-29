import React, { Fragment } from 'react'
import { Form, Input, Button, Divider, Typography } from 'antd'

const { Item } = Form
const { Password } = Input
const { Title } = Typography

const passwordConfirm = ({ getFieldValue }) => {
  return ({
    validator(_, value) {
      if (!value || getFieldValue('registerPassword') === value) {
        return Promise.resolve()
      } else {
        return Promise.reject('與您設置的密碼尚未符合')
      }
    }
  })
}

const RegisterForm = () => {
  return (
    <Fragment>
      <Title>
        帳號註冊
      </Title>
      <Divider />
      <Form size='large' layout='vertical'>
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
          label='Confirm Password'
          name='registerConfirmPassword'
          dependencies={['registerPassword']}
          rules={[
            { required: true, message: '請再次輸入密碼' },
            passwordConfirm
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