import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Grid from '@mui/material/Grid';
import Checkbox from '@mui/material/Checkbox';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea } from '@mui/material';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import FilterListIcon from '@mui/icons-material/FilterList';
import MoreVertIcon from '@mui/icons-material/MoreVert';
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
              component="label"
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
                <input hidden accept="image/*" multiple type="file" />
              </Typography>
            </Button>
          </div>:
          <div>
            <Grid
              minWidth='90vw'
              container
              direction="row"
              sx={{ marginTop: 4, marginBottom: 2, justifyContent: 'space-between' }}
            >
              <Typography
                noWrap
                variant="h5"
                sx={{ color: 'white', fontWeight: 'bold', marginLeft: 5 }}
              >
                Data
              </Typography>
              <ButtonGroup aria-label="button group" sx={{ marginRight: 5 }}>
                <Button aria-label='upload' variant="outlined" component="label">
                  Upload
                  <input hidden accept="image/*" multiple type="file" />
                </Button>
                <Button aria-label='train' variant="contained" component="label">
                  Train
                </Button>
              </ButtonGroup>
            </Grid>
            <Grid
              minWidth='90vw'
              container
              direction="row"
              justifyContent="left"
              alignItems="center"
              spacing={2}
              sx={{ marginBottom: 3 }}
              style={{ position: 'relative' }}
            >
              <Grid item>
                <ButtonGroup aria-label="button group-2" sx={{ marginLeft: 5 }}>
                  <Button aria-label='image' variant="outlined" component="label">
                    Image View
                  </Button>
                  <Button aria-label='video' variant="outlined" component="label">
                    Video View
                  </Button>
                </ButtonGroup>
              </Grid>
              <Grid item>
                <Button
                  variant="outlined"
                  startIcon={<FilterListIcon />}
                >
                  Filter
                </Button>
              </Grid>
              <Grid item style={{ position: 'absolute', right: 25, marginRight: 5 }}>
                <TextField
                  focused
                  select
                  id="outlined-select-data"
                  label="Select"
                  color='info'
                  size='small'
                  sx={{ m: 1, minWidth: 120 }}
                  InputProps={{ style:{ color: 'white' }}}
                >
                  <MenuItem key={'selectAll'} value={'selectAll'}>
                    Select All
                  </MenuItem>
                  <MenuItem key={'selectPage'} value={'selectPage'}>
                    Select Page
                  </MenuItem>
                </TextField>
              </Grid>
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
                        <CardActionArea style={{ position: 'relative' }}>
                          <Checkbox
                            inputProps={{ 'aria-label': 'data-checkbox' }}
                            style={{ position: 'absolute', top: 0 }}
                            sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }}
                            icon={<CheckCircleIcon color='disabled' />}
                            checkedIcon={<CheckCircleIcon color='primary' />}
                          />
                          <CardMedia
                            title='Image'
                            component="img"
                            image={`https://d20cmf4o2f77jz.cloudfront.net/image/${item.data}.jpg`}
                          />
                          <Box
                            style={{
                              position: 'absolute',
                              right: 5,
                              bottom: 5,
                              backgroundColor: '#000',
                              color: '#fff',
                              opacity: .5,
                              borderRadius: 5
                            }}
                          >
                            <Typography
                              style={{
                                marginLeft: 5,
                                marginRight: 5,
                                fontSize: '12px'
                              }}
                            >
                              {item.json == '0'? 'Unlabeled': null}
                            </Typography>
                          </Box>
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