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

const video = (text) => {
  return (
    <ReactPlayer
      url={`${text.videoURL}`}
      controls={true}
    />
  )
}

const description = (text) => {
  return (
    <Fragment>
      <Button icon={<DownloadOutlined />} />
      <Text>{text.description}</Text>
    </Fragment>
  )
}

const Test = () => {
  return (
    <Collapse>
      <Panel header='test'>
        <Table
          dataSource={data}
          pagination={{ position: ['bottomCenter'] }}
        >
          <Column
            title='影片'
            render={video}
            ellipsis={true}
            align='center'
          />
          <Column
            title='敘述'
            render={description}
            align='center'
          />
        </Table>
      </Panel>
    </Collapse>
  )
}

export default Test