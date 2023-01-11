import React, { lazy } from 'react'
import { connect } from 'react-redux'

const Login = lazy(() => import('./Login'))
const SelectOrganization = lazy(() => import('./SelectOrganization'))

const LoginEndpoint = (props) => {
  const { loginInformation } = props

  const auth = loginInformation.admin == true || loginInformation.user == true

  if(auth){
      return(
        <SelectOrganization key={'/SelectOrganization'} />
      )
    }else{
      return (
        <Login key={'/'}/>
      )
    }
}

const mapStateToProps = (state) => {
  //state指的是store裡的數據
  return {
    loginInformation: state.loginInformation
  }
}

export default connect(mapStateToProps, null)(LoginEndpoint)