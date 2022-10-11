import React, { lazy, Suspense, useEffect } from 'react'
import { connect } from 'react-redux'
import { Link, Route, Routes } from 'react-router-dom'
import { Layout, Menu } from 'antd'
import Loading from './loading'
import { LogoutData , GetProjectList , GetHostList , WhichProject } from './store/actionCreater'
import {
  AppstoreOutlined,
  EnvironmentOutlined,
  SettingOutlined,
  LinkOutlined,
  LogoutOutlined,
  ToolOutlined
} from '@ant-design/icons'

const InitialPage = lazy(() => import('./page/initialPage'))
const MapPage = lazy(() => import('./page/mapPage'))
const ProjectPage = lazy(() => import('./page/projectPage'))
const HostPage = lazy(() => import('./page/hostPage'))
const DevicePage = lazy(() => import('./page/devicePage'))
const modelPage = lazy(() => import('./page/modelPage'))
const Resource = lazy(() => import('./page/resourcePage'))
const LoginPage = lazy(() => import('./page/loginPage'))
const AccountPage = lazy(() => import('./page/accountPage'))
const Test = lazy(() => import('./component/test'))
const ReportPage = lazy(() => import('./page/reportPage'))

const { Content, Sider } = Layout
const { Item, SubMenu } = Menu

const App = (props) => {
  const {
    loginInformation,
    onClick,
    getProjectList,
    getHostList,
    projectList,
    whichProject,
  } = props;

  const onClickProject = (a) => {
    whichProject(a.key)
  }

  useEffect(() => {
    /* 下面是 componentDidMount和componentDidUpdate */

    getProjectList()
    getHostList()

    /* 上面是 componentDidMount和componentDidUpdate */
  }, [/* dependencies參數 */]); /* 加入監控的props */

  if (loginInformation.admin == true) {
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider breakpoint='md' collapsedWidth='0'>
          <Menu theme='dark' selectedKeys={[]} mode='inline'>
            <Item key='/map' disabled={!loginInformation.admin} icon={<EnvironmentOutlined />}>
              <Link to='/map'>
                地圖資訊
              </Link>
            </Item>
            <SubMenu key='subreport' title='報表查詢' disabled={!loginInformation.admin} icon={<AppstoreOutlined />}>
              {projectList.map((c) => {
                // console.log(c)
                return (
                  <Item key={c.project} onClick={onClickProject}>
                    <Link to={`/report/${c.project}`}>
                      {c.displayName}
                    </Link>
                  </Item>
                )
              })}
            </SubMenu>
            <SubMenu key='subset' title='配置設定' disabled={!loginInformation.admin} icon={<SettingOutlined />}>
              <Item key='/project' disabled={!loginInformation.admin}>
                <Link to='/project'>
                  專案管理
                </Link>
              </Item>
              <Item key='/host' disabled={!loginInformation.admin}>
                <Link to='/host'>
                  主機配置
                </Link>
              </Item>
              <Item key='/device' disabled={!loginInformation.admin}>
                <Link to='/device'>
                  設備配置
                </Link>
              </Item>
              <Item key='/model' disabled={!loginInformation.admin}>
                <Link to='/model'>
                  模型管理
                </Link>
              </Item>
              <Item key='/account' disabled={!loginInformation.admin}>
                <Link to='/account'>
                  帳號權限配置
                </Link>
              </Item>
            </SubMenu>
            <Item key='/test' disabled={!loginInformation.admin} icon={<ToolOutlined />}>
              <Link to='/test'>
                測試
              </Link>
            </Item>
              <Item key='/resource' disabled={!loginInformation.admin} icon={<LinkOutlined />}>
                <Link to='/resource'>
                  關於
                </Link>
              </Item>
            <Item key='/logout' disabled={!loginInformation.admin} onClick={onClick} icon={<LogoutOutlined />}>
              <Link to='/'>
                登出
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
                {projectList.map((c) => {
                  //console.log(c.project)
                  return (<Route path={`/report/${c.project}`} element={<ReportPage />} />)
                })}
                <Route path='/project' element={<ProjectPage />} />
                <Route path='/host' element={<HostPage />} />
                <Route path='/device' element={<DevicePage />} />
                <Route path='/model' element={<modelPage />} />
                <Route path='/resource' element={<Resource />} />
                <Route path='/account' element={<AccountPage />} />
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
    loginInformation: state.loginInformation,
    projectList: state.projectList,
  }
}

const mapDispatchToProps = (dispatch) => {
  //dispatch指store.dispatch這個方法
  return {
    onClick() {
      const action = LogoutData()
      dispatch(action)
    },
    getProjectList() {
      const action = GetProjectList()
      dispatch(action)
    },
    getHostList() {
      const action = GetHostList()
      dispatch(action)
    },
    whichProject(text) {
      const action = WhichProject(text)
      dispatch(action)
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)