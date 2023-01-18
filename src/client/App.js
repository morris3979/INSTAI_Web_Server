import React, { lazy, Suspense } from 'react'
import { connect } from 'react-redux'
import { Route, Routes } from 'react-router-dom'
import Loading from './loading'
import Box from '@mui/material/Box';

const LoginPage = lazy(() => import('./page/LoginPage'))
const RegisterPage = lazy(() => import('./page/RegisterPage'))
const CreateOrganizationPage = lazy(() => import('./page/CreateOrganizationPage'))
const SelectOrganizationPage = lazy(() => import('./page/SelectOrganizationPage'))
const HomePage = lazy(() => import('./page/HomePage'))
const DataPage = lazy(() => import('./page/DataPage'))
const DevicePage = lazy(() => import('./page/DevicePage'))
const OrganizationPage = lazy(() => import('./page/OrganizationPage'))
const InitialPage = lazy(() => import('./page/initialPage'))

const App = (props) => {
  return(
    <Suspense fallback={<Loading />}>
      <Box
        sx={{
          minHeight: '100vh',
          minWidth: '100vw',
          position: 'absolute',
          top: 0,
          left: 0,
          backgroundColor: '#1c2127',
        }}>
        <Routes>
          <Route path='/' element={<LoginPage/>} />
          <Route path='/Register' element={<RegisterPage/>} />
          <Route path='/CreateOrganization' element={<CreateOrganizationPage/>} />
          <Route path='/SelectOrganization' element={<SelectOrganizationPage/>} />
          <Route path='/Home' element={<HomePage/>} />
          <Route path='/Data' element={<DataPage/>} />
          <Route path='/Device' element={<DevicePage/>} />
          <Route path='/Organization' element={<OrganizationPage/>} />
          <Route path='/Initial' element={<InitialPage/>} />
        </Routes>
      </Box>
    </Suspense>
  )
}

const mapStateToProps = (state) => {
  //state指的是store裡的數據
  return {}
}

export default connect(mapStateToProps, null)(App)