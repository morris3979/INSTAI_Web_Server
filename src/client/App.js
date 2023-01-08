import React, { lazy, Suspense } from 'react'
import { connect } from 'react-redux'
import { Route, Routes } from 'react-router-dom'
import Loading from './loading'

const LoginPage = lazy(() => import('./page/loginPage'))
const RegisterPage = lazy(() => import('./page/registerPage'))
const InitialPage = lazy(() => import('./page/initialPage'))

const App = (props) => {
  const { loginState, selectedOrganization } = props

  if(selectedOrganization){
      return(
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path='/' element={<InitialPage/>} />
          </Routes>
        </Suspense>
      )
  }else{
    if(loginState){
      return(
        <LoginPage/>
      )
    }else{
      return (
        <RegisterPage/>
      )
    }
  }
}

const mapStateToProps = (state) => {
  //state指的是store裡的數據
  return {
    loginState: state.loginState,
    selectedOrganization: state.selectedOrganization
  }
}

export default connect(mapStateToProps, null)(App)