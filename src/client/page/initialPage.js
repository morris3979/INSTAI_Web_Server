import React, { Fragment } from 'react'
import { CirclesWithBar } from 'react-loader-spinner'

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
        <CirclesWithBar
          height="100"
          width="100"
          color="#4fa94d"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
          outerCircleColor=""
          innerCircleColor="lightblue"
          barColor="red"
          ariaLabel='circles-with-bar-loading'
        />
        <h1 style={{ color: 'yellow' }}>SITE UNDER CONSTRUCTION ...</h1>
      </div>
    </Fragment>
  )
}

export default InitialPage