import React, { lazy, Suspense } from 'react'
import { Layout, Menu } from 'antd'
import { Link, Route, Routes } from 'react-router-dom'
import { LoadingOutlined } from '@ant-design/icons'
import 'antd/dist/antd.css'

const InitialPage = lazy(() => import('./page/initialPage'))
const MainPage = lazy(() => import('./page/mainPage'))
const MaintainPage = lazy(() => import('./page/maintainPage'))
const LoginPage = lazy(() => import('./page/loginPage'))
const OnlyTest = lazy(() => import('./component/reportPage/onlytest'))

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
          <Item key='/test'>
            <Link to='/test'>
              測試用
            </Link>
          </Item>
        </Menu>
      </Sider>
      <Layout>
        <Content>
          <Suspense
            fallback={
              <LoadingOutlined
                style={{ textAlign: 'center', fontSize: 10 }}
              />
            }
          >
            <Routes>
              <Route path='/' element={<InitialPage />} />
              <Route path='/main' element={<MainPage />} />
              <Route path='/maintain' element={<MaintainPage />} />
              <Route path='/login' element={<LoginPage />} />
              <Route path='/test' element={<OnlyTest />} />
            </Routes>
          </Suspense>
        </Content>
      </Layout>
    </Layout >
  )
}

export default App