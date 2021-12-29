import React, { lazy } from 'react'
import { connect } from 'react-redux'

const MaintainCarCard = lazy(() => import('../component/maintainPage/maintainCarCard'))

const MaintainPage = () => {
  return (
    <MaintainCarCard />
  )
}

export default connect(null, null)(MaintainPage)