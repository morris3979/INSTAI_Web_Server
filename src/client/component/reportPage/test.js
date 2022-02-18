import React, { Fragment, useState } from 'react'
import { Modal, Button, Image } from 'antd'
import ReactPlayer from 'react-player/lazy'

const Test = () => {
  const [isModalVisible, setIsModalVisible] = useState(false)

  const onClick = () => { setIsModalVisible(true) }

  const handleOk = () => { setIsModalVisible(false) }

  const handleCancel = () => { setIsModalVisible(false) }

  return (
    <Fragment>
      <Button onClick={onClick}>
        Open Modal
      </Button>
      <Modal
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        destroyOnClose={true}
        width={690}
      >
        <Image
          src='http://localhost:8080/api/s3/files/pc1_1_20220217132352_camera1_front_pedestrianflow.jpg'
        />
        <Image
          src='http://localhost:8080/api/s3/files/pc1_2_20220217132635_camera2_behind_pedestrianflow.jpg'
        />
        <Image
          src='http://localhost:8080/api/s3/files/pc1_3_20220217132759_camera1_front_pedestrianflow.jpg'
        />
        <ReactPlayer
          url='http://localhost:8080/api/s3/files/pc1_1_20220217132352_camera1_front_pedestrianflow.mp4'
          controls={true}
        />
        <ReactPlayer
          url='http://localhost:8080/api/s3/files/pc1_2_20220217132635_camera2_behind_pedestrianflow.mp4'
          controls={true}
        />
        <ReactPlayer
          url='http://localhost:8080/api/s3/files/pc1_3_20220217132759_camera1_front_pedestrianflow.mp4'
          controls={true}
        />
      </Modal>
    </Fragment>
  )
}

export default Test