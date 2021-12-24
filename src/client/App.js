import React from 'react'
import { connect } from 'react-redux'
import { Layout, Menu } from 'antd'
import { Link, Route, Routes } from 'react-router-dom'
import Datatable from '../datatable'
import { COLLAPSED_CHANGE } from './store/actionType'
import 'antd/dist/antd.min.css'

const { Content, Sider } = Layout

const App = (props) => {
  const { collapsed, onCollapse } = props

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
        <Menu theme='dark' mode='inline' defaultSelectedKeys={['/']} selectedKeys={[]}>
          <Menu.Item key='/'>
            <Link to='/'>
              主畫面
            </Link>
          </Menu.Item>
          <Menu.Item key='/test'>
            <Link to='/test'>
              測試
            </Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Content>
          <Routes>
            <Route path='/' element={<Datatable />} />
            <Route path='/test' element={<div>test</div>} />
          </Routes>
        </Content>
      </Layout>
    </Layout >
  )
}

const mapStateToProps = (state) => {
  //state指的是store裡的數據
  return {
    collapsed: state.collapsed,
    //props裡的參數與store的數據對應關係
  }
}

const mapDispatchToProps = (dispatch) => {
  //dispatch指store.dispatch這個方法
  return {
    onCollapse() {
      const action = {
        type: COLLAPSED_CHANGE
      }
      dispatch(action)
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)