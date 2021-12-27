import React from 'react'
import { connect } from 'react-redux'
import { Layout, Menu } from 'antd'
import { Link, Route, Routes } from 'react-router-dom'
import Datatable from './page/datatable'
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
          <Item key='/test'>
            <Link to='/test'>
              測試
            </Link>
          </Item>
        </Menu>
      </Sider>
      <Layout>
        <Content>
          <Routes>
            <Route path='/' element={<Datatable />} />
            <Route path='/test' element={<MaintainPage />} />
          </Routes>
        </Content>
      </Layout>
    </Layout >
  )
}

export default connect(null, null)(App)