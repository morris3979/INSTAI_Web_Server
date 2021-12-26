import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import MaintainCard from '../component/maintainPage/maintainCard'
import MaintainModal from '../component/maintainPage/maintainModal'

const MaintainPage = () => {
  return (
    <Fragment>
      <MaintainCard />
      <MaintainModal />
    </Fragment>
  )
}

export default connect(null, null)(MaintainPage)