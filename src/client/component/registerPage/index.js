import React, { lazy } from 'react'
import { connect } from 'react-redux'

const RegisterForm = lazy(() => import('./RegisterForm'))
const OrganizationForm = lazy(() => import('./OrganizationForm'))

const Register = (props) => {
  const { loginAuthorize, userInformation  } = props

  if((!Object.keys(userInformation).length)&&(!loginAuthorize)){
    return (
      <RegisterForm />
    )
  }else{
    return(
      <OrganizationForm />
    )
  }
}

const mapStateToProps = (state) => {
  //state指的是store裡的數據
  return {
    userInformation: state.userInformation,
    loginAuthorize: state.loginAuthorize
  }
}

export default connect(mapStateToProps, null)(Register)