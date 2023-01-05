import React, { Fragment } from 'react'
import { Result, Typography } from 'antd'

const { Title } = Typography

const InitialPage = () => {
  return (
    <Fragment>
      <div
        style={{
          backgroundColor: '#1c2127',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          // justifyContent: 'center',
        }}
      >
        <Result status='success' style={{ marginTop: 120 }}/>
        <Title
          style={{
            color: 'yellow',
          }}
        >Login Successful !
        </Title>
      </div>
    </Fragment>
  )
}

export default InitialPage