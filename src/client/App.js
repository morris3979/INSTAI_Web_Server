import React, { lazy, Suspense } from 'react'
import { connect } from 'react-redux'
import { Link, Route, Routes } from 'react-router-dom'
import { Layout, Menu } from 'antd'
import Loading from './loading'

const InitialPage = lazy(() => import('./page/initialPage'))
const MapPage = lazy(() => import('./page/mapPage'))
const ModelVersionPage = lazy(() => import('./page/modelVersionPage'))
const StatusPage = lazy(() => import('./page/statusPage'))
const ModelAPage = lazy(() => import('./page/modelAPage'))
const ModelBPage = lazy(() => import('./page/modelBPage'))
const ModelCPage = lazy(() => import('./page/modelCPage'))
const Resource = lazy(() => import('./page/resourcePage'))
const LoginPage = lazy(() => import('./page/loginPage'))
const Test = lazy(() => import('./component/reportPage/test'))

const { Content, Sider } = Layout
const { Item, SubMenu } = Menu

const App = (props) => {
  const { loginInformation } = props

  if (loginInformation.admin == true) {
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider breakpoint='md' collapsedWidth='0'>
          <Menu theme='dark' selectedKeys={[]}>
            <Item key='/map' disabled={!loginInformation.admin}>
              <Link to='/map'>
                地圖資訊
              </Link>
            </Item>
            <SubMenu key='subreport' title='報表查詢' disabled={!loginInformation.admin}>
              <Item key='status'>
                <Link to='/status'>
                  一般狀態
                </Link>
              </Item>
              <Item key='modelA'>
                <Link to='/modelA'>
                  模型A
                </Link>
              </Item>
              <Item key='modelB'>
                <Link to='modelB'>
                  模型B
                </Link>
              </Item>
              <Item key='modelC'>
                <Link to='modelC'>
                  模型C
                </Link>
              </Item>
            </SubMenu>
            <Item key='/modelversion' disabled={!loginInformation.admin}>
              <Link to='/modelversion'>
                版號與模型配置
              </Link>
            </Item>
            <Item key='/resource' disabled={!loginInformation.admin}>
              <Link to='/resource'>
                關於
              </Link>
            </Item>
            <Item key='/test'>
              <Link to='/test'>
                測試用
              </Link>
            </Item>
          </Menu>
        </Sider>
        <Layout>
          <Content>
            <Suspense fallback={<Loading />}>
              <Routes>
                <Route path='/' element={<InitialPage />} />
                <Route path='/map' element={<MapPage />} />
                <Route path='/status' element={<StatusPage />} />
                <Route path='/modelA' element={<ModelAPage />} />
                <Route path='/modelB' element={<ModelBPage />} />
                <Route path='/modelC' element={<ModelCPage />} />
                <Route path='/modelversion' element={<ModelVersionPage />} />
                <Route path='/resource' element={<Resource />} />
                <Route path='/test' element={<Test />} />
              </Routes>
            </Suspense>
          </Content>
        </Layout>
      </Layout >
    )
  } else {
    return (
      <LoginPage />
    )
  }
}

const mapStateToProps = (state) => {
  //state指的是store裡的數據
  return {
    loginInformation: state.loginInformation
  }
}

export default connect(mapStateToProps)(App)