import React from 'react'
import { connect } from 'react-redux'
import { FileOutlined } from '@ant-design/icons'

const MainPage = () => {
  return (
    <div style={{ textAlign: 'center', fontSize: 100 }}>
      <FileOutlined style={{ color: 'black' }} />
      <div>
        to be continued
      </div>
    </div>
  )
}

export default connect(null, null)(MainPage)