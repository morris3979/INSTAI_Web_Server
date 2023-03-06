import React, { useState, useEffect, useRef } from 'react'
import { connect } from 'react-redux'
import { useNavigate } from "react-router-dom";
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
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
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import FilterListIcon from '@mui/icons-material/FilterList';
import ImageIcon from '@mui/icons-material/Image';
import VideoCameraBackIcon from '@mui/icons-material/VideoCameraBack';
import ExpandCircleDownIcon from '@mui/icons-material/ExpandCircleDown';
import {
  GetDataList,
  GetDataItem,
  PostDataItem,
  PatchDataItem,
  GetS3Image,
  ResetS3ImageData,
  UploadImageFile,
  DataImport
} from '../../store/actionCreater'

const DataWarehouse = (props) => {
  const {
    dataList,
    getDataList,
    getDataItem,
    postDataItem,
    patchDataItem,
    s3Image,
    resetS3ImageData,
    uploadImageFile,
    projectImport,
    dataImport
  } = props

  const [ anchorEl_Select, setAnchorEl_Select ] = useState(null)
  const openSelect = Boolean(anchorEl_Select)
  const [ anchorEl_Tag, setAnchorEl_Tag ] = useState(null)
  const openTag = Boolean(anchorEl_Tag)

  const [ anchorEl_Filter, setAnchorEl_Filter ] = useState(null)
  const openFilter = Boolean(anchorEl_Filter)

  const [ selectItem, setSelectItem ] = useState([])
  const [ selectText, setSelectText ] = useState('Select All')
  const [ menuItem, setMenuItem ] = useState({
    all: true,
    cleaned: false,
    labeled: false,
    toTrain: false
  })
  const [ open, setOpen ] = useState(false)
  const [ file, setFile ] = useState([])  // File that has been upload to S3
  const [ fileNum ,setFileNum ] = useState(0) // Number of selected files
  const navigate = useNavigate()
  const mounted = useRef();

  useEffect(() => {
    if(mounted.current === false) {
      mounted.current = true
      getDataList(projectImport)
      resetS3ImageData()
    } else {
      if(s3Image.filename) {
        let currentS3file = s3Image
        setFile([...file, currentS3file])
      } else {
        return
      }
    }
  },[s3Image])

  const handleClickFilter = (event) => {
    setAnchorEl_Filter(event.currentTarget)
  }

  const handleCloseFilter = () => {
    setAnchorEl_Filter(null)
  }

  const handleClickSelect = (event) => {
    setAnchorEl_Select(event.currentTarget)
  }

  const handleCloseSelect = () => {
    setAnchorEl_Select(null)
  }

  const handleClickTag = (event) => {
    setAnchorEl_Tag(event.currentTarget)
  }

  const handleCloseTag = () => {
    setAnchorEl_Tag(null)
  }

  const handleClose = () => {
    mounted.current = false
    resetS3ImageData()
    setOpen(false)
    file.forEach((data) => {
      const newName = data.filename
      postDataItem({ data: newName.slice(0, newName.indexOf('.')), image: 1, ProjectId: projectImport })
    })
    setTimeout(() => {location.reload()}, 1000)
  }

  const handleSelectItem = (id, value) => {
    if(selectItem.some(value => value.id == id)) {
      setSelectItem(
        selectItem.filter((c) => {
          return c.id != id
        })
      )
    } else {
      setSelectItem([
        ...selectItem,
        {id: id, value: value}
      ])
    }
  }

  const handleSelectAll = () => {
    handleCloseSelect()
    setSelectItem(filterData)
  }

  const handleAutoSampling = () => {
    handleCloseSelect();
    setSelectItem([])
    const item = filterData
    var newItems = [];

    for (var i = 0; i < item.length; i++) {
      var idx = Math.floor(Math.random() * item.length);
      newItems.push(item[idx]);
      item.splice(idx, 1);
    }
    setSelectItem(newItems)
    setTimeout(() => {
      setSelectText('Select All')
    }, 100)
  }

  const handleClickCleanTag = () => {
    if(selectItem.length) {
      selectItem.forEach((data) => {
        patchDataItem(data.id, { cleanTag: 1 })
      })
    } else {
      return
    }
  }

  const handleCancelCleanTag = () => {
    if(selectItem.length) {
      selectItem.forEach((data) => {
        patchDataItem(data.id, { cleanTag: 0 })
      })
    } else {
      return
    }
  }

  const handleClickTrainTag = () => {
    if(selectItem.length) {
      selectItem.forEach((data) => {
        patchDataItem(data.id, { trainTag: 1 })
      })
    } else {
      return
    }
  }

  const handleCancelTrainTag = () => {
    if(selectItem.length) {
      selectItem.forEach((data) => {
        patchDataItem(data.id, { trainTag: 0 })
      })
    } else {
      return
    }
  }

  const handleUploadImage = (e) => {
    setFile([])
    var now = new Date()
    var localTime = now.getFullYear().toString() + '-' +
        (now.getMonth() + 1).toString().padStart(2, '0') + '-' +
        now.getDate().toString().padStart(2, '0') + '_' +
        now.getHours().toString().padStart(2, '0') + ':' +
        now.getMinutes().toString().padStart(2, '0') + ':' +
        now.getSeconds().toString().padStart(2, '0')
    if(e.target.files.length < 6) {
      setFileNum(e.target.files.length)
      for(var i = 0; i < e.target.files.length; i++) {
        var newName = `${dataList.project}_${localTime}_${('000' + (i + 1)).slice(-3)}_${e.target.files[i].name}`
        uploadImageFile(new File([e.target.files[i]], newName, { type: e.target.files[i].type }))
      }
      setTimeout(() => {setOpen(true)}, 500)
    } else {
      alert('Uploaded limit. (Max: 5)')
    }
  }

  const filterData = dataList.Data?.filter((data) => {
    if (menuItem.cleaned && menuItem.labeled && menuItem.toTrain) {
      return data.cleanTag == true && data.json == true && data.trainTag == true
    }
    else if (menuItem.cleaned) {
      return data.cleanTag == true
    }
    else if (menuItem.labeled) {
      return data.json == true
    }
    else if (menuItem.toTrain) {
      return data.trainTag == true
    } else {
      return data
    }
  })

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
          {dataList.Data?.length == 0?
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Grid
              minWidth='90vw'
              container
              direction="row"
              sx={{ marginTop: 4, marginBottom: 2, justifyContent: 'flex-start' }}
            >
              <Typography
                noWrap
                variant="h5"
                sx={{ color: 'white', fontWeight: 'bold', marginLeft: 5 }}
              >
                Data
              </Typography>
            </Grid>
            <Typography
              noWrap
              variant="h4"
              sx={{
                color: 'orangered',
                fontWeight: 'bold',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                marginTop: 5,
              }}
            >
              Please use Device to data collection
            </Typography>
            <Box width={'20vw'}>
              <Divider
                sx={{
                  '&.MuiDivider-root': {
                      "&::before": {
                        borderTop: "thin solid green"
                      },
                      "&::after": {
                        borderTop: "thin solid blue"
                      }
                  },
                  marginTop: 5,
                  marginBottom: 2
                }}
              >
                <Typography
                  color='lightblue'
                  variant='h6'
                  sx={{ fontWeight: 'bold' }}
                >
                  or
                </Typography>
              </Divider>
            </Box>
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
                <input hidden accept="image/*" multiple type="file" onChange={handleUploadImage}/>
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
              <Button
                aria-label='upload'
                variant="contained"
                component="label"
                sx={{ marginRight: 5 }}
                startIcon={<CloudUploadIcon />}
              >
                Upload
                <input hidden accept="image/*" multiple type="file" onChange={handleUploadImage}/>
              </Button>
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
                  <Button aria-label='image' variant="outlined" component="label" startIcon={<ImageIcon />}>
                    Image View
                  </Button>
                  <Button aria-label='video' variant="outlined" component="label" startIcon={<VideoCameraBackIcon />}>
                    Video View
                  </Button>
                </ButtonGroup>
              </Grid>
              <Grid item>
                <Button
                  id="basic-button"
                  variant="outlined"
                  aria-controls={openFilter ? 'basic-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={openFilter ? 'true' : undefined}
                  onClick={handleClickFilter}
                  color='primary'
                  startIcon={<FilterListIcon />}
                >
                  Filter
                </Button>
                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl_Filter}
                  open={openFilter}
                  onClose={handleCloseFilter}
                  MenuListProps={{
                    'aria-labelledby': 'basic-button'
                  }}
                  PaperProps={{
                    sx: {
                      color: 'white',
                      backgroundColor: '#1c2127'
                    }
                  }}
                >
                  <MenuItem
                    key={'All'}
                    sx={{ color: 'white', backgroundColor: '#1c2127' }}
                    onClick={(e) => {
                      setMenuItem((prevState) => ({
                        ...prevState,
                        all: e.target.checked
                      }))
                    }}
                  >
                    <Checkbox sx={{ color: 'white' }} checked={menuItem.all} indeterminate={menuItem.cleaned || menuItem.labeled} />
                    <ListItemText primary={'All'} sx={{ marginRight: 3 }} />
                  </MenuItem>
                  <MenuItem
                    key={'cleaned'}
                    sx={{ color: 'white', backgroundColor: '#1c2127' }}
                    onClick={(e) => {
                      setMenuItem((prevState) => ({
                        ...prevState,
                        cleaned: e.target.checked
                      }))
                    }}
                  >
                    <Checkbox sx={{ color: 'white' }} checked={menuItem.cleaned} />
                    <ListItemText primary={'cleaned'} sx={{ marginRight: 3 }} />
                  </MenuItem>
                  <MenuItem
                    key={'labeled'}
                    sx={{ color: 'white', backgroundColor: '#1c2127' }}
                    onClick={(e) => {
                      setMenuItem((prevState) => ({
                        ...prevState,
                        labeled: e.target.checked
                      }))
                    }}
                  >
                    <Checkbox sx={{ color: 'white' }} checked={menuItem.labeled} />
                    <ListItemText primary={'labeled'} sx={{ marginRight: 3 }} />
                  </MenuItem>
                  <MenuItem
                    key={'toTrain'}
                    sx={{ color: 'white', backgroundColor: '#1c2127' }}
                    onClick={(e) => {
                      setMenuItem((prevState) => ({
                        ...prevState,
                        toTrain: e.target.checked
                      }))
                    }}
                  >
                    <Checkbox sx={{ color: 'white' }} checked={menuItem.toTrain} />
                    <ListItemText primary={'to train'} sx={{ marginRight: 3 }} />
                  </MenuItem>
                </Menu>
              </Grid>
              <Grid
                item
                style={{ marginLeft: 2 }}
              >
                {selectItem.length > 0?
                <Grid
                  container
                  direction="row"
                  justifyContent="center"
                  alignItems="center"
                >
                  <Typography
                    noWrap
                    variant="h6"
                    sx={{
                      color: 'white',
                      fontWeight: 'bold'
                    }}
                  >
                    {`Selected ${selectItem.length} items`}
                  </Typography>
                  <Button
                    variant="contained"
                    onClick={() => setSelectItem([])}
                    style={{ marginLeft: 10 }}
                  >
                    Deselect All
                  </Button>
                </Grid>
                :null
                }
              </Grid>
              <Grid item hidden={(selectItem.length == 0) || (!menuItem.cleaned)}>
                <Button aria-label='image' variant="outlined" component="label" onClick={handleCancelCleanTag} startIcon={<ImageIcon />}>
                  DETAG CLEAN
                </Button>
              </Grid>
              <Grid item hidden={(selectItem.length == 0) || (!menuItem.toTrain)}>
                <Button aria-label='image' variant="outlined" component="label" onClick={handleCancelTrainTag} startIcon={<ImageIcon />}>
                  DETAG TO TRAIN
                </Button>
              </Grid>
              <Grid
                item
                style={{ position: 'absolute', right: 160, marginRight: 5 }}
              >
                <Button
                  id="basic-button"
                  variant="outlined"
                  aria-controls={openTag ? 'basic-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={openTag ? 'true' : undefined}
                  onClick={handleClickTag}
                  color='primary'
                  endIcon={<ExpandCircleDownIcon />}
                >
                  Tag
                </Button>
                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl_Tag}
                  open={openTag}
                  onClose={handleCloseTag}
                  MenuListProps={{
                    'aria-labelledby': 'basic-button'
                  }}
                  PaperProps={{
                    sx: {
                      color: 'white',
                      backgroundColor: '#1c2127'
                    }
                  }}
                >
                  <MenuItem
                    sx={{ color: 'white', backgroundColor: '#1c2127' }}
                    disabled={selectItem.length == 0}
                    onClick={handleClickCleanTag}
                  >
                    CLEAN
                  </MenuItem>
                  <MenuItem
                    sx={{ color: 'white', backgroundColor: '#1c2127' }}
                    disabled={selectItem.length == 0}
                    onClick={handleClickTrainTag}
                  >
                    TO TRAIN
                  </MenuItem>
                </Menu>
              </Grid>
              <Grid item style={{ position: 'absolute', right: 35, marginRight: 5 }}>
                <Button
                  id="basic-button"
                  variant="outlined"
                  aria-controls={openSelect ? 'basic-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={openSelect ? 'true' : undefined}
                  onClick={handleClickSelect}
                  color='primary'
                  endIcon={<ExpandCircleDownIcon />}
                >
                  Select
                </Button>
                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl_Select}
                  open={openSelect}
                  onClose={handleCloseSelect}
                  MenuListProps={{
                    'aria-labelledby': 'basic-button'
                  }}
                  PaperProps={{
                    sx: {
                      color: 'white',
                      backgroundColor: '#1c2127'
                    }
                  }}
                >
                  <MenuItem
                    sx={{ color: 'white', backgroundColor: '#1c2127' }}
                    onClick={handleSelectAll}
                  >
                    {selectText}
                  </MenuItem>
                  <MenuItem
                    sx={{ color: 'white', backgroundColor: '#1c2127' }}
                    onClick={handleAutoSampling}
                  >
                    Auto Sampling
                  </MenuItem>
                </Menu>
              </Grid>
            </Grid>
            <Box sx={{ flexGrow: 1 }} style={{ marginBottom: 20 }}>
              <Grid container
                maxWidth='90vw'
                spacing={{ xs: 2, md: 3 }}
                columns={{ xs: 4, sm: 8, md: 20 }}
                style={{ marginLeft: 10 }}
              >
                {filterData?.map((item, key) => {
                  return(
                    <Grid item xs={2} sm={4} md={4} key={key}>
                      <Card
                        sx={{
                          maxWidth: 280,
                          border: selectItem.some(value => value.id == item.id)? '2px solid green': null,
                          "&:hover": { border: '2px solid lightblue' }
                        }}
                      >
                        <CardActionArea
                          key={key}
                          style={{ position: 'relative' }}
                        >
                          <Checkbox
                            inputProps={{ 'aria-label': 'data-checkbox' }}
                            style={{ position: 'absolute', top: 0 }}
                            sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }}
                            icon={<CheckCircleIcon color='disabled' />}
                            checkedIcon={<CheckCircleIcon color='primary' />}
                            checked={selectItem.some(value => value.id == item.id)}
                            onClick={() => { handleSelectItem(item.id, item.data)} }
                          />
                          <CardMedia
                            title='Image'
                            component="img"
                            image={`https://d20cmf4o2f77jz.cloudfront.net/image/${item.data}.jpg`}
                            onClick={() => {
                              // console.log('id', item.id)
                              getDataItem(item.id)
                              dataImport(item.id)
                              setTimeout(() => {
                                navigate('/Annotation')
                              }, 300)
                            }}
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
        <Dialog open={open} onClose={handleClose}>
        <DialogContent style={{ backgroundColor: '#444950', color: 'white' }}>Image Upload</DialogContent>
        <DialogTitle id="alert-dialog-title" textAlign={'center'} style={{ backgroundColor: '#444950', color: 'white', width: '30vh' }}>
          Image Uploading {file.length}/{fileNum}, Please Wait...
        </DialogTitle>
        <DialogActions style={{ backgroundColor: '#444950' }}>
          <Button variant="contained" size='small' onClick={handleClose} style={{marginTop: 10}} disabled={file.length != fileNum}>OK</Button>
        </DialogActions>
      </Dialog>
      </Box>
  )
}

const mapStateToProps = (state) => {
    //state指的是store裡的數據
    return {
      dataList: state.dataList,
      dataItem: state.dataItem,
      s3Image: state.s3Image,
      projectImport: state.projectImport
    }
  }

  const mapDispatchToProps = (dispatch) => {
    //dispatch指store.dispatch這個方法
    return {
      getDataList(id, text) {
        const action = GetDataList(id)
        dispatch(action)
      },
      getDataItem(id, text) {
        const action = GetDataItem(id)
        dispatch(action)
      },
      postDataItem(data) {
        const action = PostDataItem(data)
        dispatch(action)
      },
      patchDataItem(id ,data) {
        const action = PatchDataItem(id, data)
        dispatch(action)
      },
      getS3Image(file) {
        const action = GetS3Image(file)
        dispatch(action)
      },
      resetS3ImageData() {
        const action = ResetS3ImageData()
        dispatch(action)
      },
      uploadImageFile(file) {
        const action = UploadImageFile(file)
        dispatch(action)
      },
      dataImport(id) {
        const action = DataImport(id)
        dispatch(action)
      },
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(DataWarehouse)