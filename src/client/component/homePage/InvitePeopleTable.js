import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
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
import Switch from '@mui/material/Switch';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import EditIcon from '@mui/icons-material/Edit';
import { Container } from '@mui/material';
import { GetProjectList, GetOrganizationMembers, InviteMember, ModifyMemberAdmin } from '../../store/actionCreater'

const columns = [
    { id: 'username', label: 'Username', minWidth: '15vw' },
    { id: 'email', label: 'Email', minWidth: '20vw' },
    { id: 'authorize', label: 'Authorize', minWidth: '15vw' },
    { id: 'status', label: 'Status', minWidth: '15vw' }
]

const InvitePeopleTable = (props) => {
  const {
    userInformation,
    projectList,
    getProjectList,
    getOrganizationMembers,
    membersList,
    inviteMember,
    organizationImport,
    modifyMemberAdmin
  } = props

  const [ open, setOpen ] = useState(false)
  const [ authorizeOpen, setAuthorizeOpen ] = useState(false)
  const [ memberAuthorize, setMemberAuthorize ] = useState({
    id: '',
    authorize: false
  })
  const [ searchName, setSearchName] = useState('')
  const [ input, setInput ] = useState({
    email: '',
    organizationId: organizationImport
  })
  const [ page, setPage ] = useState(0);
  const [ rowsPerPage, setRowsPerPage ] = useState(10);

  useEffect(() => {
    projectList
    getProjectList(organizationImport)
    getOrganizationMembers(organizationImport)
  },[input])

  const onCreate = () => {
    inviteMember(input)
    setOpen(false)
  }

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
    setAuthorizeOpen(false)
    setMemberAuthorize({
      id: '',
      authorize: false
    })
  }

  const onChangeMember = (e) => {
    setInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
  }

  const handleChangeText = (e) => {
    setSearchName(e.target.value)
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  }

  const OpenAuthorizeDialog = (id) => {
    setAuthorizeOpen(true)
    setMemberAuthorize((prevState) => ({
      ...prevState,
      id: id
    }))
  }

  const PatchAuthorize = () => {
    const converted = memberAuthorize.authorize?{authorize: 'admin'}:{authorize: 'user'}
    modifyMemberAdmin(memberAuthorize.id, converted)
    setAuthorizeOpen(false)
    setMemberAuthorize({
      id: '',
      authorize: false
    })
  }

  const handleSwitchChange = (e) => {
    setMemberAuthorize((prevState) => ({
      ...prevState,
      authorize: e.target.checked
    }))
  }

  const filterMemberList = membersList.Users.filter((e) => {
    return e.username.includes(searchName) || e.email.includes(searchName)
  })

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
            onChange={handleChangeText}
            sx={{ width: 400 }}
            placeholder='by username or email'
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
                  {(membersList.Users.find(data => data.id == userInformation.id)) != undefined
                  ? <Grid hidden={(membersList.Users.find(data => data.id == userInformation.id)).UserGroup.authorize != 'admin'}>
                      <TableCell
                        style={{
                          minWidth: '15vw',
                          fontSize: '16pt'
                        }}
                      >
                      Action
                    </TableCell>
                  </Grid>
                  :null
                  }
                </TableRow>
              </TableHead>
              <TableBody>
                {searchName.length == 0
                ? membersList.Users
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
                          )
                        })}
                        {(membersList.Users.find(data => data.id == userInformation.id)) != undefined
                        ? <Grid hidden={(membersList.Users.find(data => data.id == userInformation.id)).UserGroup.authorize != 'admin'}>
                            <TableCell
                              style={{
                                minWidth: '15vw',
                                fontSize: '12pt'
                              }}
                            >
                              <IconButton
                                size='small'
                                color="primary"
                                component="label"
                                style={{ marginLeft: 15 }}
                                disabled={row.UserGroup.authorize == 'admin'}
                                onClick={() => OpenAuthorizeDialog(row.UserGroup.id)}
                              >
                                <EditIcon />
                              </IconButton>
                            </TableCell>
                          </Grid>
                          :null
                        }
                      </TableRow>
                    )
                  })
                : filterMemberList
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
                          )
                        })}
                        {(membersList.Users.find(data => data.id == userInformation.id)) != undefined
                        ? <Grid hidden={(membersList.Users.find(data => data.id == userInformation.id)).UserGroup.authorize != 'admin'}>
                            <TableCell
                              style={{
                                minWidth: '15vw',
                                fontSize: '12pt'
                              }}
                            >
                              <IconButton
                                size='small'
                                color="primary"
                                component="label"
                                style={{ marginLeft: 15 }}
                                disabled={row.UserGroup.authorize == 'admin'}
                                onClick={() => OpenAuthorizeDialog(row.UserGroup.id)}
                              >
                                <EditIcon />
                              </IconButton>
                            </TableCell>
                          </Grid>
                          :null
                        }
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
      <Dialog open={authorizeOpen} onClose={handleClose}>
        <DialogContent style={{ backgroundColor: '#444950', color: 'white' }}>Members Authorize</DialogContent>
        <DialogTitle style={{ backgroundColor: '#444950' }}>
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="left"
          sx={{ width: 300 }}
        >
          <FormControl component="fieldset" variant="standard">
            <FormLabel component="legend" style={{ color: 'white' }}>Authorize Admin</FormLabel>
              <FormControlLabel
                control={
                  <Switch
                  name='memberAuthorize'
                  checked={memberAuthorize.authorize}
                  onChange={handleSwitchChange} />
                }
              />
          </FormControl>
        </Grid>
        </DialogTitle>
        <DialogActions style={{ backgroundColor: '#444950' }}>
          <Button variant="contained" size='small' onClick={handleClose} style={{marginTop: 10}}>Cancel</Button>
          <Button variant="contained" size='small' onClick={PatchAuthorize} style={{marginTop: 10}}>OK</Button>
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
    membersList: state.membersList,
    organizationImport: state.organizationImport
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
    modifyMemberAdmin(id, data) {
      const action = ModifyMemberAdmin(id, data)
      dispatch(action)
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(InvitePeopleTable)