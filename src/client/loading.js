import React, { Fragment } from 'react'
import { ThreeDots } from 'react-loader-spinner'

const Loading = () => {
  return (
    <Fragment>
      <div
        style={{
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          // justifyContent: 'center',
          backgroundColor: '#1c2127',
        }}
      >
        <ThreeDots
          height="80"
          width="80"
          radius="9"
          color="lightblue"
          visible={true}
          ariaLabel="three-dots-loading"
        />
      </div>
    </Fragment>
  )
}

export default Loading