import React, { useState, useEffect, useRef } from 'react'
import { connect } from 'react-redux'
import { useNavigate } from "react-router-dom";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import SaveIcon from '@mui/icons-material/Save';
import InstAI from '../../icon image/instai.png'
import {
  AddLabel,
  GetLabelList,
  PatchDataItem,
  DownloadImage,
  GetDataItem,
  DownloadJSON,
  GetDataList
} from '../../store/actionCreater'

const drawerWidth = 240;

const ResponsiveDrawer = (props) => {
  const {
    dataItem,
    addLabel,
    getLabelList,
    patchDataItem,
    userInformation,
    downloadImage,
    getDataItem,
    downloadJSON,
    getDataList,
    dataList,
    projectImport
  } = props

  const [ anchorEl_Download, setAnchorEl_Download ] = useState(null)
  const openSelectDownload = Boolean(anchorEl_Download)
  const [ anchorEl_Delete, setAnchorEl_Delete ] = useState(null)
  const openSelectDelete = Boolean(anchorEl_Delete)
  const [ open, setOpen ] = useState(false)

  const navigate = useNavigate()
  const labelRef = useRef()

  useEffect(() => {
    dataItem
    getLabelList(projectImport)
    // console.log('dataItem', dataItem)
  },[])

  const handleClickDownload = (event) => {
    setAnchorEl_Download(event.currentTarget)
  }

  const handleCloseDownload = () => {
    setAnchorEl_Download(null)
  }

  const handleClickDelete = (event) => {
    setAnchorEl_Delete(event.currentTarget)
  }

  const handleCloseDelete = () => {
    setAnchorEl_Delete(null)
  }

  const onAddLabel = () => {
    if (labelRef.current.value != '') {
      addLabel({
        labelClass: labelRef.current.value,
        ProjectId: projectImport
      })
      getLabelList(projectImport)
      setOpen(false)
    } else {
      alert('Input Class Name cannot be empty!')
    }
  }

  const onCancel = () => {
    setOpen(false)
  }

  const onSave = () => {
    patchDataItem(dataItem.id, { json: 1, UserId: userInformation.id })
    getDataItem(dataItem.id)
    location.reload()
  }

  const onCloseLabel = () => {
    getDataList(dataList.id)
    setTimeout(() => {
        navigate('/Project/Data')
    }, 300)
  }

  const drawer = (
    <div>
        <IconButton
            aria-label="close label"
            component="label"
            onClick={onCloseLabel}
            style={{ marginLeft: 2, marginTop: 2, color: 'lightblue' }}
        >
            <CloseIcon />
        </IconButton>
        {/* <Toolbar /> */}
        <List>
            <ListItem style={{ marginTop: 4 }}>
                <ListItemButton
                    style={{
                        backgroundColor: 'darkorange',
                        color: '#0A1929',
                        justifyContent: "center",
                        alignItems: "center",
                        fontWeight: 'bold',
                        borderRadius: 5
                    }}
                    onClick={onSave}
                >
                    <SaveIcon style={{ marginRight: 5 }} />
                    Save labeled
                </ListItemButton>
            </ListItem>
        </List>
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
                marginTop: 2
            }}
        >
            <Typography
                color='lightblue'
                sx={{ fontWeight: 'bold' }}
            >
                General
            </Typography>
        </Divider>
        <List>
            <Grid
                container
                direction="column"
                spacing={2}
                style={{ marginLeft: 10, marginTop: 8 }}
            >
                <Typography color='grey' sx={{ fontWeight: 'bold' }}>Name</Typography>
                <Grid
                    container
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                    style={{ marginTop: 3 }}
                >
                    <Typography
                        color='darkgrey'
                        maxWidth={drawerWidth - 80}
                        style={{
                            wordWrap: 'break-word'
                        }}
                    >
                        {dataItem.data}
                    </Typography>
                </Grid>
            </Grid>
            <Grid
                container
                direction="column"
                spacing={2}
                style={{ marginLeft: 10, marginTop: 8 }}
            >
                <Typography color='grey' sx={{ fontWeight: 'bold' }}>Action</Typography>
                <Grid
                    container
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                >
                    <IconButton
                        aria-label="download label"
                        component="label"
                        aria-controls={openSelectDownload ? 'basic-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={openSelectDownload ? 'true' : undefined}
                        onClick={handleClickDownload}
                        style={{ color: 'darkgrey' }}
                    >
                        <FileDownloadIcon />
                    </IconButton>
                    <Menu
                        id="basic-menu"
                        anchorEl={anchorEl_Download}
                        open={openSelectDownload}
                        onClose={handleCloseDownload}
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
                            onClick={() => downloadImage(dataItem.data)}
                        >
                            Image file (.jpg)
                        </MenuItem>
                        <MenuItem
                            sx={{ color: 'white', backgroundColor: '#1c2127' }}
                            onClick={() => downloadJSON(dataItem.data)}
                            disabled={dataItem.json == 0}
                        >
                            Label file (.json)
                        </MenuItem>
                    </Menu>
                    <IconButton
                        aria-label="delete label"
                        component="label"
                        aria-controls={openSelectDelete ? 'basic-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={openSelectDelete ? 'true' : undefined}
                        onClick={handleClickDelete}
                        style={{ color: 'darkgrey' }}
                    >
                        <DeleteIcon />
                    </IconButton>
                    <Menu
                        id="basic-menu"
                        anchorEl={anchorEl_Delete}
                        open={openSelectDelete}
                        onClose={handleCloseDelete}
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
                            onClick={() => patchDataItem(dataItem.id, { json: 0, trainTag: 0, UserId: null })}
                            disabled={dataItem.json == 0}
                        >
                            Label file (.json)
                        </MenuItem>
                    </Menu>
                    <IconButton
                        aria-label="add label"
                        component="label"
                        style={{ color: 'darkgrey' }}
                        onClick={() => setOpen(true)}
                    >
                        <AddCircleIcon />
                    </IconButton>
                </Grid>
            </Grid>
        </List>
        <Divider
            sx={{
                '&.MuiDivider-root': {
                    "&::before": {
                      borderTop: "thin solid blue"
                    },
                    "&::after": {
                      borderTop: "thin solid green"
                    }
                },
                marginTop: 3
            }}
        >
            <Typography
                color='lightblue'
                sx={{ fontWeight: 'bold' }}
            >
                Details
            </Typography>
        </Divider>
        <List>
            <Grid
                container
                direction="column"
                spacing={2}
                style={{ marginLeft: 10, marginTop: 8 }}
            >
                <Typography color='grey' sx={{ fontWeight: 'bold' }}>Uploaded by</Typography>
                <Grid
                    container
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                    style={{ marginTop: 3 }}
                >
                    <Typography color='darkgrey'>
                        {dataItem.DeviceId == null? '(Local)': dataItem.Device?.serialNumber}
                    </Typography>
                </Grid>
            </Grid>
            <Grid
                container
                direction="column"
                spacing={2}
                style={{ marginLeft: 10, marginTop: 8 }}
            >
                <Typography color='grey' sx={{ fontWeight: 'bold' }}>Uploaded at</Typography>
                <Grid
                    container
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                    style={{ marginTop: 4 }}
                >
                    <Typography color='darkgrey' variant='button'>
                        {dataItem.createdAt?.slice(0, -5).replace('T', ' ')}
                    </Typography>
                </Grid>
            </Grid>
            <Grid
                container
                direction="column"
                spacing={2}
                style={{ marginLeft: 10, marginTop: 8 }}
            >
                <Typography color='grey' sx={{ fontWeight: 'bold' }}>Used Model</Typography>
                <Grid
                    container
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                    style={{ marginTop: 3 }}
                >
                    <Typography color='darkgrey'>
                        (No Model)
                    </Typography>
                </Grid>
            </Grid>
            <Grid
                container
                direction="column"
                spacing={2}
                style={{ marginLeft: 10, marginTop: 8 }}
            >
                <Typography color='grey' sx={{ fontWeight: 'bold' }}>Label worker</Typography>
                <Grid
                    container
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                    style={{ marginTop: 3 }}
                >
                    <Typography color='darkgrey'>
                        {dataItem.UserId === null? '(Unlabeled)': dataItem.User?.username}
                    </Typography>
                </Grid>
            </Grid>
            <Grid
                container
                direction="column"
                spacing={2}
                style={{ marginLeft: 10, marginTop: 8 }}
            >
                <Typography color='grey' sx={{ fontWeight: 'bold' }}>Last updated</Typography>
                <Grid
                    container
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                    style={{ marginTop: 4 }}
                >
                    <Typography color='darkgrey' variant='button'>
                        {dataItem.updatedAt?.slice(0, -5).replace('T', ' ')}
                    </Typography>
                </Grid>
            </Grid>
        </List>
        <List style={{ position: 'fixed', left: 0, bottom: 0 }}>
            <img src={InstAI} alt='Logo' style={{ width: drawerWidth }} />
        </List>
        {/* <Divider
            sx={{
                '&.MuiDivider-root': {
                    border: 'thin solid darkslateblue'
                },
                marginTop: 3
            }}
        /> */}
        <Dialog
            open={open}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogContent style={{ backgroundColor: '#444950', width: '30vh' }}>
                <DialogContentText id="alert-dialog-description" style={{ color: 'lightgrey' }}>
                    Add Class
                </DialogContentText>
            </DialogContent>
            <DialogTitle id="alert-dialog-title" textAlign={'center'} style={{ backgroundColor: '#444950', color: 'white', width: '30vh' }}>
                <TextField
                    focused
                    id="outlined-new-class"
                    label="new class"
                    size='small'
                    color='info'
                    // onChange={handleChangeText}
                    sx={{ width: 220 }}
                    placeholder='input class name'
                    InputProps={{
                    style: { color: 'white' },
                    endAdornment: <BookmarkBorderIcon style={{ color: 'white' }} />,
                    }}
                    inputRef={labelRef}
                />
            </DialogTitle>
            <DialogActions style={{ backgroundColor: '#444950', color: 'lightblue' }}>
                <Button autoFocus size='small'
                    variant="contained"
                    style={{marginTop: 10}}
                    onClick={onCancel}
                >
                    CANCEL
                </Button>
                <Button autoFocus size='small'
                    variant="contained"
                    style={{marginTop: 10}}
                    onClick={onAddLabel}
                >
                    ADD
                </Button>
            </DialogActions>
        </Dialog>
    </div>
  );

  return (
    <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar
            position="fixed"
            sx={{
                backgroundColor: '#0A1929',
                width: { sm: `calc(100% - ${drawerWidth}px)` },
                ml: { sm: `${drawerWidth}px` },
            }}
        >
            <Toolbar>
                <Typography
                    variant="h6"
                    noWrap
                    component="div"
                    color='lightblue'
                    sx={{ fontWeight: 'bold' }}
                >
                    Label Workspace
                </Typography>
            </Toolbar>
        </AppBar>
        <Box
            component="nav"
            sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
            aria-label="mailbox folders"
        >
            <Drawer
                variant="permanent"
                sx={{
                    display: { xs: 'none', sm: 'block' },
                    '& .MuiDrawer-paper': {
                        boxSizing: 'border-box',
                        width: drawerWidth,
                        backgroundColor: '#0A1929'
                    },
                }}
                open
            >
            {drawer}
            </Drawer>
        </Box>
    </Box>
  );
}

const mapStateToProps = (state) => {
    //state指的是store裡的數據
    return {
        dataItem: state.dataItem,
        userInformation: state.userInformation,
        dataList: state.dataList,
        projectImport: state.projectImport,
    }
}

const mapDispatchToProps = (dispatch) => {
    //dispatch指store.dispatch這個方法
    return {
        addLabel(value) {
          const action = AddLabel(value)
          dispatch(action)
        },
        getLabelList(id, text) {
          const action = GetLabelList(id)
          dispatch(action)
        },
        patchDataItem(id ,data) {
          const action = PatchDataItem(id, data)
          dispatch(action)
        },
        downloadImage(filename) {
          const action = DownloadImage(filename)
          dispatch(action)
        },
        getDataItem(id, text) {
          const action = GetDataItem(id)
          dispatch(action)
        },
        downloadJSON(filename) {
          const action = DownloadJSON(filename)
          dispatch(action)
        },
        getDataList(id, text) {
          const action = GetDataList(id)
          dispatch(action)
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ResponsiveDrawer)