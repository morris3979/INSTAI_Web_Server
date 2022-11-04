import React, { lazy, Suspense, useEffect } from 'react'
import { connect } from 'react-redux'
import { Link, Route, Routes } from 'react-router-dom'
import { Layout, Menu } from 'antd'
import Loading from './loading'
import {
  LogoutData,
  GetProjectList,
  GetHostList,
  WhichProject
} from './store/actionCreater'
import {
  AppstoreOutlined,
  EnvironmentOutlined,
  TableOutlined,
  SettingOutlined,
  LinkOutlined,
  LogoutOutlined,
  ToolOutlined,
  FormOutlined,
  UserOutlined
} from '@ant-design/icons'

const InitialPage = lazy(() => import('./page/initialPage'))
const OverviewPage = lazy(() => import('./page/overviewPage'))
// const MapPage = lazy(() => import('./page/mapPage'))
const LabelsPage = lazy(() => import('./page/labelPage'))
const ProjectPage = lazy(() => import('./page/projectPage'))
const HostPage = lazy(() => import('./page/hostPage'))
const DevicePage = lazy(() => import('./page/devicePage'))
const Resource = lazy(() => import('./page/resourcePage'))
const LoginPage = lazy(() => import('./page/loginPage'))
const AccountPage = lazy(() => import('./page/accountPage'))
const Test = lazy(() => import('./component/test'))
const ReportPage = lazy(() => import('./page/reportPage'))

import InstAI from './icon image/instai.png'

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
  }, []); /* 加入監控的props */

  if (loginInformation.developer == true ||
      loginInformation.admin == true ||
      loginInformation.user == true) {
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider breakpoint='md' collapsedWidth='0'>
          <div>
            <img src={InstAI} alt='Logo' style={{ width: '100%', height: '100%' }} />
          </div>
          <Menu theme='dark' selectedKeys={[]} mode='inline'>
            <Item
              icon={<UserOutlined />}
              style={{ color: "yellow", pointerEvents: 'none' }}
            >
              {`Hi ${loginInformation.username}!`}
            </Item>
            <Item key='/overview'
              hidden={
                !(loginInformation.developer ||
                  loginInformation.admin)
              }
              icon={<TableOutlined />}
            >
              <Link to='/overview'>
                資料總覽
              </Link>
            </Item>
            {/* <Item key='/map'
              hidden={
                !(loginInformation.developer ||
                  loginInformation.admin ||
                  loginInformation.user)
              }
              icon={<EnvironmentOutlined />}
            >
              <Link to='/map'>
                地圖資訊
              </Link>
            </Item> */}
            <Item key='/label'
              hidden={
                !(loginInformation.developer ||
                  loginInformation.admin ||
                  loginInformation.user)
              }
              icon={<FormOutlined />}
            >
              <Link to='/label'>
                資料標記
              </Link>
            </Item>
            <SubMenu key='subreport' title='報表查詢'
              hidden={
                !(loginInformation.developer ||
                  loginInformation.admin ||
                  loginInformation.user)
              }
              icon={<AppstoreOutlined />}
            >
              {projectList.map((c) => {
                // console.log('loginInformation: ', loginInformation)
                // console.log('c: ', c)
                return (
                  loginInformation.developer == true || loginInformation.admin == true?
                  <Item key={c.project}
                    onClick={onClickProject}
                    hidden={
                      !(loginInformation.developer ||
                        loginInformation.admin ||
                        loginInformation.user)
                    }
                  >
                    <Link to={`/report/${c.project}`}>
                      {c.displayName}
                    </Link>
                  </Item>:
                  <Item key={c.project}
                    onClick={onClickProject}
                    hidden={
                      !(loginInformation.developer ||
                        loginInformation.admin ||
                        loginInformation.user) ||
                        loginInformation.project != c.project
                    }
                  >
                    <Link to={`/report/${c.project}`}>
                      {c.displayName}
                    </Link>
                  </Item>
                )
              })}
            </SubMenu>
            <SubMenu key='subset' title='配置設定'
              hidden={!(loginInformation.developer || loginInformation.admin)}
              icon={<SettingOutlined />}
            >
              <Item key='/project'
                hidden={
                  !(loginInformation.developer ||
                    loginInformation.admin ||
                    loginInformation.user)
                }
              >
                <Link to='/project'>
                  專案管理
                </Link>
              </Item>
              <Item key='/host'
                hidden={
                  !(loginInformation.developer ||
                    loginInformation.admin ||
                    loginInformation.user)
                }
              >
                <Link to='/host'>
                  主機配置
                </Link>
              </Item>
              <Item key='/device'
                hidden={
                  !(loginInformation.developer ||
                    loginInformation.admin ||
                    loginInformation.user)
                }
              >
                <Link to='/device'>
                  設備配置
                </Link>
              </Item>
              <Item key='/account'
                hidden={
                  !(loginInformation.developer || loginInformation.admin)
                }
              >
                <Link to='/account'>
                  帳號權限配置
                </Link>
              </Item>
            </SubMenu>
            <Item key='/test'
              hidden={!loginInformation.developer}
              icon={<ToolOutlined />}
            >
              <Link to='/test'>
                測試
              </Link>
            </Item>
              <Item key='/resource'
                hidden={
                  !(loginInformation.developer ||
                    loginInformation.admin ||
                    loginInformation.user)
                }
                icon={<LinkOutlined />}
              >
                <Link to='/resource'>
                  關於
                </Link>
              </Item>
            <Item key='/logout'
              hidden={
                !(loginInformation.developer ||
                  loginInformation.admin ||
                  loginInformation.user)
              }
              onClick={onClick}
              icon={<LogoutOutlined />}
            >
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
                <Route path='/overview' element={<OverviewPage />} />
                {/* <Route path='/map' element={<MapPage />} /> */}
                <Route path='/label' element={<LabelsPage />} />
                {projectList.map((c) => {
                  //console.log(c.project)
                  return (<Route path={`/report/${c.project}`} element={<ReportPage />} />)
                })}
                <Route path='/project' element={<ProjectPage />} />
                <Route path='/host' element={<HostPage />} />
                <Route path='/device' element={<DevicePage />} />
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