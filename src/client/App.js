import React, { lazy } from 'react'
import { connect } from 'react-redux'
import {
  GetAccountTableData,
  LogoutData,
  WhichProject
} from './store/actionCreater'

const LoginPage = lazy(() => import('./page/loginPage'))
const RegisterPage = lazy(() => import('./page/registerPage'))

const App = (props) => {
  const { loginState } = props

  if(loginState){
    return(
      <LoginPage />
    )
  }else{
    return (
      <RegisterPage />
    )
  }
}


const mapStateToProps = (state) => {
  //state指的是store裡的數據
  return {
    loginState: state.loginState
  }
}

export default connect(mapStateToProps, null)(App)