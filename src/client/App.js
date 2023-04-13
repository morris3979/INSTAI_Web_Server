import React, { lazy, Suspense } from 'react'
import { connect } from 'react-redux'
import { Route, Routes } from 'react-router-dom'
import Loading from './loading'
import Box from '@mui/material/Box';

const LoginPage = lazy(() => import('./page/loginPage'))
const RegisterPage = lazy(() => import('./page/registerPage'))
const CreatePage = lazy(() => import('./page/organization/createPage'))
const SelectPage = lazy(() => import('./page/organization/selectPage'))
const ManagementPage = lazy(() => import('./page/organization/managementPage'))
const UserPage = lazy(() => import('./page/organization/userPage'))
const HomePage = lazy(() => import('./page/homePage'))
const ProjectOverviewPage = lazy(() => import('./page/project/overviewPage'))
const ProjectDataPage = lazy(() => import('./page/project/dataPage'))
const ProjectDevicePage = lazy(() => import('./page/project/devicePage'))
const ProjectModelPage = lazy(() => import('./page/project/modelPage'))
const ProjectDetectorPage = lazy(() => import('./page/project/detectorPage'))
const AnnotationPage = lazy(() => import('./page/annotationPage'))
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
          <Route path='/Organization/Create' element={<CreatePage/>} />
          <Route path='/Organization/Select' element={<SelectPage/>} />
          <Route path='/Organization/Management' element={<ManagementPage/>} />
          <Route path='/Organization/User' element={<UserPage/>} />
          <Route path='/Home' element={<HomePage/>} />
          <Route path='/Project/Overview' element={<ProjectOverviewPage/>} />
          <Route path='/Project/Data' element={<ProjectDataPage/>} />
          <Route path='/Project/Device' element={<ProjectDevicePage/>} />
          <Route path='/Project/Model' element={<ProjectModelPage/>} />
          <Route path='/Project/Detector' element={<ProjectDetectorPage/>} />
          <Route path='/Annotation' element={<AnnotationPage/>} />
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