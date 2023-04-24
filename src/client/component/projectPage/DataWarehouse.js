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
import { Container } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MuiInput from '@mui/material/Input';
import ListItemText from '@mui/material/ListItemText';
import Slider from '@mui/material/Slider';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import FilterListIcon from '@mui/icons-material/FilterList';
import ImageIcon from '@mui/icons-material/Image';
import ViewListIcon from '@mui/icons-material/ViewList';
import ExpandCircleDownIcon from '@mui/icons-material/ExpandCircleDown';
import CircularProgress from '@mui/material/CircularProgress';
import ModelTrainingIcon from '@mui/icons-material/ModelTraining';
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';
import CancelIcon from '@mui/icons-material/Cancel';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import {
  GetDataList,
  GetDataItem,
  PostDataItem,
  PatchDataItem,
  GetS3Image,
  ResetS3ImageData,
  UploadImageFile,
  DataImport,
  UploadTrainData,
  PostTrainData,
  PostAIServerMQTT,
  CleanFilterItem
} from '../../store/actionCreater'

const columns = [
  { id: 'space', label: '', minWidth: '2vw' },
  { id: 'data', label: 'File Name', minWidth: '25vw' },
  { id: 'uploaded', label: 'Uploaded By', minWidth: '20vw' },
  { id: 'createdAt', label: 'Uploaded On', minWidth: '20vw' },
  { id: 'sampling', label: 'Sampled', minWidth: '10vw' },
  { id: 'annotation', label: 'Annotated', minWidth: '10vw' },
]

