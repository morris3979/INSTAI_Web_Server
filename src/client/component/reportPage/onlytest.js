import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { Button, Modal, Image } from 'antd'
import { FileImageOutlined } from '@ant-design/icons'
import ReactPlayer from 'react-player/lazy'

const { PreviewGroup } = Image

const imageList = [
  'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg',
  'https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg',
  'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
  'https://gw.alipayobjects.com/zos/antfincdn/LlvErxo8H9/photo-1503185912284-5271ff81b9a8.webp',
  'https://gw.alipayobjects.com/zos/antfincdn/cV16ZqzMjW/photo-1473091540282-9b846e7965e3.webp',
  'https://gw.alipayobjects.com/zos/antfincdn/x43I27A55%26/photo-1438109491414-7198515b166b.webp'
]

const imageGroup = imageList.map((item) => {
  return (
    <Image width={200} src={item} />
  )
})

const OnlyTest = (props) => {
  const {
    openModal,
    isModalVisible,
    closeModal
  } = props

  return (
    <Fragment>
      <Button
        icon={<FileImageOutlined />}
        size='large'
        onClick={openModal}
      />
      <Modal
        title='測試用'
        visible={isModalVisible}
        onOk={closeModal}
        onCancel={closeModal}
        width={700}
        destroyOnClose={true}
      >
        <PreviewGroup>
          {imageGroup}
        </PreviewGroup>
        <ReactPlayer
          url='https://www.youtube.com/watch?v=zSOJk7ggJts#t=53s'
          controls={true}
        />
      </Modal>
    </Fragment>
  )
}

const mapStateToProps = (state) => {
  //state指的是store裡的數據
  return {
    isModalVisible: state.isModalVisible
    //props裡的參數與store的數據對應關係
  }
}

const mapDispatchToProps = (dispatch) => {
  //dispatch指store.dispatch這個方法
  return {
    openModal() {
      const action = {
        type: 'open_modal'
      }
      dispatch(action)
    },
    closeModal() {
      const action = {
        type: 'close_modal'
      }
      dispatch(action)
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OnlyTest)