const defaultState = {
  modelVersionTableData: []
}

const reducer = (state = defaultState, action) => {
  const newState = JSON.parse(JSON.stringify(state))
  switch (action.type) {
    default: {
      return newState
    }
  }
}

export default reducer