import { COLLAPSED_CHANGE } from './actionType'

const defaultState = {
  collapsed: false,
}

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case COLLAPSED_CHANGE: {
      const newState = JSON.parse(JSON.stringify(state))
      newState.collapsed = !newState.collapsed
      return newState
    }
  }
  return state
}

export default reducer