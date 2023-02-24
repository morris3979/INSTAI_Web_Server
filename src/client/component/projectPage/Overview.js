import React, { lazy, useEffect } from 'react'
import { connect } from 'react-redux'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import {
  GetDataList,
  GetLabelList
} from '../../store/actionCreater'

const Overview = (props) => {
  const {
    dataList,
    getDataList,
    labelList,
    getLabelList
  } = props

  useEffect(() => {
    // console.log('dataList', dataList)
    dataList
    labelList
    getDataList(dataList.id)
    getLabelList(dataList.id)
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
              Overview
            </Typography>
          </Grid>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
                spacing={5}
            >
                <Grid item>
                    <Box
                        sx={{
                            minWidth: '25vw',
                            minHeight: '20vh',
                            borderRadius: 5,
                            border: '2px solid grey'
                        }}
                    >
                        <Typography
                            noWrap
                            variant="h6"
                            sx={{
                                color: 'grey',
                                fontWeight: 'bold',
                                marginTop: 2,
                                marginLeft: 3
                            }}
                        >
                            Data Uploaded
                        </Typography>
                        <Typography
                            noWrap
                            variant="h2"
                            sx={{
                                color: 'green',
                                fontWeight: 'bold',
                                marginTop: 5,
                                marginRight: 3,
                                float: 'right'
                            }}
                        >
                            {dataList.id != undefined
                            ? dataList.Data.length
                            : {}
                            }
                        </Typography>
                    </Box>
                </Grid>
                <Grid item>
                    <Box
                        sx={{
                            minWidth: '25vw',
                            minHeight: '20vh',
                            borderRadius: 5,
                            border: '2px solid grey'
                        }}
                    >
                        <Typography
                            noWrap
                            variant="h6"
                            sx={{
                                color: 'grey',
                                fontWeight: 'bold',
                                marginTop: 2,
                                marginLeft: 3
                            }}
                        >
                            Data Labeled
                        </Typography>
                        <Typography
                            noWrap
                            variant="h2"
                            sx={{
                                color: 'green',
                                fontWeight: 'bold',
                                marginTop: 5,
                                marginRight: 3,
                                float: 'right'
                            }}
                        >
                            0
                        </Typography>
                    </Box>
                </Grid>
                <Grid item>
                    <Box
                        sx={{
                            minWidth: '25vw',
                            minHeight: '20vh',
                            borderRadius: 5,
                            border: '2px solid grey'
                        }}
                    >
                        <Typography
                            noWrap
                            variant="h6"
                            sx={{
                                color: 'grey',
                                fontWeight: 'bold',
                                marginTop: 2,
                                marginLeft: 3
                            }}
                        >
                            Data Trained
                        </Typography>
                        <Typography
                            noWrap
                            variant="h2"
                            sx={{
                                color: 'green',
                                fontWeight: 'bold',
                                marginTop: 5,
                                marginRight: 3,
                                float: 'right'
                            }}
                        >
                            0
                        </Typography>
                    </Box>
                </Grid>
            </Grid>
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: 30
            }}
          >
            <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
                spacing={5}
            >
                <Grid item>
                    <Box
                        sx={{
                            minWidth: '25vw',
                            minHeight: '50vh',
                            borderRadius: 5,
                            border: '2px solid grey'
                        }}
                    >
                        <Typography
                            noWrap
                            variant="h6"
                            sx={{
                                color: 'grey',
                                fontWeight: 'bold',
                                marginTop: 2,
                                marginLeft: 3
                            }}
                        >
                            Classes
                        </Typography>
                        <div
                            style={{
                                marginTop: 4,
                                marginLeft: 3
                            }}
                        >
                            {labelList.id != undefined
                            ? labelList.Labels.map((Labels) => {
                                <Typography
                                    noWrap
                                    variant="h4"
                                    sx={{
                                        color: 'lightblue',
                                        fontWeight: 'bold',
                                        marginTop: 1,
                                    }}
                                >
                                    {`● ${Labels.labelClass}`}
                                </Typography>
                            })
                            : {}
                            }
                        </div>
                    </Box>
                </Grid>
                <Grid item>
                    <Box
                        sx={{
                            minWidth: '52vw',
                            minHeight: '50vh',
                            borderRadius: 5,
                            border: '2px solid grey'
                        }}
                    >
                        <Typography
                            noWrap
                            variant="h6"
                            sx={{
                                color: 'grey',
                                fontWeight: 'bold',
                                marginTop: 2,
                                marginLeft: 3
                            }}
                        >
                            Models
                        </Typography>
                    </Box>
                </Grid>
            </Grid>
        </div>
        </div>
      </Box>
  )
}

const mapStateToProps = (state) => {
    //state指的是store裡的數據
    return {
        dataList: state.dataList,
        labelList: state.labelList
    }
  }

  const mapDispatchToProps = (dispatch) => {
    //dispatch指store.dispatch這個方法
    return {
        getDataList(id, text) {
          const action = GetDataList(id)
          dispatch(action)
        },
        getLabelList(id, text) {
          const action = GetLabelList(id)
          dispatch(action)
        },
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(Overview)