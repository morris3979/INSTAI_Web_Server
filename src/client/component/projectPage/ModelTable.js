import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { useNavigate } from "react-router-dom";
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
import { Container } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import RepeatIcon from '@mui/icons-material/Repeat';
import ImageSearchIcon from '@mui/icons-material/ImageSearch';
import {
  GetModelList,
  PostAIServerMQTT,
  SetClippedDrawer,
  FilterItem
} from '../../store/actionCreater'

const columns = [
  { id: 'modelName', label: 'Model Name', minWidth: '20vw' },
  { id: 'status', label: 'Status', minWidth: '20vw' },
  { id: 'User.username', label: 'Trained By', minWidth: '17.5vw' },
  { id: 'createdAt', label: 'Trained On', minWidth: '17.5vw' }
]

const ModelTable = (props) => {
  const {
    projectImport,
    modelList,
    getModelList,
    postAIServerMQTT,
    setClippedDrawer,
    filterItem
  } = props

  useEffect(() => {
    getModelList(projectImport)
    const HTTP = ":8080";
    const HTTPS = ":8443";
    const httpSocket = io(HTTP)
    const httpsSocket = io(HTTPS)
    httpSocket.on('connect', () => console.log(httpSocket.id))
    httpSocket.on('connect_error', () => {
      setTimeout(() => httpSocket.connect(), 5000)
    })
    httpSocket.on('AIServer', () => getModelList(projectImport))
    httpSocket.on('disconnect', () => {
      console.log('http socket disconnected ...')
    })
    httpsSocket.on('connect', () => console.log(httpsSocket.id))
    httpsSocket.on('connect_error', () => {
      setTimeout(() => httpsSocket.connect(), 5000)
    })
    httpsSocket.on('AIServer', () => getModelList(projectImport))
    httpsSocket.on('disconnect', () => {
      console.log('https socket disconnected ...')
    })
  },[])

  const navigate = useNavigate()

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

  const filterModelList = modelList.Models?.filter((e) => {
    return e.modelName.includes(searchName)
  })

  const onRetrain = (row) => {
    console.log('row', row)
  }

  const onDataset = (row) => {
    setClippedDrawer('Data')
    filterItem({
      filter: 'annotation',
      modelName: row.modelName,
      dataset: JSON.parse(row.dataset)
    })
    setTimeout(() => {
      navigate('/Project/Data')
    },300)
  }

  const actionBtn = (row) => {
    return (
      <ButtonGroup variant="outlined" aria-label="outlined button group">
        <Button
          variant='outlined'
          aria-label='dataset'
          onClick={() => onDataset(row)}
        >
          <ImageSearchIcon />
        </Button>
        <Button
          variant='outlined'
          aria-label='retrain'
          startIcon={<RepeatIcon />}
          onClick={() => onRetrain(row)}
          sx={{
            "&:disabled": {
              border: 'thin solid grey',
              color: 'grey',
              opacity: .5,
            }
          }}
          disabled={row.available === false}
        >
          retrain
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
            sx={{ marginTop: 4, marginBottom: 2, justifyContent: 'space-between' }}
          >
            <Typography
              noWrap
              variant="h5"
              sx={{ color: 'white', fontWeight: 'bold', marginLeft: 5 }}
            >
              Model
            </Typography>
            <TextField
                focused
                id="outlined-start-adornment"
                label="Search"
                size='small'
                color='info'
                onChange={handleChangeText}
                sx={{ width: 400, marginRight: 5 }}
                placeholder='by model name'
                InputProps={{
                    style: { color: 'white' },
                    endAdornment: <SearchIcon style={{ color: 'white' }} />,
                }}
            />
          </Grid>
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
              <TableContainer sx={{ minHeight: '60vh', minWidth: '90vw', marginTop: 2 }}>
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
                          minWidth: '15vw',
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
                            <TableCell key={'modelName'} align={'20vw'} style={{ color: 'white', fontSize: '12pt' }}>
                              {row.modelName}
                            </TableCell>
                            <TableCell key={'status'} align={'20vw'} style={{ color: 'white', fontSize: '12pt' }}>
                              {row.status}
                            </TableCell>
                            <TableCell key={'User.username'} align={'20vw'} style={{ color: 'white', fontSize: '12pt' }}>
                              {row.User.username}
                            </TableCell>
                            <TableCell key={'createdAt'} align={'20vw'} style={{ color: 'white', fontSize: '12pt' }}>
                              {row.createdAt?.slice(0, -5).replace('T', ' ')}
                            </TableCell>
                          </TableRow>
                        )
                      })
                    : filterModelList
                      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map((row) => {
                        return (
                          <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                            <TableCell key={'action'} style={{ display: 'flex', flexDirection: 'column', alignContent: 'center' }}>
                              {actionBtn(row)}
                            </TableCell>
                            <TableCell key={'modelName'} align={'20vw'} style={{ color: 'white', fontSize: '12pt' }}>
                              {row.modelName}
                            </TableCell>
                            <TableCell key={'status'} align={'20vw'} style={{ color: 'white', fontSize: '12pt' }}>
                              {row.status}
                            </TableCell>
                            <TableCell key={'User.username'} align={'20vw'} style={{ color: 'white', fontSize: '12pt' }}>
                              {row.User.username}
                            </TableCell>
                            <TableCell key={'createdAt'} align={'20vw'} style={{ color: 'white', fontSize: '12pt' }}>
                              {row.createdAt?.slice(0, -5).replace('T', ' ')}
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
      projectImport: state.projectImport,
      modelList: state.modelList,
    }
  }

  const mapDispatchToProps = (dispatch) => {
    //dispatch指store.dispatch這個方法
    return {
      getModelList(id) {
        const action = GetModelList(id)
        dispatch(action)
      },
      postAIServerMQTT(data) {
        const action = PostAIServerMQTT(data)
        dispatch(action)
      },
      setClippedDrawer(text) {
        const action = SetClippedDrawer(text)
        dispatch(action)
      },
      filterItem(text) {
        const action = FilterItem(text)
        dispatch(action)
      }
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(ModelTable)