import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import FilterCenterFocusIcon from '@mui/icons-material/FilterCenterFocus';
import EditIcon from '@mui/icons-material/Edit';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import { LogoutData, GetProjectList, PatchProjectData } from '../../store/actionCreater'

const ProjectAppBar = (props) => {
  const {
    projectList,
    dataList,
    patchProjectData
  } = props

  const [ open, setOpen ] = useState(false)
  const [ input, setInput ] = useState({
    project: '',
    type: 'Object Detection',
    OrganizationId: projectList.id,
  })

  useEffect(() => {
    dataList
    projectList
    // console.log('dataList', dataList)
    // console.log('projectList', projectList)
  },[])

  const onSave = async () => {
    const converted = {}
    converted.project = input.project
    converted.type = input.type
    if(input.project&&input.type) {
      patchProjectData(dataList.id,converted)
      setInput({
        project: '',
        type: 'Object Detection',
        OrganizationId: projectList.id,
      })
      setOpen(false)
    }else{
      alert('Empty Value ! Please Check Again')
    }
  }

  const handleClickOpen = () => {
    setInput((prevState) => ({
      ...prevState,
      project: dataList.project,
      type: dataList.type
    }))
    setOpen(true)
  }

  const handleClose = () => {
    setInput({
      project: '',
      type: 'Object Detection',
      OrganizationId: projectList.id,
    })
    setOpen(false)
  }

  const onChangeProject = (e) => {
    setInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
  }

  return (
    <AppBar position="fixed" elevation={0}
      style={{ backgroundColor: '#1c2127', height: '7vh', marginTop: '6vh' }}
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
    >
      <Container maxWidth="100vh">
        <Toolbar disableGutters>
          <Grid container justifyContent='flex-start'>
            <Typography>
              <FilterCenterFocusIcon style={{ color: 'white', marginLeft: 9, marginTop: 8 }} />
            </Typography>
            <Typography
              noWrap
              variant="h6"
              sx={{
                mr: 2,
                fontWeight: 'bold',
                color: 'inherit',
                marginLeft: 4,
                marginTop: 0.5
              }}
            >
              {dataList.project}
            </Typography>
            <IconButton color="primary" aria-label="edit project" component="label" onClick={handleClickOpen}>
              <EditIcon />
            </IconButton>
          </Grid>
        </Toolbar>
      </Container>
      <Dialog open={open} onClose={handleClose}>
        <DialogContent style={{ backgroundColor: '#444950', color: 'white' }}>Edit Project</DialogContent>
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
            label="Project"
            name='project'
            size='small'
            color='info'
            sx={{ width: 300 }}
            defaultValue={dataList.project}
            InputProps={{
              style: { color: 'white' }
            }}
            onChange={onChangeProject}
          />
          <TextField
            focused
            id="outlined-start-adornment"
            label="Type"
            name='type'
            size='small'
            color='info'
            sx={{ width: 300 }}
            defaultValue={dataList.type}
            InputProps={{
              style: { color: 'white' }
            }}
            style={{ marginTop: 20 }}
            onChange={onChangeProject}
          />
        </Grid>
        </DialogTitle>
        <DialogActions style={{ backgroundColor: '#444950' }}>
          <Button variant="contained" size='small' onClick={handleClose} style={{marginTop: 10}}>Cancel</Button>
          <Button variant="contained" size='small' onClick={onSave} style={{marginTop: 10}}>Save</Button>
        </DialogActions>
      </Dialog>
    </AppBar>
  );
}

const mapStateToProps = (state) => {
  //state指的是store裡的數據
  return {
    userInformation: state.userInformation,
    projectList: state.projectList,
    dataList: state.dataList
  }
}

const mapDispatchToProps = (dispatch) => {
  //dispatch指store.dispatch這個方法
  return {
    onClick() {
      const action = LogoutData()
      dispatch(action)
    },
    getProjectList(id, text) {
      const action = GetProjectList(id)
      dispatch(action)
    },
    patchProjectData(id, data) {
      const action = PatchProjectData(id, data)
      dispatch(action)
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectAppBar)