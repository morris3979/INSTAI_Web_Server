import React, { lazy, Suspense } from 'react'
import { connect } from 'react-redux'
import { Route, Routes } from 'react-router-dom'
import Loading from './loading'
import Box from '@mui/material/Box';

const LoginPage = lazy(() => import('./page/loginPage'))
const RegisterPage = lazy(() => import('./page/registerPage'))
const OrganizationCreatePage = lazy(() => import('./page/organizationCreatePage'))
const OrganizationSelectPage = lazy(() => import('./page/organizationSelectPage'))
const HomePage = lazy(() => import('./page/homePage'))
const ProjectDataPage = lazy(() => import('./page/projectDataPage'))
const ProjectDevicePage = lazy(() => import('./page/projectDevicePage'))
const ProjectDetectorPage = lazy(() => import('./page/projectDetectorPage'))
const OrganizationManegePage = lazy(() => import('./page/organizationManegePage'))
const LabelClassPage = lazy(() => import('./page/labelClassPage'))
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
        }}
      >
        <Routes>
          <Route path='/' element={<LoginPage/>} />
          <Route path='/Register' element={<RegisterPage/>} />
          <Route path='/CreateOrganization' element={<OrganizationCreatePage/>} />
          <Route path='/SelectOrganization' element={<OrganizationSelectPage/>} />
          <Route path='/Home' element={<HomePage/>} />
          <Route path='/Data' element={<ProjectDataPage/>} />
          <Route path='/Device' element={<ProjectDevicePage/>} />
          <Route path='/Detector' element={<ProjectDetectorPage/>} />
          <Route path='/Organization' element={<OrganizationManegePage/>} />
          <Route path='/Label' element={<LabelClassPage/>} />
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