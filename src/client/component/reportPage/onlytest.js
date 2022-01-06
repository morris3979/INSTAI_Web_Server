import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { Button, Modal, Image } from 'antd'
import { FileImageOutlined } from '@ant-design/icons'
import ReactPlayer from 'react-player/lazy'

const { PreviewGroup } = Image

const OnlyTest = (props) => {
  const {
    openModal,
    isModalVisible,
    closeModal,
    imageList
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
        <ReactPlayer
          url='https://www.youtube.com/watch?v=zSOJk7ggJts#t=53s'
          controls={true}
        />
        <PreviewGroup>
          {
            imageList.map((item) => {
              return (
                <Image
                  width={200}
                  src={item}
                />
              )
            })
          }
        </PreviewGroup>
      </Modal>
    </Fragment>
  )
}

const mapStateToProps = (state) => {
  //state指的是store裡的數據
  return {
    isModalVisible: state.isModalVisible,
    imageList: state.imageList
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