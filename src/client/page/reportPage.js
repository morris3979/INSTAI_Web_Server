import React, { lazy, Fragment, useEffect } from 'react'
import { connect } from 'react-redux'
import { Collapse } from 'antd'
import {
    GetProjectList,
    GetHostList
} from '../store/actionCreater'

const ReportTable = lazy(() => import('../component/reportPage/reportTable'))
const { Panel } = Collapse

const reportPage = (props) => {
  const {
    whichProjectName,
    getProjectList,
    getHostList,
    projectList,
    hostList,
  } = props

  useEffect(() => {
    getHostList()
    getProjectList()
  }, []);

  const projectFilter = (data) => {
    const EachProjectData = data.filter((c) => {
      return c.project === whichProjectName
    });
    const ProjectData = EachProjectData.map((d) => {
      return d.Hosts
    })
    const JSONData =  JSON.parse(JSON.stringify(ProjectData))
    return JSONData[0]
  }

  const HostFilter = (data,serialNumber) => {
    const EachHostData = data.filter((c) => {
      return c.serialNumber === serialNumber
    });
    const HostData = EachHostData.map((d) => {
      return d.Devices
    })
    const JSONData =  JSON.parse(JSON.stringify(HostData))
    return JSONData[0]
  }

  return (
    <Fragment>
      {projectFilter(projectList).map((f) => {
        return(
          <Collapse>
            <Panel header={f.serialNumber+' '+'('+f.hostName+')'}>
              {HostFilter(hostList,f.serialNumber).map((g) => {
                return(
                  <Collapse>
                    <Panel header={g.deviceId +' '+'('+g.deviceName+')'}>
                      <ReportTable />
                    </Panel>
                  </Collapse>
                )
              })}
            </Panel>
          </Collapse>
        )
      })}
    </Fragment>
  )
}

const mapStateToProps = (state) => {
    //state指的是store裡的數據
    return {
      whichProjectName: state.whichProjectName,
      projectList: state.projectList,
      hostList: state.hostList
    }
}

const mapDispatchToProps = (dispatch) => {
    //dispatch指store.dispatch這個方法
    return {
      getProjectList() {
        const action = GetProjectList()
        dispatch(action)
      },
      getHostList() {
        const action = GetHostList()
        dispatch(action)
      },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(reportPage)