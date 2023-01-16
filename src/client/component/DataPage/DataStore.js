import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import Box from '@mui/material/Box';
import { CirclesWithBar } from 'react-loader-spinner';


const DataStore = (props) => {

    return (
        <Box sx={{ display: 'flex', backgroundColor: 'lightblue' }} />
    )
}

const mapStateToProps = (state) => {
    //state指的是store裡的數據
    return {}
  }

  const mapDispatchToProps = (dispatch) => {
    //dispatch指store.dispatch這個方法
    return {}
  }

export default connect(mapStateToProps, mapDispatchToProps)(DataStore)