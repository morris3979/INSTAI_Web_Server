import React from 'react'
import { connect } from 'react-redux'
import { Layout, Menu } from 'antd'
import { Link, Route, Routes } from 'react-router-dom'
import MainPage from './page/mainPage'
import MaintainPage from './page/maintainPage'
import 'antd/dist/antd.css'

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
          <Routes>
            <Route path='/' element={<MainPage />} />
            <Route path='/maintain' element={<MaintainPage />} />
          </Routes>
        </Content>
      </Layout>
    </Layout >
  )
}

export default connect(null, null)(App)