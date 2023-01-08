import React, { lazy } from 'react'
import { connect } from 'react-redux'

const UserRegisterForm = lazy(() => import('./UserRegisterForm'))
const OrganizationCreateForm = lazy(() => import('./OrganizationCreateForm'))

const RegisterForm = (props) => {

  
  const { loginauthorize, userInformation  } = props;

  if((!Object.keys(userInformation).length)&&(!loginauthorize)){
    return (
      <UserRegisterForm />
    )
  }else{
    return(
      <OrganizationCreateForm />
    )
  }
}

const mapStateToProps = (state) => {
  //state指的是store裡的數據
  return {
    userInformation: state.userInformation,
    loginauthorize: state.loginauthorize
  }
}

export default connect(mapStateToProps, null)(RegisterForm)