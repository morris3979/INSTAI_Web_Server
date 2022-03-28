import React, { Fragment } from 'react'
import { Typography } from 'antd'
import ReactPlayer from 'react-player/lazy'

const { Text } = Typography

const Test = () => {
  return (
    <Fragment>
      <Text>AWS</Text>
      <ReactPlayer
        url='https://d20cmf4o2f77jz.cloudfront.net/video/pc1_2_20220217132635_camera2_behind_pedestrianflow.mp4'
        controls={true}
      />
      <Text>阿里雲</Text>
      <ReactPlayer
        url='http://carview.oss-accelerate.aliyuncs.com/video/pc1_2_20220217132635_camera2_behind_pedestrianflow.mp4'
        controls={true}
      />
    </Fragment>
  )
}

export default Test