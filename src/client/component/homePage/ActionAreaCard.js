import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import PublicIcon from '@mui/icons-material/Public';
import LockIcon from '@mui/icons-material/Lock';
import { CardActionArea } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { GetProjectList, CreateProject, GetDataList } from '../../store/actionCreater'

const ActionAreaCard = (props) => {
  const { userInformation, projectList, getProjectList, createProject, getDataList } = props

  const [ open, setOpen ] = useState(false)
  const [ input, setInput ] = useState({
    project: '',
    type: 'Object Detection',
    OrganizationId: projectList.id,
    UserId: userInformation.id
  })

  const navigate = useNavigate();

  useEffect(() => {
    projectList
    getProjectList(projectList.id)
  },[input])

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

  const onChangeProject = (e) => {
    setInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
  }

  return (
    <div style={{ marginTop: 20, marginBottom: 40 }}>
      <div style={{ marginBottom: 10, display: 'flex', justifyContent:'space-between', alignItems: 'center', width: '90vw' }}>
        <div style={{ float: 'left' }}>
          <Typography variant="h5" gutterBottom color={'white'} sx={{fontFamily: 'monospace', fontWeight: 'bold'}}>
            {`Welcome, ${userInformation.username}`}
          </Typography>
        </div>
        <div style={{ float: 'right' }}>
          <Button variant="contained" onClick={handleClickOpen}>Create Project</Button>
        </div>
      </div>
      <div style={{ marginBottom: 5, display: 'flex', justifyContent:'right', width: '90vw' }}>
        <TextField
          focused
          id="outlined-start-adornment"
          label="Search"
          size='small'
          color='info'
          sx={{ width: 400 }}
          placeholder='Project name, Project type, Creator...'
          InputProps={{
            style: { color: 'white' },
            endAdornment: <SearchIcon style={{ color: 'white' }} />,
          }}
        />
      </div>
      <div style={{ marginBottom: 10, display: 'flex', justifyContent:'left', alignItems: 'center', width: '90vw' }}>
        <div style={{ float: 'left' }}>
          <Typography variant="h6" gutterBottom color={'white'} sx={{fontWeight: 'bold'}}>
            All Projects
          </Typography>
        </div>
      </div>
      {projectList.Projects.length === 0
      ? <Card sx={{ maxWidth: 430, backgroundColor: 'lightblue' }}>
          <CardActionArea>
            <CardContent>
              <div style={{ display: 'flex' }}>
                <Box style={{ backgroundColor: 'grey' }} borderRadius={2}>
                  <Typography variant="body2" textAlign={'center'} style={{ marginLeft: 10, marginRight: 10, color: 'lightblue' }}>
                    Object Detection
                  </Typography>
                </Box>
              </div>
              <Typography gutterBottom variant="h5" component="div">
                Sample Project
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Created by {userInformation.username}
              </Typography>
              <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
                style={{ marginTop: 60, justifyContent: 'space-between' }}
              >
                <Typography variant="body2" color="text.secondary">
                  Last opened Jan 01, 2023
                </Typography>
                <PublicIcon />
              </Grid>
            </CardContent>
          </CardActionArea>
        </Card>
      : <Box sx={{ flexGrow: 1 }}>
          <Grid container maxWidth='90vw' spacing={{ xs: 2, md: 4 }} columns={{ xs: 4, sm: 6, md: 16 }}>
            {projectList.Projects.map((value, key) => {
              return(
                <Grid item xs={2} sm={6} md={4} key={key}>
                  <Card sx={{ maxWidth: 430, backgroundColor: 'lightblue' }}>
                    <CardActionArea
                      key={key}
                      onClick={() => {
                        getDataList(value.id)
                        navigate('/Data')
                      }}
                    >
                      <CardContent>
                        <div style={{ display: 'flex' }}>
                          <Box style={{ backgroundColor: 'grey' }} borderRadius={2}>
                            <Typography variant="body2" textAlign={'center'} style={{ marginLeft: 10, marginRight: 10, color: 'lightblue' }}>
                              {value.type}
                            </Typography>
                          </Box>
                        </div>
                        <Typography gutterBottom variant="h5" component="div">
                          {value.project}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Created by {value.User.username}
                        </Typography>
                        <Grid
                          container
                          direction="row"
                          justifyContent="center"
                          alignItems="center"
                          style={{ marginTop: 60, justifyContent: 'space-between' }}
                        >
                          <Typography variant="body2" color="text.secondary">
                            Last updated {value.updatedAt.slice(0, -5).replace('T', ' ')}
                          </Typography>
                          {value.accessAuth ? <PublicIcon style={{ color: 'grey' }} /> : <LockIcon style={{ color: 'grey' }} />}
                        </Grid>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Grid>
              )})}
          </Grid>
        </Box>
      }
      <Dialog open={open} onClose={handleClose}>
        <DialogContent style={{ backgroundColor: '#444950', color: 'white' }}>New Project</DialogContent>
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
            placeholder='Project Name'
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
            defaultValue='Object Detection'
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
          <Button variant="contained" size='small' onClick={onCreate} style={{marginTop: 10}}>Create</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

const mapStateToProps = (state) => {
  //state指的是store裡的數據
  return {
    userInformation: state.userInformation,
    projectList: state.projectList
  }
}

const mapDispatchToProps = (dispatch) => {
  //dispatch指store.dispatch這個方法
  return {
    getProjectList(id, text) {
      const action = GetProjectList(id)
      dispatch(action)
    },
    createProject(value) {
      const action = CreateProject(value)
      dispatch(action)
    },
    getDataList(id, text) {
      const action = GetDataList(id)
      dispatch(action)
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ActionAreaCard)