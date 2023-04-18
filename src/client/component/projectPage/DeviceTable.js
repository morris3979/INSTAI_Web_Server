import React, { useState, useEffect, useRef } from 'react'
import { connect } from 'react-redux'
import { io } from 'socket.io-client'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Grid from '@mui/material/Grid';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slider from '@mui/material/Slider';
import Switch from '@mui/material/Switch';
import MenuItem from '@mui/material/MenuItem';
import { Container } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import MuiInput from '@mui/material/Input';
import {
  AddDevice,
  GetDeviceList,
  GetModelList,
  PatchDeviceData,
  DeleteDeviceData,
  PostDeviceMQTT,
} from '../../store/actionCreater'

const columns = [
  { id: 'serialNumber', label: 'SerialNumber', minWidth: '20vw' },
  { id: 'deviceName', label: 'Device Name', minWidth: '20vw' },
  { id: 'command', label: 'Mode', minWidth: '20vw' },
  { id: 'message', label: 'Status', minWidth: '20vw' }
]

const DeviceTable = (props) => {
  const {
    deviceList,
    modelList,
    addDevice,
    getDeviceList,
    getModelList,
    patchDeviceData,
    deleteDeviceData,
    projectImport,
    postDeviceMQTT
  } = props

  const mounted = useRef()

  useEffect(() => {
    getDeviceList(projectImport)
    getModelList(projectImport)
    const HTTP = ":8080";
    const HTTPS = ":8443";
    const httpSocket = io(HTTP)
    const httpsSocket = io(HTTPS)
    httpSocket.on('connect', () => console.log(httpSocket.id))
    httpSocket.on('connect_error', () => {
      setTimeout(() => httpSocket.connect(), 5000)
    })
    httpSocket.on('lobby', () => getDeviceList(projectImport))
    httpSocket.on('disconnect', () => {
      console.log('http socket disconnected ...')
    })
    httpsSocket.on('connect', () => console.log(httpsSocket.id))
    httpsSocket.on('connect_error', () => {
      setTimeout(() => httpsSocket.connect(), 5000)
    })
    httpsSocket.on('lobby', () => getDeviceList(projectImport))
    httpsSocket.on('disconnect', () => {
      console.log('https socket disconnected ...')
    })
  },[])

  const [ open, setOpen ] = useState(false)
  const [ openSerialNumber, setOpenSerialNumber ] = useState(false)
  const [ openDeviceName, setOpenDeviceName ] = useState(false)
  const [ searchName, setSearchName] = useState('')
  const [ modifyValue, setModifyValue ] = useState({
    id: '',
    text: '',
    command: null
  })
  const [ openCommand, setOpenCommand ] = useState(false)
  const [ input, setInput ] = useState({
    serialNumber: '',
    deviceName: '',
    ProjectId: projectImport
  })
  const [ page, setPage ] = useState(0)
  const [ rowsPerPage, setRowsPerPage ] = useState(5)
  const [ selected, setSelected ] = useState(null)
  const [ commandValue, setCommandValue ] = useState({
    Enable: false,
    Mode: '',
    Model: '',
    related_params: false,
    rec_after_event_switch: false,
    upload_all_pictures_switch: true,
    upload_all_files_switch: true,
    rec_time: 5,
    rec_fps: 15,
    rec_after_event_cycle: 1,
    rec_after_event_duration : 5
  })

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  }

  const onCreateDevice = () => {
    if(modifyValue.id) {
      if(input.serialNumber || input.deviceName){
        if(modifyValue.text == 'serialNumber') {
          patchDeviceData(modifyValue.id, { serialNumber: input.serialNumber })
          setOpenSerialNumber(false)
        }else{
          patchDeviceData(modifyValue.id, { deviceName: input.deviceName })
          setOpenDeviceName(false)
        }
      }else{
        alert('Invalid Value! Please Check Again')
      }
    }else{
      addDevice(input)
      setOpen(false)
    }
  }

  const onSaveCommand = () => {
    if(commandValue.Mode == 'CNN' || commandValue.Mode == 'S_MOTION_CNN'){
      var command = `mode: ${commandValue.Mode}`
      var message = ''
    }
    else if(commandValue.Mode == 'S_MOTION_CNN_JPEG' || commandValue.Mode == 'JPEG_REC'){
      if (commandValue.Mode == 'S_MOTION_CNN_JPEG') {
        var rec_value = commandValue.rec_after_event_switch == true ?
                          `rec_fps: ${commandValue.rec_fps},\n`+
                          `rec_after_event_cycle: ${commandValue.rec_after_event_cycle},\n`+
                          `rec_after_event_duration: ${commandValue.rec_after_event_duration},\n` : ''
        var command = `mode: ${commandValue.Mode},\n`+
                      `rec_after_event_switch: ${convertedValue(commandValue.rec_after_event_switch)},\n`+
                      rec_value+
                      `upload_all_pics: ${convertedValue(commandValue.upload_all_pictures_switch)},\n`+
                      `upload_to_server: ${convertedValue(commandValue.upload_all_files_switch)}`
        var message = ''
      }
      else if (commandValue.Mode == 'JPEG_REC') {
        var command = `mode: ${commandValue.Mode},\n`+
                      `rec_fps: ${commandValue.rec_fps},\n`+
                      `upload_all_pics: ${convertedValue(commandValue.upload_all_pictures_switch)},\n`+
                      `upload_to_server: ${convertedValue(commandValue.upload_all_files_switch)},\n`+
                      `rec: ${commandValue.rec_time}`
        var message = ''
      }
    }
    else if(commandValue.Mode == 'CNN_JPEG' || commandValue.Mode == 'CONT_JPEG_CNN'){
      var command = `mode: ${commandValue.Mode},\n`+
                    `upload_to_server: ${convertedValue(commandValue.upload_all_files_switch)}`
      var message = ''
    }
    else if(commandValue.Mode == 'UPDATE_MODEL'){
      var command = `update_model: ${commandValue.Model}`
      var message = ''
    }
    else if(selected){
      var command = selected
      var message = ''
    }
    else{
      var command = ''
      var message = ''
    }
    setOpenCommand(false)
    patchDeviceData(modifyValue.id, { command: command, message: message })
  }

  const handleSerialNumberOpen = (value) => {
    setOpenSerialNumber(true)
    setInput((prevState) => ({
      ...prevState,
      serialNumber: value
    }))
  }

  const handleSerialNumberClose = () => {
    setInput({
      serialNumber: '',
      deviceName: '',
      ProjectId: projectImport
    })
    setOpenSerialNumber(false)
  }

  const handleDeviceNameOpen = (value) => {
    setOpenDeviceName(true)
    setInput((prevState) => ({
      ...prevState,
      deviceName: value
    }))
  }

  const handleDeviceNameClose = () => {
    setInput({
      serialNumber: '',
      deviceName: '',
      ProjectId: projectImport
    })
    setOpenDeviceName(false)
  }

  const handleSliderChange = (event, newValue) => {
    setCommandValue((prevState) => ({
      ...prevState,
      [event.target.name]: newValue
    }));
  };

  const handleNumberChange = (event) => {
    if(event.target.value != ''){
      setCommandValue((prevState) => ({
        ...prevState,
        [event.target.name]: Number(event.target.value)
      }));
    }
  };

  const handleBlur = (e) => {
    if(e.target.name=='rec_time') {
      if (commandValue.rec_time < 1) {
        setCommandValue((prevState) => ({
          ...prevState,
          rec_time: 1
        }));
      } else if (commandValue.rec_time > 60) {
        setCommandValue((prevState) => ({
          ...prevState,
          rec_time: 60
        }));
      }
    }
    else if(e.target.name=='rec_fps') {
      if (commandValue.rec_fps < 1) {
        setCommandValue((prevState) => ({
          ...prevState,
          rec_fps: 1
        }));
      } else if (commandValue.rec_fps > 15) {
        setCommandValue((prevState) => ({
          ...prevState,
          rec_fps: 15
        }));
      }
    }
    else if (e.target.name=='rec_after_event_cycle'){
      if (commandValue.rec_after_event_cycle < 1) {
        setCommandValue((prevState) => ({
          ...prevState,
          rec_after_event_cycle: 1
        }));
      } else if (commandValue.rec_after_event_cycle > 15) {
        setCommandValue((prevState) => ({
          ...prevState,
          rec_after_event_cycle: 60
        }));
      }
    }
    else if(e.target.name=='rec_after_event_duration'){
      if (commandValue.rec_after_event_duration < 1) {
        setCommandValue((prevState) => ({
          ...prevState,
          rec_after_event_duration: 1
        }));
      } else if (commandValue.rec_after_event_duration > 60) {
        setCommandValue((prevState) => ({
          ...prevState,
          rec_after_event_duration: 60
        }));
      }
    }
  };

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleChangeText = (e) => {
    setSearchName(e.target.value)
  }

  const handleClickOpenCommand = () => {
    setOpenCommand(true)
  }

  const handleCloseCommand = () => {
    setOpenCommand(false)
    setTimeout((() => {
      setCommandValue({
        Enable: false,
        Mode: '',
        related_params: false,
        rec_after_event_switch: false,
        upload_all_pictures_switch: true,
        upload_all_files_switch: true,
        rec_time: 5,
        rec_fps: 15,
        rec_after_event_cycle: 1,
        rec_after_event_duration : 5
      })
    }),200)
  }

  const onChangeDevice = (e) => {
    setInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
  }

  const handleSwitchChange = (e) => {
    setCommandValue((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.checked,
    }))
    if(e.target.name=='Enable'&&e.target.checked==false) {
      setCommandValue((prevState) => ({
        ...prevState,
        related_params: false,
        rec_after_event_switch: false,
      }))
    }
    else if(e.target.name=='related_params'&&e.target.checked==false) {
      setCommandValue((prevState) => ({
        ...prevState,
        rec_after_event_switch: false,
      }))
    }
  };

  const handleCommandChange = (e) => {
    setSelected(e.target.value)
  }

  const handleModeChange = (e) => {
    setCommandValue((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
    if(e.target.value!='S_MOTION_CNN_JPEG') {
      setCommandValue((prevState) => ({
        ...prevState,
        related_params: false,
        rec_after_event_switch: false
      }))
      if(e.target.value=='CNN'||e.target.value=='S_MOTION_CNN') {
        setCommandValue((prevState) => ({
          ...prevState,
          related_params: false,
          rec_after_event_switch: false,
          upload_all_pictures_switch: true,
          upload_all_files_switch: true,
          rec_time: 5,
          rec_fps: 15,
          rec_after_event_cycle: 1,
          rec_after_event_duration : 5
        }))
      }
    }
  }

  const handleModelChange = (e) => {
    setCommandValue((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
  }

  const convertedValue = (value) => {
    if(value === true){
      return 'ON'
    }
    else if(value === false){
      return 'OFF'
    }
  }

  const filterDeviceList = deviceList.Devices?.filter((e) => {
    return e.serialNumber.includes(searchName) || e.deviceName.includes(searchName)
  })

  const actionBtn = (row) => {
    return (
      <ButtonGroup variant="outlined" aria-label="outlined button group">
        <Button 
          aria-label='delete'
          onClick={() => {
            deleteDeviceData(row.id)
          }}>
          <DeleteIcon style={{ color: 'white' }} />
        </Button>
        <Button
          aria-label='send'
          onClick={() => {
            postDeviceMQTT(row)
          }}
        >
          <RocketLaunchIcon style={{ color: 'white' }} />
        </Button>
      </ButtonGroup>
    )
  }

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
              Device
            </Typography>
          </Grid>
          <div
            style={{
              display: 'flex',
              justifyContent:'space-between',
              alignItems: 'center',
              width: '90vw',
              marginLeft: 35
            }}
          >
            <div style={{ float: 'left' }}>
              <Button
                variant="contained"
                sx={{ marginRight: 5 }}
                onClick={() => {
                  setModifyValue({ id: '', text: '', command: null })
                  handleClickOpen()
                }}
              >
                ADD DEVICE
              </Button>
            </div>
            <div style={{ float:'right' }}>
              <TextField
                focused
                id="outlined-start-adornment"
                label="Search"
                size='small'
                color='info'
                onChange={handleChangeText}
                sx={{ width: 400 }}
                placeholder='by serialnumber or device name'
                InputProps={{
                    style: { color: 'white' },
                    endAdornment: <SearchIcon style={{ color: 'white' }} />,
                }}
              />
            </div>
          </div>
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
              <TableContainer sx={{ minHeight: '50vh', minWidth: '90vw', marginTop: 3 }}>
                <Table stickyHeader aria-label="sticky table">
                  <TableHead
                    sx={{
                      [`& .MuiTableCell-head`]: {
                        backgroundColor: 'lightblue',
                        fontWeight: 'bold'
                      }
                    }}
                  >
                    <TableRow>
                      <TableCell
                        key={'action'}
                        style={{
                          minWidth: '10vw',
                          fontSize: '14pt'
                        }}
                      >
                        Action
                      </TableCell>
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
                    {searchName.length == 0?
                      deviceList.Devices
                      ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map((row) => {
                        return (
                          <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                            <TableCell key={'action'} style={{ display: 'flex', flexDirection: 'column', alignContent: 'center' }}>
                              {actionBtn(row)}
                            </TableCell>
                            <TableCell key={'serialNumber'} align={'20vw'} style={{ color: 'white', fontSize: '12pt' }}>
                              {row.serialNumber}
                              <IconButton
                                size='small'
                                color="primary"
                                aria-label="edit serialNumber"
                                component="label"
                                style={{ marginLeft: 15 }}
                                onClick={() => {
                                  setModifyValue({ id: row.id, text: 'serialNumber', command: null })
                                  handleSerialNumberOpen(row.serialNumber)
                                }}
                              >
                                <EditIcon/>
                              </IconButton>
                            </TableCell>
                            <TableCell key={'deviceName'} align={'20vw'} style={{ color: 'white', fontSize: '12pt' }}>
                              {row.deviceName}
                              <IconButton
                                size='small'
                                color="primary"
                                aria-label="edit deviceName"
                                component="label"
                                style={{ marginLeft: 15 }}
                                onClick={()=>{
                                  setModifyValue({ id: row.id, text: 'deviceName', command: null })
                                  handleDeviceNameOpen(row.deviceName)
                                }}
                              >
                                <EditIcon />
                              </IconButton>
                            </TableCell>
                            <TableCell key={'command'} align={'20vw'} style={{ color: 'white', fontSize: '12pt' }}>
                              {row.command}
                              <IconButton
                                size='small' color="primary"
                                aria-label="edit command"
                                component="label"
                                style={{ marginLeft: 15 }}
                                onClick={() => {
                                  handleClickOpenCommand()
                                  setModifyValue({ id: row.id, text: 'command', command: row.command })
                                }}
                              >
                                <EditIcon />
                              </IconButton>
                            </TableCell>
                            <TableCell key={'message'} align={'20vw'} style={{ color: 'white', fontSize: '12pt' }}>
                              {row.message}
                            </TableCell>
                          </TableRow>
                        )
                      })
                    : filterDeviceList
                      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map((row) => {
                        return (
                          <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                            <TableCell key={'action'} style={{ display: 'flex', flexDirection: 'column', alignContent: 'center' }}>
                              {actionBtn(row)}
                            </TableCell>
                            <TableCell key={'serialNumber'} align={'20vw'} style={{ color: 'white', fontSize: '12pt' }}>
                              {row.serialNumber}
                              <IconButton
                                size='small'
                                color="primary"
                                aria-label="edit serialNumber"
                                component="label"
                                style={{ marginLeft: 15 }}
                                onClick={()=>{
                                  setModifyValue({ id: row.id, text: 'serialNumber', command: null })
                                  handleSerialNumberOpen(row.serialNumber)
                                }}
                              >
                                <EditIcon />
                              </IconButton>
                            </TableCell>
                            <TableCell key={'deviceName'} align={'20vw'} style={{ color: 'white', fontSize: '12pt' }}>
                              {row.deviceName}
                              <IconButton
                                size='small'
                                color="primary"
                                aria-label="edit deviceName"
                                component="label"
                                style={{ marginLeft: 15 }}
                                onClick={()=>{
                                  setModifyValue({ id: row.id, text: 'deviceName', command: null })
                                  handleDeviceNameOpen(row.deviceName)
                                }}
                              >
                                <EditIcon />
                              </IconButton>
                            </TableCell>
                            <TableCell key={'command'} align={'20vw'} style={{ color: 'white', fontSize: '12pt' }}>
                              {row.command}
                              <IconButton
                                size='small' color="primary"
                                aria-label="edit command"
                                component="label"
                                style={{ marginLeft: 15 }}
                                onClick={() => {
                                  handleClickOpenCommand()
                                  setModifyValue({ id: row.id, text: 'command', command: row.command })
                                }}
                              >
                                <EditIcon />
                              </IconButton>
                            </TableCell>
                            <TableCell key={'message'} align={'20vw'} style={{ color: 'white', fontSize: '12pt' }}>
                              {row.message}
                            </TableCell>
                          </TableRow>
                        )
                      })}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[5, 10, 20, 50]}
                component="div"
                count={deviceList.Devices?.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                style={{ fontSize: '12pt', backgroundColor: 'lightblue', minWidth: '90vw' }}
              />
            </Container>
          </div>
        </div>
        <Dialog open={open} onClose={handleClose}>
          <DialogContent style={{ backgroundColor: '#444950', color: 'white' }}>
            Add Device
          </DialogContent>
          <DialogTitle style={{ backgroundColor: '#444950' }}>
            <Grid
              container
              direction="column"
              justifyContent="center"
              alignItems="center"
            >
              <TextField
                focused
                id="outlined-start-adornment"
                label="SerialNumber"
                name='serialNumber'
                size='small'
                color='info'
                sx={{ width: 300 }}
                placeholder='Host SerialNumber'
                InputProps={{
                  style: { color: 'white' }
                }}
                onChange={onChangeDevice}
              />
              <TextField
                focused
                id="outlined-start-adornment"
                label="Device Name"
                name='deviceName'
                size='small'
                color='info'
                sx={{ width: 300 }}
                style={{ marginTop: 20 }}
                placeholder='Collection Device Name'
                InputProps={{
                  style: { color: 'white' }
                }}
                onChange={onChangeDevice}
              />
            </Grid>
          </DialogTitle>
          <DialogActions style={{ backgroundColor: '#444950' }}>
            <Button variant="contained" size='small' onClick={handleClose} style={{marginTop: 10}}>Cancel</Button>
            <Button variant="contained" size='small' onClick={onCreateDevice} style={{marginTop: 10}}>ADD</Button>
          </DialogActions>
        </Dialog>
        <Dialog open={openSerialNumber} onClose={handleSerialNumberClose}>
          <DialogContent style={{ backgroundColor: '#444950', color: 'white' }}>
            Edit SerialNumber
          </DialogContent>
          <DialogTitle style={{ backgroundColor: '#444950' }}>
            <Grid
              container
              direction="column"
              justifyContent="center"
              alignItems="center"
            >
              <TextField
                focused
                id="outlined-start-adornment"
                label="SerialNumber"
                name='serialNumber'
                size='small'
                color='info'
                sx={{ width: 300 }}
                defaultValue={`${input.serialNumber}`}
                InputProps={{
                  style: { color: 'white' }
                }}
                onChange={onChangeDevice}
              />
            </Grid>
          </DialogTitle>
          <DialogActions style={{ backgroundColor: '#444950' }}>
            <Button variant="contained" size='small' onClick={handleSerialNumberClose} style={{marginTop: 10}}>Cancel</Button>
            <Button variant="contained" size='small' onClick={onCreateDevice} style={{marginTop: 10}}>SAVE</Button>
          </DialogActions>
        </Dialog>
        <Dialog open={openDeviceName} onClose={handleDeviceNameClose}>
          <DialogContent style={{ backgroundColor: '#444950', color: 'white' }}>
            Edit DeviceName
          </DialogContent>
          <DialogTitle style={{ backgroundColor: '#444950' }}>
            <Grid
              container
              direction="column"
              justifyContent="center"
              alignItems="center"
            >
              <TextField
                focused
                id="outlined-start-adornment"
                label="Device Name"
                name='deviceName'
                size='small'
                color='info'
                sx={{ width: 300 }}
                defaultValue={`${input.deviceName}`}
                InputProps={{
                  style: { color: 'white' }
                }}
                onChange={onChangeDevice}
              />
            </Grid>
          </DialogTitle>
          <DialogActions style={{ backgroundColor: '#444950' }}>
            <Button variant="contained" size='small' onClick={handleDeviceNameClose} style={{marginTop: 10}}>Cancel</Button>
            <Button variant="contained" size='small' onClick={onCreateDevice} style={{marginTop: 10}}>SAVE</Button>
          </DialogActions>
        </Dialog>
        <Dialog
          open={openCommand}
          onClose={handleCloseCommand}
          PaperProps={{
            sx: { width: "100%", maxWidth: "550px" }
          }}
        >
          <DialogContent style={{ backgroundColor: '#444950', color: 'white' }}>
            Mode
          </DialogContent>
          <DialogTitle style={{ backgroundColor: '#444950' }}>
            <Grid
              container
              direction="column"
            >
              <TextField
                focused
                id="outlined-start-adornment"
                label='Select a command to the Device'
                name='command'
                value={selected}
                select
                size='small'
                color='info'
                sx={{ width: 300 }}
                InputProps={{
                  style: { color: 'white' }
                }}
                onChange={handleCommandChange}
              >
                <MenuItem value='reset'>reset</MenuItem>
                <MenuItem value='mode?'>mode?</MenuItem>
                <MenuItem value='fw_ver?'>fw_ver?</MenuItem>
                <MenuItem value='progress?'>progress?</MenuItem>
                <MenuItem value='current_model?'>current_model?</MenuItem>
              </TextField>
            </Grid>
            <Grid
              justifyContent="left"
              alignItems="left"
              style={{ marginTop: 20 }}
            >
              <FormControl component="fieldset" variant="standard">
                <FormLabel component="legend" style={{ color: 'white' }}>Change Mode</FormLabel>
                  <FormControlLabel
                    control={
                      <Switch
                        name="Enable"
                        checked={commandValue.Enable}
                        onChange={handleSwitchChange}/>
                    }
                  />
              </FormControl>
            </Grid>
            <Grid
              justifyContent="left"
              alignItems="left"
              style={{ marginTop: 20 }}
              hidden={!commandValue.Enable}
            >
              <TextField
                focused
                id="outlined-basic"
                label="Please Select Mode to use"
                name="Mode"
                select
                size='small'
                color='info'
                sx={{ width: 300 }}
                InputProps={{
                  style: { color: 'white' }
                }}
                onChange={handleModeChange}
              >
                <MenuItem value='CNN'>CNN</MenuItem>
                <MenuItem value='S_MOTION_CNN'>S_MOTION_CNN</MenuItem>
                <MenuItem value='S_MOTION_CNN_JPEG'>S_MOTION_CNN_JPEG</MenuItem>
                <MenuItem value='JPEG_REC'>JPEG_REC</MenuItem>
                <MenuItem value='CNN_JPEG'>CNN_JPEG</MenuItem>
                <MenuItem value='CONT_JPEG_CNN'>CONT_JPEG_CNN</MenuItem>
                <MenuItem value='UPDATE_MODEL'>UPDATE_MODEL</MenuItem>
              </TextField>
            </Grid>
            <Grid
              justifyContent="left"
              alignItems="left"
              style={{ marginTop: 20 }}
              hidden={commandValue.Mode!='S_MOTION_CNN_JPEG'||!commandValue.Enable}
              >
              <FormControl component="fieldset" variant="standard">
                <FormLabel component="legend" style={{ color: 'white' }}>Parameter Configuration</FormLabel>
                  <FormControlLabel
                    control={
                      <Switch
                        name='related_params'
                        checked={commandValue.related_params}
                        onChange={handleSwitchChange}
                      />
                    }
                  />
              </FormControl>
            </Grid>
            <Grid
              justifyContent="left"
              alignItems="left"
              style={{ marginTop: 20 }}
              hidden={!commandValue.related_params}
              >
              <FormControl component="fieldset" variant="standard">
                <FormLabel component="legend" style={{ color: 'white' }}>Whether to start recording after a CNN event triggers</FormLabel>
                  <FormControlLabel
                    control={
                      <Switch
                        name='rec_after_event_switch'
                        checked={commandValue.rec_after_event_switch}
                        onChange={handleSwitchChange}
                      />
                    }
                  />
              </FormControl>
            </Grid>
            <Grid hidden={(commandValue.Mode!='JPEG_REC')||(!commandValue.Enable)} style={{ marginTop: 20 }}>
              <Typography id="input-slider" gutterBottom style={{ color: 'white' }}>
                Recording Time (s)
              </Typography>
              <Grid spacing={2} sx={{ width: 400 }} container>
                <Grid item xs={9}>
                  <Slider
                    name='rec_time'
                    value={typeof commandValue.rec_time === 'number' ? commandValue.rec_time : 5}
                    onChange={handleSliderChange}
                    aria-labelledby="input-slider"
                    size='small'
                    min={1}
                    max={60}
                  />
                </Grid>
                <Grid item xs={3}>
                  <MuiInput
                    name='rec_time'
                    value={commandValue.rec_time}
                    size="small"
                    onChange={handleNumberChange}
                    onBlur={handleBlur}
                    disableUnderline
                    inputProps={{
                      step: 1,
                      min: 1,
                      max: 60,
                      type: 'number',
                      'aria-labelledby': 'input-slider',
                      style: { color: 'white' },
                    }}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid hidden={(!commandValue.rec_after_event_switch)&&(commandValue.Mode!='JPEG_REC')||(!commandValue.Enable)} style={{ marginTop: 20 }}>
              <Typography id="input-slider" gutterBottom style={{ color: 'white' }}>
                Recording FPS
              </Typography>
              <Grid spacing={2} sx={{ width: 400 }} container>
                <Grid item xs={9}>
                  <Slider
                    name='rec_fps'
                    value={typeof commandValue.rec_fps === 'number' ? commandValue.rec_fps : 15}
                    onChange={handleSliderChange}
                    aria-labelledby="input-slider"
                    size='small'
                    min={1}
                    max={15}
                  />
                </Grid>
                <Grid item xs={3}>
                  <MuiInput
                    name='rec_fps'
                    value={commandValue.rec_fps}
                    size="small"
                    onChange={handleNumberChange}
                    onBlur={handleBlur}
                    disableUnderline
                    inputProps={{
                      step: 1,
                      min: 1,
                      max: 15,
                      type: 'number',
                      'aria-labelledby': 'input-slider',
                      style: { color: 'white' },
                    }}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid hidden={!commandValue.rec_after_event_switch} style={{ marginTop: 20 }}>
              <Typography id="input-slider" gutterBottom style={{ color: 'white' }}>
                Number of recording loops after a CNN event is triggered
              </Typography>
              <Grid spacing={2} sx={{ width: 400 }} container>
                <Grid item xs={9}>
                  <Slider
                    name='rec_after_event_cycle'
                    value={typeof commandValue.rec_after_event_cycle === 'number' ? commandValue.rec_after_event_cycle : 1}
                    onChange={handleSliderChange}
                    aria-labelledby="input-slider"
                    size='small'
                    min={1}
                    max={15}
                  />
                </Grid>
                <Grid item xs={3}>
                  <MuiInput
                    name='rec_after_event_cycle'
                    value={commandValue.rec_after_event_cycle}
                    size="small"
                    onChange={handleNumberChange}
                    onBlur={handleBlur}
                    disableUnderline
                    inputProps={{
                      step: 1,
                      min: 1,
                      max: 15,
                      type: 'number',
                      'aria-labelledby': 'input-slider',
                      style: { color: 'white' },
                    }}
                  />
                </Grid>
              </Grid>
              <Typography id="input-slider" gutterBottom style={{ color: 'white', marginTop: 20 }}>
                The duration of each loop after the CNN event is triggered
              </Typography>
              <Grid spacing={2} sx={{ width: 400 }} container>
                <Grid item xs={9}>
                  <Slider
                    name='rec_after_event_duration'
                    value={typeof commandValue.rec_after_event_duration === 'number' ? commandValue.rec_after_event_duration : 5}
                    onChange={handleSliderChange}
                    aria-labelledby="input-slider"
                    size='small'
                    min={1}
                    max={60}
                  />
                </Grid>
                <Grid item xs={3}>
                  <MuiInput
                    name='rec_after_event_duration'
                    value={commandValue.rec_after_event_duration}
                    size="small"
                    onChange={handleNumberChange}
                    onBlur={handleBlur}
                    disableUnderline
                    inputProps={{
                      step: 1,
                      min: 1,
                      max: 60,
                      type: 'number',
                      'aria-labelledby': 'input-slider',
                      style: { color: 'white' },
                    }}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid
              justifyContent="left"
              alignItems="left"
              style={{ marginTop: 20 }}
              hidden={(!commandValue.related_params&&commandValue.Mode!='JPEG_REC')||!commandValue.Enable}
              >
              <FormControl component="fieldset" variant="standard">
                <FormLabel component="legend" style={{ color: 'white' }}>Upload All Pictures</FormLabel>
                  <FormControlLabel
                    control={
                      <Switch
                        name='upload_all_pictures_switch'
                        checked={commandValue.upload_all_pictures_switch}
                        onChange={handleSwitchChange}
                      />
                    }
                  />
              </FormControl>
            </Grid>
            <Grid
              justifyContent="left"
              alignItems="left"
              style={{ marginTop: 20 }}
              hidden={(!commandValue.related_params&&commandValue.Mode!='JPEG_REC'&&commandValue.Mode!='CNN_JPEG'&&commandValue.Mode!='CONT_JPEG_CNN')||!commandValue.Enable}
              >
              <FormControl component="fieldset" variant="standard">
                <FormLabel component="legend" style={{ color: 'white' }}>Upload Collected Data to the Cloud</FormLabel>
                  <FormControlLabel
                    control={
                      <Switch
                        name='upload_all_files_switch'
                        checked={commandValue.upload_all_files_switch}
                        onChange={handleSwitchChange}
                      />
                    }
                  />
              </FormControl>
            </Grid>
            <Grid
              justifyContent="left"
              alignItems="left"
              style={{ marginTop: 20 }}
              hidden={commandValue.Mode != 'UPDATE_MODEL'}
            >
              <TextField
                focused
                id="outlined-basic"
                label="Please Select a Model to Deploy"
                name="Model"
                select
                size='small'
                color='info'
                sx={{ width: 300 }}
                InputProps={{
                  style: { color: 'white' }
                }}
                onChange={handleModelChange}
              >
                {modelList.Models.map((c) => {
                  return(
                    <MenuItem value={c.modelName} disabled={!c.available}>{c.modelName}</MenuItem>
                  )
                })}
              </TextField>
            </Grid>
          </DialogTitle>
          <DialogActions style={{ backgroundColor: '#444950' }}>
            <Button variant="contained" size='small' onClick={handleCloseCommand} style={{marginTop: 10}}>Cancel</Button>
            <Button variant="contained" size='small' onClick={onSaveCommand} style={{marginTop: 10}}>Save</Button>
          </DialogActions>
        </Dialog>
      </Box>
  )
}

const mapStateToProps = (state) => {
    //state指的是store裡的數據
    return {
      deviceList: state.deviceList,
      modelList: state.modelList,
      projectImport: state.projectImport
    }
  }

  const mapDispatchToProps = (dispatch) => {
    //dispatch指store.dispatch這個方法
    return {
      addDevice(value) {
        const action = AddDevice(value)
        dispatch(action)
      },
      getDeviceList(id) {
        const action = GetDeviceList(id)
        dispatch(action)
      },
      getModelList(id) {
        const action = GetModelList(id)
        dispatch(action)
      },
      patchDeviceData(id, data) {
        const action = PatchDeviceData(id, data)
        dispatch(action)
      },
      deleteDeviceData(id) {
        const action = DeleteDeviceData(id)
        dispatch(action)
      },
      postDeviceMQTT(data) {
        const action = PostDeviceMQTT(data)
        dispatch(action)
      },
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(DeviceTable)