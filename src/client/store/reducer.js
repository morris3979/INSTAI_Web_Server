import {
  OPEN_MAINTAIN_BOARD_CARD_MODAL,
  CLOSE_MAINTAIN_BOARD_CARD_MODAL_OK,
  CLOSE_MAINTAIN_BOARD_CARD_MODAL_CANCEL,
  CHANGE_MAINTAIN_BOARD_CARD_MODAL_INPUT_VALUE
} from './actionType'

const defaultState = {
  maintainModalInputValue: '',
  isMaintainBoardCardModalVisible: false,
  maintainBoardCardName: '車輛編號表',
  isModalVisible: false,
  imageList: [
    "https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg",
    "https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg",
    'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    'https://gw.alipayobjects.com/zos/antfincdn/LlvErxo8H9/photo-1503185912284-5271ff81b9a8.webp',
    "https://gw.alipayobjects.com/zos/antfincdn/cV16ZqzMjW/photo-1473091540282-9b846e7965e3.webp",
    "https://gw.alipayobjects.com/zos/antfincdn/x43I27A55%26/photo-1438109491414-7198515b166b.webp"
  ]
}

const reducer = (state = defaultState, action) => {
  const newState = JSON.parse(JSON.stringify(state))
  switch (action.type) {
    case OPEN_MAINTAIN_BOARD_CARD_MODAL: {
      newState.isMaintainBoardCardModalVisible = true
      return newState
    }
    case CLOSE_MAINTAIN_BOARD_CARD_MODAL_OK: {
      newState.isMaintainBoardCardModalVisible = false
      newState.maintainBoardCardName = newState.maintainModalInputValue
      newState.maintainModalInputValue = ''
      return newState
    }
    case CLOSE_MAINTAIN_BOARD_CARD_MODAL_CANCEL: {
      newState.isMaintainBoardCardModalVisible = false
      newState.maintainModalInputValue = ''
      return newState
    }
    case CHANGE_MAINTAIN_BOARD_CARD_MODAL_INPUT_VALUE: {
      newState.maintainModalInputValue = action.value
      return newState
    }
    case 'open_modal': {
      newState.isModalVisible = true
      return newState
    }
    case 'close_modal': {
      newState.isModalVisible = false
      return newState
    }
    default: {
      return newState
    }
  }
}

export default reducer