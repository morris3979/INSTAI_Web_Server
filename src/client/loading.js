import React from 'react'
import { Dna } from 'react-loader-spinner'

const Loading = () => {
  return (
    <center>
      {/* <div>Loading...</div> */}
      <Dna
        visible={true}
        height="100"
        width="100"
        ariaLabel="dna-loading"
        wrapperStyle={{}}
        wrapperClass="dna-wrapper"
      />
    </center>
  )
}

export default Loading