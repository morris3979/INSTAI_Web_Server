import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import {
  Form,
  Input,
  Button,
  Divider,
  Typography
} from 'antd'
import { RegisterFormData } from '../../store/actionCreater'

const { Item } = Form
const { Password } = Input
const { Title } = Typography

const passwordConfirm = ({ getFieldValue }) => {
  return ({
    validator(_, value) {
      if (!value || getFieldValue('registerpassword') === value) {
        return Promise.resolve()
      } else {
        return Promise.reject('與您設置的密碼尚未符合')
      }
    }
  })
}

const RegisterForm = (props) => {
  const { onFinish } = props

  return (
    <Fragment>
      <Title>
        Register
      </Title>
      <Divider />
      <Form size='large' layout='vertical' onFinish={onFinish}>
        <Item
          label='Username'
          name='registerusername'
          rules={[{ required: true, message: 'Please Input Username' }]}
        >
          <Input />
        </Item>
        <Item
          label='Password'
          name='registerpassword'
          rules={[{ required: true, message: 'Please Input Password' }]}
        >
          <Password />
        </Item>
        <Item
          label='Confirm Password'
          name='registerConfirmPassword'
          dependencies={['registerpassword']}
          rules={[
            { required: true, message: 'Please Input Username Again' },
            passwordConfirm
          ]}
        >
          <Password />
        </Item>
        <Item>
          <Button htmlType='submit'>
            submit
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
      const action = RegisterFormData(value)
      dispatch(action)
    }
  }
}

export default connect(null, mapDispatchToProps)(RegisterForm)