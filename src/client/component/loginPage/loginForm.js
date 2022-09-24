import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { Form, Input, Button, Divider, Typography } from 'antd'
import { LoginFormData } from '../../store/actionCreater'

import {LoginOutlined} from '@ant-design/icons'

const { Item } = Form
const { Password } = Input
const { Title } = Typography

const LoginForm = (props) => {
  const { onFinish } = props

  return (
    <Fragment>
      <Title>
        <LoginOutlined /> 登入
      </Title>
      <Divider />
      <Form size='large' layout='vertical' onFinish={onFinish}>
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
          <Button htmlType='submit'>
            登入
          </Button>
        </Item>
      </Form>
    </Fragment>
  )
}

const mapDispatchToProps = (dispatch) => {
  //dispatch指store.dispatch這個方法
  return {
    onFinish(value) {
      const action = LoginFormData(value)
      dispatch(action)
    }
  }
}

export default connect(null, mapDispatchToProps)(LoginForm)