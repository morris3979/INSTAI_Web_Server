import React, { lazy, Suspense } from 'react'
import { connect } from 'react-redux'
import { Route, Routes } from 'react-router-dom'
import Loading from './loading'

const LoginPage = lazy(() => import('./page/loginPage'))
const RegisterPage = lazy(() => import('./page/registerPage'))
const InitialPage = lazy(() => import('./page/initialPage'))

const App = (props) => {
  return(
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path='/' element={<LoginPage/>} />
        <Route path='/Register' element={<RegisterPage/>} />
        <Route path='/Home' element={<InitialPage/>} />
      </Routes>
    </Suspense>
  )
}

const mapStateToProps = (state) => {
  //state指的是store裡的數據
  return {}
}

export default connect(mapStateToProps, null)(App)