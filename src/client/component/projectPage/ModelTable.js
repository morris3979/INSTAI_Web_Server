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
import RepeatIcon from '@mui/icons-material/Repeat';
import {
  AddDevice,
  GetDeviceList,
  PatchDeviceData,
  PostDeviceMQTT
} from '../../store/actionCreater'

const columns = [
  { id: 'modelName', label: 'Model Name', minWidth: '20vw' },
  { id: 'status', label: 'Status', minWidth: '20vw' },
  { id: 'user', label: 'Trained By', minWidth: '20vw' },
  { id: 'create_at', label: 'Trained On', minWidth: '20vw' }
]

const ModelTable = (props) => {
  const {
    deviceList,
    getDeviceList,
    projectImport,
    modelList
  } = props

  useEffect(() => {
    // console.log('deviceList', deviceList)
    getDeviceList(projectImport)
  },[])

  const [ searchName, setSearchName] = useState('')
  const [ page, setPage ] = useState(0)
  const [ rowsPerPage, setRowsPerPage ] = useState(5)

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  }

  const handleChangeText = (e) => {
    setSearchName(e.target.value)
  }

  const filterDeviceList = modelList.Models?.filter((e) => {
    return e.serialNumber.includes(searchName) || e.deviceName.includes(searchName)
  })

  const actionBtn = (row) => {
    return (
        <Button
          aria-label='send'
          startIcon={<RepeatIcon />}
        >
          retrain
        </Button>
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
              Model
            </Typography>
          </Grid>
          <div
            style={{
              display: 'flex',
              justifyContent:'flex-end',
              alignItems: 'center',
              width: '90vw',
              marginLeft: 35
            }}
          >
            <TextField
                focused
                id="outlined-start-adornment"
                label="Search"
                size='small'
                color='info'
                onChange={handleChangeText}
                sx={{ width: 400 }}
                placeholder='by model name or user'
                InputProps={{
                    style: { color: 'white' },
                    endAdornment: <SearchIcon style={{ color: 'white' }} />,
                }}
            />
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
                    {searchName.length == 0?
                      modelList.Models
                      ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map((row) => {
                        return (
                          <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                            <TableCell key={'action'} style={{ display: 'flex', flexDirection: 'column', alignContent: 'center' }}>
                              {actionBtn(row)}
                            </TableCell>
                            <TableCell key={'serialNumber'} align={'20vw'} style={{ color: 'white', fontSize: '12pt' }}>
                              {row.serialNumber}
                            </TableCell>
                            <TableCell key={'deviceName'} align={'20vw'} style={{ color: 'white', fontSize: '12pt' }}>
                              {row.deviceName}
                            </TableCell>
                            <TableCell key={'command'} align={'20vw'} style={{ color: 'white', fontSize: '12pt' }}>
                              {row.command}
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
                            </TableCell>
                            <TableCell key={'deviceName'} align={'20vw'} style={{ color: 'white', fontSize: '12pt' }}>
                              {row.deviceName}
                            </TableCell>
                            <TableCell key={'command'} align={'20vw'} style={{ color: 'white', fontSize: '12pt' }}>
                              {row.command}
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
                count={modelList.Models?.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                style={{ fontSize: '12pt', backgroundColor: 'lightblue', minWidth: '90vw' }}
              />
            </Container>
          </div>
        </div>
      </Box>
  )
}

const mapStateToProps = (state) => {
    //state指的是store裡的數據
    return {
      deviceList: state.deviceList,
      projectImport: state.projectImport,
      modelList: state.modelList,
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
      patchDeviceData(id, data) {
        const action = PatchDeviceData(id, data)
        dispatch(action)
      },
      postDeviceMQTT(data) {
        const action = PostDeviceMQTT(data)
        dispatch(action)
      }
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(ModelTable)