import React, { Fragment, useState , useEffect } from 'react'
import { connect } from 'react-redux'
import { Table, Button, Typography, Collapse } from 'antd'
import { DownloadOutlined } from '@ant-design/icons'
import ReactPlayer from 'react-player/lazy'
import {
    GetProjectList,
    GetHostList
} from '../../store/actionCreater'

const { Column } = Table
const { Text } = Typography
const { Panel } = Collapse

const data = [
  {
    key: 1,
    videoURL: 'https://d20cmf4o2f77jz.cloudfront.net/video/00000000674a3751_1_20220728192323_camera1_front_body.mp4',
    description: '00000000674a3751_1_20220728192323_camera1_front_body'
  },
  {
    key: 2,
    videoURL: 'https://d20cmf4o2f77jz.cloudfront.net/video/00000000674a3751_1_20220728192058_camera1_front_body.mp4',
    description: '00000000674a3751_1_20220728192058_camera1_front_body'
  },
  {
    key: 3,
    videoURL: 'https://d20cmf4o2f77jz.cloudfront.net/video/00000000674a3751_1_20220808202505_camera1_front_body.mp4',
    description: '00000000674a3751_1_20220808202505_camera1_front_body'
  },
  {
    key: 4,
    videoURL: 'https://d20cmf4o2f77jz.cloudfront.net/video/00000000674a3751_1_20220728192323_camera1_front_body.mp4',
    description: '00000000674a3751_1_20220728192323_camera1_front_body'
  },
  {
    key: 5,
    videoURL: 'https://d20cmf4o2f77jz.cloudfront.net/video/00000000674a3751_1_20220728192058_camera1_front_body.mp4',
    description: '00000000674a3751_1_20220728192058_camera1_front_body'
  },
  {
    key: 6,
    videoURL: 'https://d20cmf4o2f77jz.cloudfront.net/video/00000000674a3751_1_20220808202505_camera1_front_body.mp4',
    description: '00000000674a3751_1_20220808202505_camera1_front_body'
  }
]

const video = (text) => {
  return (
    <Fragment align='center'>
      <ReactPlayer
        url={`${text.videoURL}`}
        controls={true}
        position='relative'
        width='100%'
        height='100%'
      />
    </Fragment>
  )
}

const description = (text) => {
  return (
    <Fragment align='center'>
      <Text>{text.description}</Text>
    </Fragment>
  )
}

const download = () => {
  return (
    <Fragment>
      <Button icon={<DownloadOutlined />} />
    </Fragment>
  )
}

const reportTable = (props) => {
  const {
    whichProjectName,
    getProjectList,
    getHostList,
    projectList,
    hostList,
  } = props

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {

    getHostList()
    getProjectList()

  }, [/* dependencies參數 */]);

  const start = () => {
    setLoading(true); // ajax request after empty completing

    setTimeout(() => {
      setSelectedRowKeys([]);
      setLoading(false);
    }, 1000);
  };

  const onSelectChange = (newSelectedRowKeys) => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

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

  const hasSelected = selectedRowKeys.length > 0;

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
                    <div
                      style={{
                        marginBottom: 16,
                      }}
                    >
                      <Button type="primary" onClick={start} disabled={!hasSelected} loading={loading}>
                        send
                      </Button>
                      <span
                        style={{
                          marginLeft: 8,
                        }}
                      >
                        {hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}
                      </span>
                    </div>
                    <Table
                      dataSource={data}
                      rowSelection={rowSelection}
                      pagination={{ position: ['bottomCenter'], pageSize: 2 }}
                    >
                      <Column
                        title='採集資料'
                        render={video}
                        ellipsis={true}
                        width='30%'
                        align='center'
                      />
                      <Column
                        title='資料名稱'
                        render={description}
                        ellipsis={true}
                        align='center'
                      />
                      <Column
                        title='操作'
                        render={download}
                        width='15%'
                        align='center'
                      />
                    </Table>
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

export default connect(mapStateToProps, mapDispatchToProps)(reportTable)