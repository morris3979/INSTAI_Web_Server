import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const DataWarehouse = (props) => {
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
          {dataList.Data.length === 0?
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Button
              variant="contained"
              sx={{ marginTop: 5, fontWeight: 'bold', width: 300, height: 70, borderRadius: 10 }}
            >
              <CloudUploadIcon fontSize='large' />
              <Typography
                noWrap
                variant="h5"
                sx={{
                  color: 'white',
                  fontWeight: 'bold',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  marginLeft: 2,
                }}
              >
                UPLOAD IMAGE
              </Typography>
            </Button>
          </div>:
          <div>
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
                Warehouse
              </Typography>
              <Button variant="contained" sx={{ marginRight: 5 }}>UPLOAD</Button>
            </Grid>
            <span>
              <Typography
                noWrap
                variant="h5"
                sx={{
                  color: 'white',
                  fontWeight: 'bold',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  marginTop: 2,
                }}
              >
                IMAGE
              </Typography>
            </span>
          </div>
          }
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

export default connect(mapStateToProps, mapDispatchToProps)(DataWarehouse)