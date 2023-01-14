import React, { lazy, Suspense } from 'react'
import { connect } from 'react-redux'
import { Link, Route, Routes } from 'react-router-dom'
import Loading from './loading'

const LoginPage = lazy(() => import('./page/LoginPage'))
const RegisterPage = lazy(() => import('./page/RegisterPage'))
const CreateOrganizationPage = lazy(() => import('./page/CreateOrganizationPage'))
const SelectOrganizationPage = lazy(() => import('./page/SelectOrganizationPage'))
const HomePage = lazy(() => import('./page/HomePage'))
const DataPage = lazy(() => import('./page/DataPage'))
const InitialPage = lazy(() => import('./page/initialPage'))

const App = (props) => {
  return(
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path='/' element={<LoginPage/>} />
        <Route path='/Register' element={<RegisterPage/>} />
        <Route path='/CreateOrganization' element={<CreateOrganizationPage/>} />
        <Route path='/SelectOrganization' element={<SelectOrganizationPage/>} />
        <Route path='/Home' element={<HomePage/>} />
        <Route path='/Data' element={<DataPage/>} />
        <Route path='/Initial' element={<InitialPage/>} />
      </Routes>
    </Suspense>
  )
}

const mapStateToProps = (state) => {
  //state指的是store裡的數據
  return {}
}

export default connect(mapStateToProps, null)(App)