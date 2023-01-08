import React, { lazy } from 'react'
import { connect } from 'react-redux'

const LoginForm = lazy(() => import('./LoginForm'))
const OrganizationForm = lazy(() => import('./OrganizationForm'))

const Login = (props) => {
  const { loginInformation } = props

  if(loginInformation.developer == true ||
    loginInformation.admin == true ||
    loginInformation.user == true){
      return(
        <OrganizationForm />
      )
    }else{
      return (
        <LoginForm />
      )
    }
}

const mapStateToProps = (state) => {
  //state指的是store裡的數據
  return {
    loginInformation: state.loginInformation
  }
}

export default connect(mapStateToProps, null)(Login)