import React, { lazy, Suspense } from 'react'
import { Layout, Menu, Spin } from 'antd'
import { Link, Route, Routes } from 'react-router-dom'
import 'antd/dist/antd.css'

const InitialPage = lazy(() => import('./page/initialPage'))
const MainPage = lazy(() => import('./page/mainPage'))
const MaintainPage = lazy(() => import('./page/maintainPage'))
const LoginPage = lazy(() => import('./page/loginPage'))

const { Content, Sider } = Layout
const { Item } = Menu

const App = () => {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider breakpoint='xl' collapsedWidth='0'>
        <Menu theme='dark' defaultSelectedKeys={['/']} selectedKeys={[]}>
          <Item key='/main'>
            <Link to='/main'>
              主畫面
            </Link>
          </Item>
          <Item key='/maintain'>
            <Link to='/maintain'>
              頁面維護
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
          <Suspense
            fallback={
              <div style={{ textaligh: 'center', lineheight: '100vh' }}>
                <Spin size='large' />
              </div>
            }
          >
            <Routes>
              <Route path='/' element={<InitialPage />} />
              <Route path='/main' element={<MainPage />} />
              <Route path='/maintain' element={<MaintainPage />} />
              <Route path='/login' element={<LoginPage />} />
            </Routes>
          </Suspense>
        </Content>
      </Layout>
    </Layout >
  )
}

export default App