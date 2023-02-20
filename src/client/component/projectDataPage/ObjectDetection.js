import React, { lazy } from 'react'
import { connect } from 'react-redux'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

const TFYolo = lazy(() => import('./TFYolo/index'))

const ObjectDetection = (props) => {

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
            container
            minWidth='90vw'
            direction="row"
            sx={{ marginTop: 4, marginBottom: 3, justifyContent: 'space-between' }}
          >
            <Typography
              noWrap
              variant="h5"
              sx={{ color: 'white', fontWeight: 'bold', marginLeft: 5 }}
            >
              AI Lab
            </Typography>
          </Grid>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <TFYolo />
          </div>
        </div>
      </Box>
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

export default connect(mapStateToProps, mapDispatchToProps)(ObjectDetection)