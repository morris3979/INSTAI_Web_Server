import React, { Fragment } from 'react'

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
        <h1 style={{ color: 'yellow' }}>Login Successful !</h1>
      </div>
    </Fragment>
  )
}

export default InitialPage