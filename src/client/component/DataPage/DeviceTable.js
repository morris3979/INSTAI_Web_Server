import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
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

const columns = [
  { id: 'action', label: 'Action', minWidth: '14vw' },
  { id: 'serialNumber', label: 'SerialNumber', minWidth: '18vw' },
  { id: 'deviceName', label: 'Device Name', minWidth: '18vw' },
  { id: 'command', label: 'Command', minWidth: '20vw' },
  { id: 'message', label: 'Message', minWidth: '20vw' }
]

function createData(action, serialNumber, deviceName, command, message) {
  return { action, serialNumber, deviceName, command, message };
}

const rows = [
  createData('', '0x000000001', 'A', 'TEST', 'response'),
  createData('', '0x000000002', 'B', 'TEST', 'response'),
  createData('', '0x000000003', 'C', 'TEST', 'response'),
  createData('', '0x000000004', 'D', 'TEST', 'response'),
  createData('', '0x000000005', 'E', 'TEST', 'response'),
  createData('', '0x000000006', 'F', 'TEST', 'response'),
  createData('', '0x000000007', 'G', 'TEST', 'response'),
  createData('', '0x000000008', 'H', 'TEST', 'response'),
  createData('', '0x000000009', 'I', 'TEST', 'response'),
]

const DeviceTable = (props) => {
  const {
    dataList,
  } = props

  useEffect(() => {
    // console.log('dataList', dataList)
    dataList
  },[])

  const [ open, setOpen ] = useState(false)
  const [ input, setInput ] = useState({
    serialNumber: '',
    deviceName: '',
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
    createProject(input)
    setOpen(false)
  }

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const onChangeDevice = (e) => {
    setInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
  }

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
              Setting
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
                onClick={handleClickOpen}
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
                    sx={{ width: 400 }}
                    placeholder='SerialNumber, Device Name...'
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
                        {rows
                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map((row) => {
                            return (
                            <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                {columns.map((column) => {
                                const value = row[column.id];
                                return (
                                    <TableCell key={column.id} align={column.align} style={{ color: 'white', fontSize: '12pt' }}>
                                    {column.format && typeof value === 'number'
                                        ? column.format(value)
                                        : value}
                                    </TableCell>
                                )})}
                            </TableRow>
                            )
                        })}
                    </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 20, 50]}
                    component="div"
                    count={rows.length}
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
            <Button variant="contained" size='small' onClick={handleClose} style={{marginTop: 10}}>ADD</Button>
          </DialogActions>
        </Dialog>
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
    return {}
  }

export default connect(mapStateToProps, mapDispatchToProps)(DeviceTable)