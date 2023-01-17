import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';


const DeviceSetting = (props) => {
  const {
    dataList,
  } = props

  useEffect(() => {
    // console.log('dataList', dataList)
    dataList
  },[])

  return (
      <Box
        style={{ borderRadius: 20, marginLeft: '5.5vw', marginTop: '13vh' }}
        sx={{ display: 'flex', backgroundColor: '#0A1929' }}
      >
        <div
          style={{
            minHeight: '87vh',
            minWidth: '94.5vw',
            height: 'auto',
            width: 'auto',
          }}
        >
          <Grid
              minWidth='90vw'
              container
              direction="row"
              sx={{ marginTop: 2, justifyContent: 'space-between' }}
          >
            <Typography
                noWrap
                variant="h5"
                sx={{ color: 'white', fontWeight: 'bold', marginLeft: 5 }}
            >
              Setting
            </Typography>
            <Button variant="contained" sx={{ marginRight: 5 }}>ADD</Button>
          </Grid>
        </div>
      </Box>
  )
}

const mapStateToProps = (state) => {
    //state指的是store裡的數據
    return {
      dataList: state.dataList
    }
  }

  const mapDispatchToProps = (dispatch) => {
    //dispatch指store.dispatch這個方法
    return {}
  }

export default connect(mapStateToProps, mapDispatchToProps)(DeviceSetting)