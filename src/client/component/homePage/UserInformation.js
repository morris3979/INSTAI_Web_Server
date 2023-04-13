import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { GetLoginUser, PatchUserInfo } from '../../store/actionCreater'

const UserInformation = (props) => {
  const {
    userImport,
    userInformation,
    getLoginUser,
    patchUserInfo,
    projectList,
  } = props

  const [ open, setOpen ] = useState(false)
  const [ input, setInput ] = useState({
    username: ''
  })

  useEffect(() => {
    getLoginUser(userImport)
  },[])

  const onCreate = () => {
    patchUserInfo(userInformation.id, input)
    setOpen(false)
  }

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const onChangeUserInfo = (e) => {
    setInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
  }

  return (
    <div style={{ marginTop: 20, marginBottom: 40 }}>
      <div style={{ marginBottom: 20, display: 'flex', justifyContent:'space-between', alignItems: 'center', width: '90vw' }}>
        <div style={{ float: 'left' }}>
          <Typography variant="h5" gutterBottom color={'white'} sx={{ fontWeight: 'bold', marginTop: 2 }}>
            User Information
          </Typography>
          <Typography variant="h6" gutterBottom color={'white'} sx={{ marginTop: 0.5 }}>
            {projectList.organization.toUpperCase()}
          </Typography>
        </div>
      </div>
      <div style={{ marginBottom: 30, display: 'flex', justifyContent:'space-between', alignItems: 'center', width: '90vw' }}>
        <div style={{ float: 'left' }}>
          <Button variant="contained" onClick={handleClickOpen}>Modify User Info</Button>
        </div>
      </div>
      <Dialog open={open} onClose={handleClose}>
        <DialogContent style={{ backgroundColor: '#444950', color: 'white' }}>Modify User Info</DialogContent>
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
            label="Username"
            name='username'
            size='small'
            color='info'
            sx={{ width: 300 }}
            placeholder='User Name'
            defaultValue={`${userInformation.username}`}
            InputProps={{
              style: { color: 'white' }
            }}
            onChange={onChangeUserInfo}
          />
        </Grid>
        </DialogTitle>
        <DialogActions style={{ backgroundColor: '#444950' }}>
          <Button variant="contained" size='small' onClick={handleClose} style={{marginTop: 10}}>Cancel</Button>
          <Button variant="contained" size='small' onClick={onCreate} style={{marginTop: 10}}>OK</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

const mapStateToProps = (state) => {
  //state指的是store裡的數據
  return {
    userImport: state.userImport,
    userInformation: state.userInformation,
    projectList: state.projectList,
  }
}

const mapDispatchToProps = (dispatch) => {
  //dispatch指store.dispatch這個方法
  return {
    getLoginUser(id, text) {
      const action = GetLoginUser(id)
      dispatch(action)
    },
    patchUserInfo(id, data) {
      const action = PatchUserInfo(id, data)
      dispatch(action)
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserInformation)