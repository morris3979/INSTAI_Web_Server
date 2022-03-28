import React from 'react'
import ReactPlayer from 'react-player/lazy'

const Test = () => {
  return (
    <ReactPlayer
      url='https://d20cmf4o2f77jz.cloudfront.net/pc1_2_20220217132635_camera2_behind_pedestrianflow.mp4'
      controls={true}
    />
  )
}

export default Test