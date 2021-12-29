import React, { lazy, Suspense } from 'react'
import { connect } from 'react-redux'
import { Layout, Menu } from 'antd'
import { Link, Route, Routes } from 'react-router-dom'
import { LoadingOutlined } from '@ant-design/icons'
import 'antd/dist/antd.css'

const MainPage = lazy(() => import('./page/mainPage'))
const MaintainPage = lazy(() => import('./page/maintainPage'))

const { Content, Sider } = Layout
const { Item } = Menu

const App = () => {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider breakpoint='xl' collapsedWidth='0'>
        <Menu theme='dark' defaultSelectedKeys={['/']} selectedKeys={[]}>
          <Item key='/'>
            <Link to='/'>
              主畫面
            </Link>
          </Item>
          <Item key='/maintain'>
            <Link to='/maintain'>
              頁面維護
            </Link>
          </Item>
        </Menu>
      </Sider>
      <Layout>
        <Content>
          <Suspense
            fallback={
              <div style={{ textAlign: 'center', fontSize: 100 }}>
                <LoadingOutlined />
              </div>
            }
          >
            <Routes>
              <Route path='/' element={<MainPage />} />
              <Route path='/maintain' element={<MaintainPage />} />
            </Routes>
          </Suspense>
        </Content>
      </Layout>
    </Layout >
  )
}

export default connect(null, null)(App)