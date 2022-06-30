import React, { Fragment } from 'react'
import { Typography, Image, Button } from 'antd'
import ReactPlayer from 'react-player/lazy'
import axios from 'axios'

const { Text } = Typography

const imageurl = 'https://source.unsplash.com/random/500x500'

const download = async () => {
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
}

const Test = () => {
  return (
    <Fragment>
      <Image src='https://d20cmf4o2f77jz.cloudfront.net/image/10_2_20220217132635_camera1_front_pedestrianflow.jpg' />
      <Image src='https://source.unsplash.com/random/500x500' />
      <Button onClick={() => { download() }}>
        下載測試
      </Button>
    </Fragment>
  )
}

export default Test