const DataWarehouse = (props) => {
  const {
    projectItem,
    userImport,
    labelList,
    dataList,
    getDataList,
    getDataItem,
    postDataItem,
    patchDataItem,
    s3Image,
    resetS3ImageData,
    uploadImageFile,
    projectImport,
    dataImport,
    uploadTrainData,
    postTrainData,
    s3Train,
    postAIServerMQTT,
    filterItem,
    cleanFilterItem
  } = props

  const [ anchorEl_Select, setAnchorEl_Select ] = useState(null)
  const openSelect = Boolean(anchorEl_Select)

  const [ anchorEl_Filter, setAnchorEl_Filter ] = useState(null)
  const openFilter = Boolean(anchorEl_Filter)
  const defaultSelect = filterItem?.dataset?.length > 0? filterItem?.dataset: []

  const [ selectItem, setSelectItem ] = useState(defaultSelect)
  const [ selectText, setSelectText ] = useState('Select All')
  const [ menuItem, setMenuItem ] = useState({
    all: true,
    cleaned: filterItem?.filter == 'sample',
    labeled: filterItem?.filter == 'annotation',
  })
  const [ open, setOpen ] = useState(false)
  const [ file, setFile ] = useState([])  // File that has been upload to S3
  const [ fileNum ,setFileNum ] = useState(0) // Number of selected files
  const [ openTrainData, setOpenTrainData ] = useState(false)
  const [ trainData, setTrainData ] = useState()
  const [ trainDataName, setTrainDataName ] = useState()
  const [ view, setView ] = useState(true)
  const [ sampleDialog, setSampleDialog ] = useState(false)
  const [ page, setPage ] = useState(0)
  const [ rowsPerPage, setRowsPerPage ] = useState(10)
  const [ sampleNumber, setSampleNumber ] = useState(1)

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  }

  const replacer = (key, value) => {
    if (key == 'id') return undefined
    else if (key == 'image') return undefined
    else if (key == 'video') return undefined
    else if (key == 'csv') return undefined
    else if (key == 'json') return undefined
    else if (key == 'cleanTag') return undefined
    else if (key == 'trainTag') return undefined
    else if (key == 'ProjectId') return undefined
    else if (key == 'DeviceId') return undefined
    else if (key == 'UserId') return undefined
    else return value
  }

  const navigate = useNavigate()
  const mounted = useRef()

  useEffect(() => {
    // console.log('filterItem', filterItem)
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

  const handleClickSampleTag = () => {
    if(selectItem.length) {
      selectItem.forEach((data) => {
        patchDataItem(data.id, { sampling: 1 })
      })
    }
    return
  }

  const handleCancelSampleTag = () => {
    if(selectItem.length) {
      selectItem.forEach((data) => {
        patchDataItem(data.id, { sampling: 0 })
      })
    } else {
      return
    }
  }

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

  const handleAutoSelect = () => {
    setSampleDialog(false)
    handleCloseSelect();
    setSelectItem([])
    const item = filterData
    var newItems = [];

    for (var i = 0; i < sampleNumber; i++) {
      var idx = Math.floor(Math.random() * item.length);
      newItems.push(item[idx]);
      item.splice(idx, 1);
    }
    setSelectItem(newItems)
    setTimeout(() => {
      setSelectText('Select All')
    }, 100)
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
    // if(e.target.files.length < 11) {
    setFileNum(e.target.files.length)
    for(var i = 0; i < e.target.files.length; i++) {
      var newName = `${dataList.project}_${localTime}_${('000' + (i + 1)).slice(-3)}_${e.target.files[i].name}`
      uploadImageFile(new File([e.target.files[i]], newName, { type: e.target.files[i].type }))
    }
    setTimeout(() => {setOpen(true)}, 500)
    // } else {
    //   alert('Upload limit. (Max: 10)')
    // }
  }

  const handleSubmit = () => {
    var now = new Date()
    var localTime = now.getFullYear().toString() + '.' +
        (now.getMonth() + 1).toString().padStart(2, '0') + '.' +
        now.getDate().toString().padStart(2, '0') + ' ' +
        now.getHours().toString().padStart(2, '0') + ':' +
        now.getMinutes().toString().padStart(2, '0') + ':' +
        now.getSeconds().toString().padStart(2, '0')
    var fileVersion = (now.getMonth() + 1).toString().padStart(2, '0') + '.' +
        now.getDate().toString().padStart(2, '0') + '.' +
        now.getHours().toString().padStart(2, '0') +
        now.getMinutes().toString().padStart(2, '0') +
        now.getSeconds().toString().padStart(2, '0')
    const modelName = 'Model_V1.' + fileVersion
    const trainJsonData = JSON.stringify({
      "project": projectItem.project,
      "modelName": modelName,
      "labels": labelList.Labels?.map((value) => {return value.labelClass}),
      "trainData": selectItem.map((item) => item.value),
      "timestamp": localTime
    }, replacer, 2)
    setTrainData(trainJsonData)
    setTrainDataName(modelName)
    const jsonData = JSON.parse(trainJsonData)
    const fileName = modelName + '.json'
    const file = new File([JSON.stringify(jsonData)], fileName, { type: 'application/json' })
    uploadTrainData(file)
    setOpenTrainData(true)
    console.log('selectItem', selectItem)
  }

  const handleConfirmTrainData = () => {
    setOpenTrainData(false)
    const data = {
      modelName: trainDataName,
      dataset: JSON.stringify(selectItem),
      status: 'in progress',
      ProjectId: projectImport,
      UserId: userImport,
    }
    const sendData = {
      "project": projectItem.project,
      "modelName": trainDataName
    }
    // console.log(data)
    postTrainData(data)
    postAIServerMQTT(sendData)
    setTimeout(() => {location.reload()}, 500)
  }

  const handleCloseTrainData = () => {
    setOpenTrainData(false)
  }

  const handleCloseSampleDialog = () => {
    setSampleDialog(false)
  }

  const filterData = dataList.Data?.filter((data) => {
    if (menuItem.cleaned && menuItem.labeled) {
      return data.sampling == true && data.annotation !== null
    }
    else if (menuItem.cleaned) {
      return data.sampling == true
    }
    else if (menuItem.labeled) {
      return data.annotation !== null
    } else {
      return data
    }
  })

  const handleSliderChange = (event, newValue) => {
    setSampleNumber(newValue);
  };

  const handleNumberChange = (event) => {
    if(event.target.value != ''){
      setSampleNumber(Number(event.target.value));
    }
  };

  const handleBlur = () => {
    if (sampleNumber < 1) {
      setSampleNumber(0);
    } else if (sampleNumber > filterData.length) {
      setSampleNumber(filterData.length);
    }
  };

  const dataSlice = (text) => {
    if(text != null){
      const annotation = JSON.parse(text.slice(text.indexOf('annotation')-1,-1).replace('"annotation":',''))
      const height = (JSON.parse(text.slice(text.indexOf('image')-1,text.indexOf('annotation')-2).replace('"image":',''))).height
      const width = (JSON.parse(text.slice(text.indexOf('image')-1,text.indexOf('annotation')-2).replace('"image":',''))).width
      return [annotation, height, width]
    } else {
      return [null, null, null]
    }
  }

  const generateRandomCode = (id) => {
    var myRandomColor = '#'+
                        (Math.floor(id*9).toString(16)).slice(0,1)+
                        (Math.floor(id*99).toString(16)).slice(0,1)+
                        (Math.floor(id*999).toString(16)).slice(0,1)
    return myRandomColor;
  }

  const ImageView = (
    <Box sx={{ flexGrow: 1 }} style={{ marginBottom: 20 }}>
      <Grid container
        maxWidth='90vw'
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 20 }}
        style={{ marginLeft: 10 }}
      >
        {filterData?.map((item, key) => {
          const annotation = dataSlice(item.annotation)[0]
          const height = dataSlice(item.annotation)[1]
          const width = dataSlice(item.annotation)[2]
          return(
            <Grid item xs={2} sm={4} md={4} key={key}>
              <Card
                sx={{
                  maxWidth: 280,
                  maxHeight: 210,
                  border: selectItem?.some(value => value.id == item.id)? '4px solid green': null,
                  "&:hover": { border: '4px solid lightblue' }
                }}
              >
                <CardActionArea
                  key={key}
                  style={{ position: 'relative' }}
                >
                  <Checkbox
                    inputProps={{ 'aria-label': 'data-checkbox' }}
                    style={{ position: 'absolute', top: 0 }}
                    sx={{
                      '& .MuiSvgIcon-root': { fontSize: 28 }
                    }}
                    icon={<CheckCircleIcon color='disabled' />}
                    checkedIcon={<CheckCircleIcon style={{color: 'green'}} />}
                    checked={selectItem?.some(value => value.id == item.id)}
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
                  {item.sampling === true?
                  <Box
                    style={{
                      position: 'absolute',
                      right: 2,
                      top: -5,
                    }}
                  >
                    <BookmarkIcon fontSize='large' color='primary'/>
                  </Box>:
                  <Box />
                  }
                  {item.annotation != null
                  ?annotation.map((c) => {
                    return (
                        <Box
                          style={{
                            position: 'absolute',
                            left: `${c.bbox[0]*(280/width)}px`,
                            top: `${c.bbox[1]*(210/height)}px`
                          }}
                          sx={{
                            width: `${c.bbox[2]*(280/width)}px`,
                            height: `${c.bbox[3]*(210/height)}px`,
                            border: `2px solid ${generateRandomCode(c.category_id)}`
                          }}
                          onClick={() => {
                            // console.log('id', item.id)
                            getDataItem(item.id)
                            dataImport(item.id)
                            setTimeout(() => {
                              navigate('/Annotation')
                            }, 300)
                          }}
                        />
                    )})
                  :<Box
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
                        onClick={() => {
                          // console.log('id', item.id)
                          getDataItem(item.id)
                          dataImport(item.id)
                          setTimeout(() => {
                            navigate('/Annotation')
                          }, 300)
                        }}
                      >
                        Unlabeled
                      </Typography>
                    </Box>
                  }
                </CardActionArea>
              </Card>
            </Grid>
          )
        })}
      </Grid>
    </Box>
  )

  const ListView = (
    <div>
      <Container
        style={{
          marginBottom: 10,
          width: '90vw',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <TableContainer sx={{ minHeight: '60vh', minWidth: '90vw' }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead
              sx={{
                [`& .MuiTableCell-head`]: {
                  backgroundColor: 'lightblue',
                  fontWeight: 'bold'
                },
              }}
            >
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{
                        minWidth: column.minWidth,
                        fontSize: '14pt'
                    }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {dataList.Data
                ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                      <TableCell key={'space'} align={'2vw'}/>
                      <TableCell key={'data'} align={'30vw'} style={{ color: 'white', fontSize: '11pt' }}>
                        {row.data}
                      </TableCell>
                      <TableCell key={'uploaded'} align={'20vw'} style={{ color: 'white', fontSize: '11pt' }}>
                        {row.Device !== null? row.Device.serialNumber: 'Local' }
                      </TableCell>
                      <TableCell key={'createdAt'} align={'25vw'} style={{ color: 'white', fontSize: '11pt' }}>
                        {row.createdAt?.slice(0, -5).replace('T', ' ')}
                      </TableCell>
                      <TableCell key={'sampling'} align={'20vw'} style={{ color: 'white', fontSize: '10pt' }}>
                        {row.sampling === true? <DoneIcon />: <CloseIcon />}
                      </TableCell>
                      <TableCell key={'annotation'} align={'20vw'} style={{ color: 'white', fontSize: '10pt' }}>
                        {row.annotation !== null? <DoneIcon />: <CloseIcon />}
                      </TableCell>
                    </TableRow>
                  )
                })
              }
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 20, 50]}
          component="div"
          count={filterData?.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          style={{ fontSize: '12pt', backgroundColor: 'lightblue', minWidth: '90vw' }}
        />
      </Container>
    </div>
  )

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
              <Grid
                container
                direction="row"
                justifyContent="flex-start"
                alignItems="center"
                width={'60vw'}
              >
                <Grid item>
                  <Typography
                    noWrap
                    variant="h5"
                    sx={{ color: 'white', fontWeight: 'bold', marginLeft: 5 }}
                  >
                    Data
                  </Typography>
                </Grid>
                <Grid item hidden={!menuItem.cleaned}>
                  <Typography
                    noWrap
                    variant="h5"
                    sx={{ color: 'white', fontWeight: 'bold', marginLeft: 1 }}
                  >
                    - Sampling
                  </Typography>
                </Grid>
                <Grid item hidden={!menuItem.labeled}>
                  <Typography
                    noWrap
                    variant="h5"
                    sx={{ color: 'white', fontWeight: 'bold', marginLeft: 1 }}
                  >
                    - Annotation
                  </Typography>
                </Grid>
                <Grid item hidden={filterItem?.filter === 'annotation'? false: true}>
                  <Grid
                    container
                    direction="row"
                    alignItems="center"
                  >
                    <Typography
                      noWrap
                      variant="h5"
                      sx={{ color: 'white', fontWeight: 'bold', marginLeft: 1 }}
                    >
                      - {filterItem?.modelName}
                    </Typography>
                    <IconButton
                      size='small'
                      aria-label="close"
                      component="label"
                      style={{
                        marginLeft: 2,
                        color: 'red',
                        // border: '1px solid red'
                      }}
                      onClick={()=>{
                        cleanFilterItem()
                        setSelectItem([])
                        setTimeout(() => {
                          location.reload()
                        },100)
                      }}
                    >
                      <CancelIcon />
                    </IconButton>
                  </Grid>
                </Grid>
              </Grid>
              <div>
                <Button
                  aria-label='train'
                  variant="contained"
                  sx={{
                    "&:disabled": {
                      border: 'thin solid grey',
                      color: 'grey',
                      opacity: .3,
                    },
                    marginRight: 2
                  }}
                  onClick={handleSubmit}
                  startIcon={<ModelTrainingIcon />}
                  disabled={
                    !(selectItem?.length > 0
                    && dataList.Data?.findIndex(item => item.annotation != null) !== -1)
                  }
                >
                  Train
                </Button>
                <Button
                  aria-label='upload'
                  variant="contained"
                  component="label"
                  sx={{ marginRight: 5 }}
                >
                  <CloudUploadIcon />
                  <input hidden accept="image/*" multiple type="file" onChange={handleUploadImage}/>
                </Button>
              </div>
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
                  <Button
                    aria-label='image'
                    variant="outlined"
                    component="label"
                    startIcon={<ImageIcon />}
                    onClick={() => setView(true)}
                  >
                    Image View
                  </Button>
                  <Button
                    aria-label='video'
                    variant="outlined"
                    component="label"
                    startIcon={<ViewListIcon />}
                    onClick={() => setView(false)}
                  >
                    List View
                  </Button>
                </ButtonGroup>
              </Grid>
              <Grid
                item
                hidden={!view}
              >
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
                  {console.log('menuItem', menuItem)}
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
                    <Checkbox
                      sx={{ color: 'white' }}
                      checked={menuItem.all}
                      indeterminate={menuItem.cleaned || menuItem.labeled}
                    />
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
                      if (menuItem.cleaned === true) {
                        cleanFilterItem()
                      }
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
                      if (menuItem.labeled === true) {
                        cleanFilterItem()
                      }
                    }}
                  >
                    <Checkbox sx={{ color: 'white' }} checked={menuItem.labeled} />
                    <ListItemText primary={'labeled'} sx={{ marginRight: 3 }} />
                  </MenuItem>
                </Menu>
              </Grid>
              <Grid item style={{ marginLeft: 2 }} >
                {selectItem?.length > 0?
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
                    {`Selected ${selectItem?.length} items`}
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
                <Button aria-label='image' variant="outlined" component="label" onClick={handleCancelSampleTag}>
                  DETAG - SAMPLE
                </Button>
              </Grid>
              <Grid
                item
                hidden={selectItem.length == 0}
                style={{ position: 'absolute', right: 160, marginRight: 5 }}
              >
                <Button
                  aria-label='sample'
                  variant="outlined"
                  component="label"
                  onClick={handleClickSampleTag}
                >
                  TAG - SAMPLE
                </Button>
              </Grid>
              <Grid
                item
                hidden={!view}
                style={{ position: 'absolute', right: 35, marginRight: 5 }}
              >
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
                    onClick={() => {
                      setSampleDialog(true)
                      setAnchorEl_Select(null)
                    }}
                  >
                    Auto Select
                  </MenuItem>
                </Menu>
              </Grid>
            </Grid>
            {view === true? ImageView: ListView}
          </div>
          }
        </div>
        <Dialog open={open}>
        {file.length < fileNum?
        <DialogContent style={{ backgroundColor: '#444950' }}>
          <CircularProgress color="info" size={20} />
        </DialogContent>:
        <DialogContent style={{ backgroundColor: '#444950', color: 'white' }}>From InstAI</DialogContent>
        }
        {file.length < fileNum?
        <DialogTitle id="alert-dialog-title" textAlign={'center'} style={{ backgroundColor: '#444950', color: 'white', width: '30vw' }}>
          Image uploading {file.length}/{fileNum}, please wait...
        </DialogTitle>:
        <DialogTitle id="alert-dialog-title" textAlign={'center'} style={{ backgroundColor: '#444950', color: 'white', width: '30vw' }}>
          Uploaded successfully!
        </DialogTitle>
        }
        <DialogActions style={{ backgroundColor: '#444950' }}>
          <Button variant="contained" size='small' onClick={handleClose} style={{marginTop: 10}} disabled={file.length < fileNum}>OK</Button>
        </DialogActions>
      </Dialog>
      <Dialog open={openTrainData} onClose={handleCloseTrainData}>
        <DialogContent style={{ backgroundColor: '#444950', color: 'white' }}>AI Server</DialogContent>
        <DialogTitle style={{ backgroundColor: '#444950' }}>
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
        >
          <div
            style={{
              borderRadius: 5,
              backgroundColor: 'lightgrey',
            }}
          >
            <Typography style={{ margin: 5 }}>
              {trainData}
            </Typography>
          </div>
        </Grid>
        </DialogTitle>
        <DialogActions style={{ backgroundColor: '#444950' }}>
          <Button variant="contained" size='small' onClick={handleCloseTrainData} style={{marginTop: 10}}>Cancel</Button>
          <Button variant="contained" size='small' onClick={handleConfirmTrainData} style={{marginTop: 10}} disabled={trainDataName+'.json' != s3Train.filename}>Confirm</Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={sampleDialog}
        onClose={handleCloseSampleDialog}
      >
        <DialogContent style={{ backgroundColor: '#444950', color: 'white' }}>Auto Sampling</DialogContent>
        <DialogTitle style={{ backgroundColor: '#444950' }}>
          <Grid style={{ marginTop: 5 }}>
            <Typography id="input-slider" gutterBottom style={{ color: 'white' }}>
              Please select the number of data to be sampled
            </Typography>
            <Grid container spacing={2} sx={{ width: 400, marginTop: 1 }}>
              <Grid item xs={9}>
                <Slider
                  name='sampleNumber'
                  value={typeof sampleNumber === 'number' ? sampleNumber : 1}
                  onChange={handleSliderChange}
                  aria-labelledby="input-slider"
                  size='small'
                  min={1}
                  max={filterData?.length}
                />
              </Grid>
              <Grid item xs={3}>
                <MuiInput
                  name='sampleNumber'
                  value={sampleNumber}
                  size="small"
                  onChange={handleNumberChange}
                  onBlur={handleBlur}
                  disableUnderline
                  inputProps={{
                    step: 1,
                    min: 1,
                    max: filterData?.length,
                    type: 'number',
                    'aria-labelledby': 'input-slider',
                    style: { color: 'white' },
                  }}
                />
              </Grid>
            </Grid>
          </Grid>
        </DialogTitle>
        <DialogActions style={{ backgroundColor: '#444950' }}>
          <Button variant="contained" size='small' onClick={handleCloseSampleDialog} style={{marginTop: 10}}>Cancel</Button>
          <Button variant="contained" size='small' onClick={handleAutoSelect}style={{marginTop: 10}}>OK</Button>
        </DialogActions>
      </Dialog>
      </Box>
  )
}

const mapStateToProps = (state) => {
    //state指的是store裡的數據
    return {
      userImport: state.userImport,
      dataList: state.dataList,
      labelList: state.labelList,
      dataItem: state.dataItem,
      s3Image: state.s3Image,
      s3Train: state.s3Train,
      projectItem: state.projectItem,
      projectImport: state.projectImport,
      filterItem: state.filterItem
    }
  }

  const mapDispatchToProps = (dispatch) => {
    //dispatch指store.dispatch這個方法
    return {
      getDataList(id) {
        const action = GetDataList(id)
        dispatch(action)
      },
      getDataItem(id) {
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
      uploadTrainData(file) {
        const action = UploadTrainData(file)
        dispatch(action)
      },
      postTrainData(data) {
        const action = PostTrainData(data)
        dispatch(action)
      },
      postAIServerMQTT(data) {
        const action = PostAIServerMQTT(data)
        dispatch(action)
      },
      cleanFilterItem() {
        const action = CleanFilterItem()
        dispatch(action)
      }
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(DataWarehouse)