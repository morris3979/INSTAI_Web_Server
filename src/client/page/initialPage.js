import React, { Fragment } from 'react'
import { Result, Typography } from 'antd'

const { Title } = Typography

const InitialPage = () => {
  return (
    <Fragment>
      <div
        style={{
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#1c2127',
        }}
      >
        <Result status='success' />
        <Title style={{ color: 'yellow' }}>Login Successful !</Title>
      </div>
    </Fragment>
  )
}

export default InitialPage