import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { Form, Input, Button, Divider, Typography, Checkbox } from 'antd'
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
      <Title style={{ color: 'white '}}>
        <LoginOutlined /> InstAI
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
        name='loginusername'
        rules={[{ required: true, message: 'Please input username' }]}
      >
          <Input
            allowClear
            style={ border }
            prefix={<UserOutlined />}
            placeholder='Username'
          />
        </Item>
        <Item
          name='loginpassword'
          rules={[{ required: true, message: 'Please input password' }]}
        >
          <Password
            allowClear
            style={ border }
            prefix={<LockOutlined />}
            placeholder='Password'
          />
        </Item>
        <Item>
          <Item name="remember" valuePropName="checked" noStyle>
            <Checkbox style={{ color: 'white' }}>Remember me</Checkbox>
          </Item>
        </Item>
        <Item>
            <Button
              style={ border }
              htmlType='submit'
              type='primary'
              block
            >
              Login
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