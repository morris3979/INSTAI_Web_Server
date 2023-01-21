import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Container } from '@mui/material';
import { GetProjectList, GetOrganizationMembers, InviteMember } from '../../store/actionCreater'

const columns = [
    { id: 'username', label: 'User Name', minWidth: '15vw' },
    { id: 'email', label: 'Email', minWidth: '20vw' },
    { id: 'authorize', label: 'Authorize', minWidth: '15vw' },
    { id: 'status', label: 'Status', minWidth: '15vw' }
]

const InvitePeopleTable = (props) => {
  const {
    projectList,
    getProjectList,
    getOrganizationMembers,
    membersList,
    inviteMember
} = props

  const [ open, setOpen ] = useState(false)
  const [ input, setInput ] = useState({
    email: '',
    organizationId: projectList.id
  })
  const [ page, setPage ] = useState(0);
  const [ rowsPerPage, setRowsPerPage ] = useState(10);

  useEffect(() => {
    projectList
    getProjectList(projectList.id)
    getOrganizationMembers(projectList.id)
  },[input])

  const onCreate = async () => {
    inviteMember(input)
    setOpen(false)
  }

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const onChangeMember = (e) => {
    setInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  }

  return (
    <div style={{ marginTop: 20, marginBottom: 40 }}>
      <div style={{ marginBottom: 20, display: 'flex', justifyContent:'space-between', alignItems: 'center', width: '90vw' }}>
        <div style={{ float: 'left' }}>
          <Typography variant="h5" gutterBottom color={'white'} sx={{ fontWeight: 'bold', marginTop: 2 }}>
            Organization Management
          </Typography>
          <Typography variant="h6" gutterBottom color={'white'} sx={{ marginTop: 0.5 }}>
            {projectList.organization.toUpperCase()}
          </Typography>
        </div>
      </div>
      <div style={{ marginBottom: 30, display: 'flex', justifyContent:'space-between', alignItems: 'center', width: '90vw' }}>
        <div style={{ float: 'left' }}>
            <Button variant="contained" onClick={handleClickOpen}>Invite Members</Button>
        </div>
        <div style={{ float:'right' }}>
            <TextField
                focused
                id="outlined-start-adornment"
                label="Search"
                size='small'
                color='info'
                sx={{ width: 400 }}
                placeholder='Member Name, Email...'
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
                justifyContent: 'center',
            }}
        >
            <TableContainer sx={{ minHeight: '50vh', minWidth: '90vw' }}>
                <Table stickyHeader aria-label="sticky table">
                <TableHead
                    sx={{
                        [`& .MuiTableCell-head`]: {
                            backgroundColor: '#0A1929',
                            color: 'white',
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
                    {membersList.Users
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
                      return (
                        <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                            {columns.map((column) => {
                            const value = row[column.id] || row.UserGroup[column.id]
                            return (
                                <TableCell key={column.id} align={column.align} style={{ color: 'white', fontSize: '12pt' }}>
                                {column.format && typeof value === 'number'
                                    ? column.format(value)
                                    : value}
                                </TableCell>
                            );
                            })}
                        </TableRow>
                        );
                    })}
                </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 20, 50]}
                component="div"
                count={membersList.Users.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                style={{ color: 'white', fontSize: '12pt', backgroundColor: '#0A1929', minWidth: '90vw' }}
            />
        </Container>
      </div>
      <Dialog open={open} onClose={handleClose}>
        <DialogContent style={{ backgroundColor: '#444950', color: 'white' }}>Invite Members</DialogContent>
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
            label="Email"
            name='email'
            size='small'
            color='info'
            sx={{ width: 300 }}
            placeholder='Personal Email'
            InputProps={{
              style: { color: 'white' }
            }}
            onChange={onChangeMember}
          />
        </Grid>
        </DialogTitle>
        <DialogActions style={{ backgroundColor: '#444950' }}>
          <Button variant="contained" size='small' onClick={handleClose} style={{marginTop: 10}}>Cancel</Button>
          <Button variant="contained" size='small' onClick={onCreate} style={{marginTop: 10}}>INVITE</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

const mapStateToProps = (state) => {
  //state指的是store裡的數據
  return {
    userInformation: state.userInformation,
    projectList: state.projectList,
    membersList: state.membersList
  }
}

const mapDispatchToProps = (dispatch) => {
  //dispatch指store.dispatch這個方法
  return {
    getProjectList(id) {
      const action = GetProjectList(id)
      dispatch(action)
    },
    getOrganizationMembers(id) {
      const action = GetOrganizationMembers(id)
      dispatch(action)
    },
    inviteMember(data, id) {
      const action = InviteMember(data, id)
      dispatch(action)
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(InvitePeopleTable)