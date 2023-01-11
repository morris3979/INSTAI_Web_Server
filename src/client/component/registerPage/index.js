import React, { lazy } from 'react'
import { connect } from 'react-redux'

const Register = lazy(() => import('./Register'))
const CreateOrganization = lazy(() => import('./CreateOrganization'))

const RegisterEndpoint = (props) => {
  const { loginAuthorize, registerInformation } = props

  if((!Object.keys(registerInformation).length)&&(!loginAuthorize)){
    return (
      <Register />
    )
  }else{
    return(
      <CreateOrganization />
    )
  }
}

const mapStateToProps = (state) => {
  //state指的是store裡的數據
  return {
    registerInformation: state.registerInformation,
    loginAuthorize: state.loginAuthorize
  }
}

export default connect(mapStateToProps, null)(RegisterEndpoint)