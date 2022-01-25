import React, { lazy, Suspense } from 'react'
import { Link, Route, Routes } from 'react-router-dom'
import { Layout, Menu, Spin } from 'antd'

const InitialPage = lazy(() => import('./page/initialPage'))
const MapPage = lazy(() => import('./page/mapPage'))
const LoginPage = lazy(() => import('./page/loginPage'))
const ModelVersionPage = lazy(() => import('./page/modelVersionPage'))

const { Content, Sider } = Layout
const { Item } = Menu

const App = () => {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider breakpoint='xl' collapsedWidth='0'>
        <Menu theme='dark' defaultSelectedKeys={['/']} selectedKeys={[]}>
          <Item key='/map'>
            <Link to='/map'>
              地圖資訊
            </Link>
          </Item>
          <Item key='/modelversion'>
            <Link to='/modelversion'>
              模型版本
            </Link>
          </Item>
          <Item key='/login'>
            <Link to='/login'>
              帳號登入
            </Link>
          </Item>
        </Menu>
      </Sider>
      <Layout>
        <Content>
          <Suspense fallback={<Spin size='large' />}>
            <Routes>
              <Route path='/' element={<InitialPage />} />
              <Route path='/map' element={<MapPage />} />
              <Route path='/modelversion' element={<ModelVersionPage />} />
              <Route path='/login' element={<LoginPage />} />
            </Routes>
          </Suspense>
        </Content>
      </Layout>
    </Layout >
  )
}

export default App