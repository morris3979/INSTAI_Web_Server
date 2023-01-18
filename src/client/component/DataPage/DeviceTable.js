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
import { Container } from '@mui/material';

const columns = [
  { id: 'action', label: 'Action', minWidth: '12vw' },
  { id: 'serialNumber', label: 'Serial Number', minWidth: '20vw' },
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

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
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
            sx={{ marginTop: 5, justifyContent: 'space-between' }}
          >
            <Typography
              noWrap
              variant="h5"
              sx={{ color: 'white', fontWeight: 'bold', marginLeft: 5 }}
            >
              Setting
            </Typography>
            <Button variant="contained" sx={{ marginRight: 5 }}>ADD DEVICE</Button>
          </Grid>
          {/* <Grid container minWidth='90vw' sx={{ marginTop: 2 }}> */}
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
                                    fontSize: '16pt'
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
                                    <TableCell key={column.id} align={column.align} style={{ color: 'white', fontSize: '14pt' }}>
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
          {/* </Grid> */}
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
    return {}
  }

export default connect(mapStateToProps, mapDispatchToProps)(DeviceTable)