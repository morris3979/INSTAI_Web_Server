import React, { lazy } from 'react'
import { connect } from 'react-redux'
import {
  GetAccountTableData,
  LogoutData,
  WhichProject
} from './store/actionCreater'

const LoginPage = lazy(() => import('./page/loginPage'))
const RegisterPage = lazy(() => import('./page/registerPage'))
const InitialPage = lazy(() => import('./page/initialPage'))

const App = (props) => {

    const { loginState, loginInformation } = props
    console.log(loginInformation)
    if(loginInformation.developer == true ||
       loginInformation.admin == true ||
       loginInformation.user == true){
        return(
          <InitialPage/>
        )
    }else{
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
  }


const mapStateToProps = (state) => {
  //state指的是store裡的數據
  return {
    loginState: state.loginState,
    loginInformation: state.loginInformation
  }
}

export default connect(mapStateToProps, null)(App)