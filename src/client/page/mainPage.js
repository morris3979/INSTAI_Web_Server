import React from 'react'
import { connect } from 'react-redux'
import { FileOutlined } from '@ant-design/icons'

const MainPage = () => {
  return (
    <div style={{ textAlign: 'center' }}>
      <FileOutlined style={{ color: 'black', fontSize: 100 }} />
      <div style={{ fontSize: 100 }}>
        to be continued
      </div>
    </div>
  )
}

export default connect(null, null)(MainPage)