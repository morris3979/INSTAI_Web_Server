import React, { Fragment } from 'react'
import { Table, Button, Typography, Collapse } from 'antd'
import { DownloadOutlined } from '@ant-design/icons'
import ReactPlayer from 'react-player/lazy'

const { Column } = Table
const { Text } = Typography
const { Panel } = Collapse

const data = [
  {
    videoURL: 'https://d20cmf4o2f77jz.cloudfront.net/video/00000000674a3751_1_20220728192323_camera1_front_body.mp4',
    description: '00000000674a3751_1_20220728192323_camera1_front_body'
  }
]

// const video = (text) => {
//   return (
//     <ReactPlayer
//       url={`${text.videoURL}`}
//       controls={true}
//     />
//   )
// }

const description = (text) => {
  return (
    <Fragment align='center'>
      <ReactPlayer
        url={`${text.videoURL}`}
        controls={true}
      />
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

const Test = () => {
  return (
    <Fragment>
      <Collapse>
        <Panel header='0000000039aed1d2'>
          <Collapse>
            <Panel header='0x7680'>
              <Table
                dataSource={data}
                pagination={{ position: ['bottomCenter'] }}
              >
                <Column
                  title='採集資料'
                  render={description}
                  ellipsis={true}
                  align='center'
                />
                <Column
                  title='操作'
                  render={download}
                  align='center'
                />
              </Table>
            </Panel>
          </Collapse>
        </Panel>
      </Collapse>
      <Collapse>
        <Panel header='0000000012aed3d4'>
          <Collapse>
            <Panel header='0x7680'>
              <Table
                dataSource={data}
                pagination={{ position: ['bottomCenter'] }}
              >
                <Column
                  title='採集資料'
                  render={description}
                  ellipsis={true}
                  align='center'
                />
                <Column
                  title='操作'
                  render={download}
                  align='center'
                />
              </Table>
            </Panel>
          </Collapse>
        </Panel>
      </Collapse>
    </Fragment>
  )
}

export default Test