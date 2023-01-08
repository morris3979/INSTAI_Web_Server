import React, { lazy } from 'react'
import { connect } from 'react-redux'

const UserLoginForm = lazy(() => import('./UserLoginForm'))
const OrganizationSelectForm = lazy(() => import('./OrganizationSelectForm'))

const LoginForm = (props) => {

  const { loginInformation } = props;

  if(loginInformation.developer == true ||
    loginInformation.admin == true ||
    loginInformation.user == true){
      return(
        <OrganizationSelectForm />
      )
    }else{
      return (
        <UserLoginForm />
      )
    }
}

const mapStateToProps = (state) => {
  //state指的是store裡的數據
  return {
    loginInformation: state.loginInformation
  }
}

export default connect(mapStateToProps, null)(LoginForm)