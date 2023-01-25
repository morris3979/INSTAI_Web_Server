import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import {
  GetDataList,
} from '../../store/actionCreater'

const DataWarehouse = (props) => {
  const {
    dataList,
    getDataList
  } = props

  useEffect(() => {
    // console.log('dataList', dataList)
    dataList
    getDataList(dataList.id)
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
              sx={{ marginTop: 3, marginBottom: 2, justifyContent: 'space-between' }}
            >
              <Typography
                noWrap
                variant="h5"
                sx={{ color: 'white', fontWeight: 'bold', marginLeft: 5 }}
              >
                Data
              </Typography>
              <Button variant="contained" sx={{ marginRight: 5 }}>UPLOAD</Button>
            </Grid>
            <Box sx={{ flexGrow: 1 }} style={{ marginBottom: 20 }}>
              <Grid container
                maxWidth='90vw'
                spacing={{ xs: 2, md: 3 }}
                columns={{ xs: 4, sm: 8, md: 20 }}
                style={{ marginLeft: 10 }}
              >
                {dataList.Data.map((item, key) => {
                  return(
                    <Grid item xs={2} sm={4} md={4} key={key}>
                      <Card sx={{ maxWidth: 280 }}>
                        <CardActionArea>
                          <CardMedia
                            component="img"
                            image={`https://d20cmf4o2f77jz.cloudfront.net/image/${item.data}.jpg`}
                          />
                        </CardActionArea>
                      </Card>
                    </Grid>
                  )
                })}
              </Grid>
            </Box>
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
    return {
      getDataList(id, text) {
        const action = GetDataList(id)
        dispatch(action)
      },
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(DataWarehouse)