import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { Form, Input, Button, Divider, Typography } from 'antd'
import { LoginFormData } from '../../store/actionCreater'

import {
  LoginOutlined,
  UserOutlined,
  LockOutlined
} from '@ant-design/icons'

const { Item } = Form
const { Password } = Input
const { Title } = Typography
const border = {
    borderTopLeftRadius: '12px',
    borderTopRightRadius: '12px',
    borderBottomLeftRadius: '12px',
    borderBottomRightRadius: '12px',
}

const LoginForm = (props) => {
  const { onFinish } = props

  return (
    <Fragment>
      <Title>
        <LoginOutlined /> INSTAI
      </Title>
      <Divider />
      <Form
        layout='vertical'
        size='large'
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
      >
        <Item
          label='Username'
          name='loginusername'
          rules={[{ required: true, message: 'Please input username' }]}
        >
          <Input
            style={ border }
            prefix={<UserOutlined />}
            placeholder='Username'
          />
        </Item>
        <Item
          label='Password'
          name='loginpassword'
          rules={[{ required: true, message: 'Please input password' }]}
        >
          <Password
            style={ border }
            prefix={<LockOutlined />}
            placeholder='Password'
          />
        </Item>
        <Item>
            <Button
              style={ border }
              htmlType='submit'
              type='primary'
              block
            >
              Log in
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