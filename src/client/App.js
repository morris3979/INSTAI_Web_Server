import React, { lazy } from 'react'
import { connect } from 'react-redux'
import {
  GetAccountTableData,
  LogoutData,
  GetProjectList,
  GetHostList,
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
    accountData: state.accountData,
    loginInformation: state.loginInformation,
    projectList: state.projectList,
    loginState: state.loginState
  }
}

const mapDispatchToProps = (dispatch) => {
  //dispatch指store.dispatch這個方法
  return {
    getAccountTableData() {
      const action = GetAccountTableData()
      dispatch(action)
    },
    onClick() {
      const action = LogoutData()
      dispatch(action)
    },
    getProjectList() {
      const action = GetProjectList()
      dispatch(action)
    },
    getHostList() {
      const action = GetHostList()
      dispatch(action)
    },
    whichProject(text) {
      const action = WhichProject(text)
      dispatch(action)
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)