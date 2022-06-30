import React, { Fragment } from 'react'
import { Typography, Image, Button } from 'antd'
import ReactPlayer from 'react-player/lazy'
import axios from 'axios'

const { Text } = Typography

const imageurl = '/api/S3/getFile/image/0x0001_3_20220217132759_camera1_front_pedestrianflow.jpg'

const download = async () => {
  try {
    const response = await axios.get(
      imageurl,
      { responseType: 'blob' }
    )
    const url = window.URL.createObjectURL(new Blob([response.data]))
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', 'image.jpg')
    document.body.appendChild(link)
    link.click()
  } catch (error) {
    console.log(error)
  }
}

const Test = () => {
  return (
    <Fragment>
      <Image src='/api/S3/getFile/image/0x0001_3_20220217132759_camera1_front_pedestrianflow.jpg' />
      <Image src='https://source.unsplash.com/random/500x500' />
      <ReactPlayer
        url='/api/S3/getFile/video/0x0001_2_20220217132635_camera2_behind_pedestrianflow.mp4'
        controls={true}
      />
      <Button onClick={download}>
        下載測試
      </Button>
    </Fragment>
  )
}

export default Test