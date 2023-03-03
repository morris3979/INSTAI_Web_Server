import React, { lazy, useEffect } from 'react'
import { connect } from 'react-redux'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import {
  GetDataList,
  GetLabelList,
  GetModelList
} from '../../store/actionCreater'

const Overview = (props) => {
    const {
        dataList,
        getDataList,
        labelList,
        getLabelList,
        modelList,
        getModelList,
        projectImport
    } = props

    useEffect(() => {
        dataList
        labelList
        modelList
        getDataList(projectImport)
        getLabelList(projectImport)
        getModelList(projectImport)
    },[])


    return (
        <Box
            style={{ borderRadius: 20, marginLeft: 100, marginTop: 130 }}
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
                                border: '2px solid grey',
                                position: 'relative'
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
                                    position: 'absolute',
                                    right: 30,
                                    bottom: 15
                                }}
                            >
                                {dataList.Data?.length === undefined? 0: dataList.Data?.length}
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item>
                        <Box
                            sx={{
                                minWidth: '25vw',
                                minHeight: '20vh',
                                borderRadius: 5,
                                border: '2px solid grey',
                                position: 'relative'
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
                                    position: 'absolute',
                                    right: 30,
                                    bottom: 15
                                }}
                            >
                                {dataList.Data?.filter(item => item.json === true).length === undefined? 0: dataList.Data?.filter(item => item.json === true).length}
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item>
                        <Box
                            sx={{
                                minWidth: '25vw',
                                minHeight: '20vh',
                                borderRadius: 5,
                                border: '2px solid grey',
                                position: 'relative'
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
                                Data to Train
                            </Typography>
                            <Typography
                                noWrap
                                variant="h2"
                                sx={{
                                    color: 'green',
                                    fontWeight: 'bold',
                                    position: 'absolute',
                                    right: 30,
                                    bottom: 15
                                }}
                            >
                                {dataList.Data?.filter(item => item.trainTag === true).length === undefined? 0: dataList.Data?.filter(item => item.trainTag === true).length}
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
                                minHeight: '45vh',
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
                                    marginLeft: 3,
                                    marginBottom: 4
                                }}
                            >
                                Classes
                            </Typography>
                            {labelList?.Labels?.length == 0?
                            <div
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                }}
                            >
                                <Box
                                    style={{
                                        backgroundColor: '#000',
                                        color: '#fff',
                                        opacity: .5,
                                        borderRadius: 10,
                                    }}
                                >
                                    <Typography
                                        sx={{
                                            color: 'lightgrey',
                                            fontWeight: 'bold',
                                            fontSize: '30px',
                                            marginLeft: 2,
                                            marginRight: 2,
                                        }}
                                    >
                                        Empty...
                                    </Typography>
                                </Box>
                            </div>:
                            <div
                                style={{
                                    marginTop: 3,
                                    marginLeft: 40
                                }}
                            >
                                <Box
                                    sx={{
                                        display: 'grid',
                                        columnGap: 3,
                                        rowGap: 2,
                                        gridTemplateColumns: 'repeat(2, 1fr)',
                                    }}
                                >
                                    {labelList?.Labels?.map((Labels) => {
                                        return(
                                            <Typography
                                                noWrap
                                                variant="h5"
                                                sx={{
                                                    color: 'lightsteelblue',
                                                    fontWeight: 'bold',
                                                }}
                                            >
                                                {`● ${Labels.labelClass}`}
                                            </Typography>
                                        )
                                    })}
                                </Box>
                            </div>
                            }
                        </Box>
                    </Grid>
                    <Grid item>
                        <Box
                            sx={{
                                minWidth: '52vw',
                                minHeight: '45vh',
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
                            {modelList?.Models?.length == 0?
                            <div
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                }}
                            >
                                <Box
                                    style={{
                                        backgroundColor: '#000',
                                        color: '#fff',
                                        opacity: .5,
                                        borderRadius: 10,
                                    }}
                                >
                                    <Typography
                                        sx={{
                                            color: 'lightgrey',
                                            fontWeight: 'bold',
                                            fontSize: '30px',
                                            marginLeft: 2,
                                            marginRight: 2,
                                        }}
                                    >
                                        Empty...
                                    </Typography>
                                </Box>
                            </div>:
                            <div
                                style={{
                                    marginTop: 3,
                                    marginLeft: 40
                                }}
                            >
                                <Box
                                    sx={{
                                        display: 'grid',
                                        columnGap: 3,
                                        rowGap: 3,
                                        gridTemplateColumns: 'repeat(3, 1fr)',
                                    }}
                                >
                                    {modelList?.Models?.map((Models) => {
                                        return (
                                            <Typography
                                                noWrap
                                                variant="h5"
                                                sx={{
                                                    color: 'lightsteelblue',
                                                    fontWeight: 'bold',
                                                }}
                                            >
                                                {`◆ ${Models.modelName}`}
                                            </Typography>
                                        )
                                    })}
                                </Box>
                            </div>
                            }
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
        labelList: state.labelList,
        modelList: state.modelList,
        projectImport: state.projectImport,
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
        getModelList(id, text) {
          const action = GetModelList(id)
          dispatch(action)
        },
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(Overview)