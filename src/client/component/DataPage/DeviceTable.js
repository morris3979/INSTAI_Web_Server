import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
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
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import { Container } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import {
  AddDevice,
  GetDeviceList,
  PatchDeviceData
} from '../../store/actionCreater'

const columns = [
  { id: 'serialNumber', label: 'SerialNumber', minWidth: '20vw' },
  { id: 'deviceName', label: 'Device Name', minWidth: '20vw' },
  { id: 'command', label: 'Command', minWidth: '20vw' },
  { id: 'message', label: 'Response', minWidth: '20vw' }
]

const DeviceTable = (props) => {
  const {
    deviceList,
    addDevice,
    getDeviceList,
    patchDeviceData
  } = props

  useEffect(() => {
    // console.log('deviceList', deviceList)
    deviceList
    getDeviceList(deviceList.id)
  },[])

  const [ open, setOpen ] = useState(false)
  const [ searchName, setSearchName] = useState('')
  const [ modifyValue, setModifyValue ] = useState({
    id: '',
    text: ''
  })
  const [ openCommand, setOpenCommand ] = useState(false)
  const [ input, setInput ] = useState({
    serialNumber: '',
    deviceName: '',
    ProjectId: deviceList.id
  })
  const [ page, setPage ] = useState(0)
  const [ rowsPerPage, setRowsPerPage ] = useState(5)

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  }

  const onCreate = async () => {
    if(modifyValue.id) {
      if(modifyValue.text == 'serialNumber') {
        patchDeviceData(modifyValue.id, { serialNumber: input.serialNumber })
      }else{
        patchDeviceData(modifyValue.id, { deviceName: input.deviceName })
      }
    }else{
      addDevice(input)
    }
    setOpen(false)
  }

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
  }

  const onChangeDevice = (e) => {
    setInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
  }

  const filterDeviceList = deviceList.Devices.filter((e) => {
    return e.serialNumber.includes(searchName) || e.deviceName.includes(searchName)
  })

  const actionBtn = (
    <ButtonGroup variant="outlined" aria-label="outlined button group">
      <Button aria-label='delete'>
        <DeleteIcon style={{ color: 'white' }} />
      </Button>
      {/* <Button aria-label='edit' onClick={handleClickOpenEdit}>
        <EditIcon style={{ color: 'white' }} />
      </Button> */}
      <Button aria-label='send'>
        <RocketLaunchIcon style={{ color: 'white' }} />
      </Button>
    </ButtonGroup>
  )

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
            sx={{ marginTop: 3, marginBottom: 3, justifyContent: 'space-between' }}
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
                  setModifyValue({ id: '', text: ''})
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
                      },
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
                    {searchName.length == 0
                    ? deviceList.Devices
                      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map((row) => {
                        return (
                          <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                            <TableCell key={'action'} style={{ display: 'flex', flexDirection: 'column', alignContent: 'center' }}>
                              {actionBtn}
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
                                  setModifyValue({ id: row.id, text: 'serialNumber'})
                                  handleClickOpen()
                                }}>
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
                                  setModifyValue({ id: row.id, text: 'deviceName'})
                                  handleClickOpen()
                                }}>
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
                                onClick={handleClickOpenCommand}
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
                              {actionBtn}
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
                                  setModifyValue({ id: row.id, text: 'serialNumber'})
                                  handleClickOpen()
                                }}>
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
                                  setModifyValue({ id: row.id, text: 'deviceName'})
                                  handleClickOpen()
                                }}>
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
                                onClick={handleClickOpenCommand}
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
                count={deviceList.Devices.length}
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
          <DialogContent style={{ backgroundColor: '#444950', color: 'white' }}>Add Device</DialogContent>
          <DialogTitle style={{ backgroundColor: '#444950' }}>
          {modifyValue.text
          ? <Grid
              container
              direction="column"
              justifyContent="center"
              alignItems="center"
            >
            {modifyValue.text == 'serialNumber'
            ? <TextField
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
            : <TextField
                focused
                id="outlined-start-adornment"
                label="Device Name"
                name='deviceName'
                size='small'
                color='info'
                sx={{ width: 300 }}
                placeholder='Collection Device Name'
                InputProps={{
                  style: { color: 'white' }
                }}
                onChange={onChangeDevice}
              />
            }
            </Grid>
          : <Grid
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
            </Grid>}
          </DialogTitle>
          <DialogActions style={{ backgroundColor: '#444950' }}>
            <Button variant="contained" size='small' onClick={handleClose} style={{marginTop: 10}}>Cancel</Button>
            <Button variant="contained" size='small' onClick={onCreate} style={{marginTop: 10}}>ADD</Button>
          </DialogActions>
        </Dialog>
        <Dialog open={openCommand} onClose={handleCloseCommand}>
          <DialogContent style={{ backgroundColor: '#444950', color: 'white' }}>Edit</DialogContent>
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
                label="Command"
                name='command'
                size='small'
                color='info'
                sx={{ width: 300 }}
                placeholder='ex: Upload...'
                InputProps={{
                  style: { color: 'white' }
                }}
                // onChange={onChangeDevice}
              />
            </Grid>
          </DialogTitle>
          <DialogActions style={{ backgroundColor: '#444950' }}>
            <Button variant="contained" size='small' onClick={handleCloseCommand} style={{marginTop: 10}}>Cancel</Button>
            <Button variant="contained" size='small' onClick={onCreate} style={{marginTop: 10}}>Save</Button>
          </DialogActions>
        </Dialog>
      </Box>
  )
}

const mapStateToProps = (state) => {
    //state指的是store裡的數據
    return {
      deviceList: state.deviceList
    }
  }

  const mapDispatchToProps = (dispatch) => {
    //dispatch指store.dispatch這個方法
    return {
      addDevice(value) {
        const action = AddDevice(value)
        dispatch(action)
      },
      getDeviceList(id, text) {
        const action = GetDeviceList(id)
        dispatch(action)
      },
      patchDeviceData(id, data) {
        const action = PatchDeviceData(id, data)
        dispatch(action)
      }
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(DeviceTable)