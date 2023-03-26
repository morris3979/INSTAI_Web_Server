import React, { useState, useEffect, useRef } from 'react'
import { connect } from 'react-redux'
import { useNavigate } from "react-router-dom";
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
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import CheckIcon from '@mui/icons-material/Check';
import HMobiledataIcon from '@mui/icons-material/HMobiledata';
import {
  LogoutData,
  GetProjectList,
  PatchProjectItem,
  GetProjectItem,
  GetDataList,
  GetLabelList,
  SetClippedDrawer,
  FilterItem
} from '../../store/actionCreater'

const steps = ['Data collection', 'Data Sampling', 'Annotation', 'Model Training']

const ProjectAppBar = (props) => {
  const {
    projectList,
    projectItem,
    patchProjectItem,
    getProjectItem,
    dataList,
    projectImport,
    getDataList,
    labelList,
    organizationImport,
    getLabelList,
  } = props

  const [ openEditProject, setOpenEditProject ] = useState(false)
  const [ input, setInput ] = useState({
    project: '',
    type: 'Object Detection',
    OrganizationId: organizationImport,
  })
  const [ activeStep, setActiveStep ] = useState(0)
  const [ skipped, setSkipped ] = useState(new Set())

  const mounted = useRef()

  useEffect(() => {
    if(mounted.current === false) {
      mounted.current = true
    } else {
      projectItem
      dataList
      labelList
      projectItem
      projectList
      getLabelList(projectImport)
      getProjectItem(projectImport)
      getDataList(projectImport)
      getProjectItem(projectImport)
      // console.log('clean', dataList.Data?.map((e) => e.sampling).indexOf(true))
      if (dataList.Data?.length) {
        const step1 = (skipped.size == 0) &&
                      (dataList.Data?.map((e) => e.sampling).indexOf(true) == -1) &&
                      (dataList.Data?.map((e) => e.annotation !== null).indexOf(true) == -1)
        const step2 = (skipped.size == 0) &&
                      (dataList.Data?.map((e) => e.sampling).indexOf(true) != -1) &&
                      (dataList.Data?.map((e) => e.annotation !== null).indexOf(true) == -1)
        const step2_skip = (skipped.size == 0) &&
                      (dataList.Data?.map((e) => e.sampling).indexOf(true) == -1) &&
                      (dataList.Data?.map((e) => e.annotation !== null).indexOf(true) != -1)
        if (step1) {
          setActiveStep(1)
        } else {
          if (step2) {
            setActiveStep(2)
          } else if (step2_skip) {
            setActiveStep(3)
            setSkipped((prevSkipped) => {
              const newSkipped = new Set(prevSkipped.values())
              newSkipped.add(1)
              return newSkipped
            })
          } else {
            setActiveStep(3)
          }
        }
      } else {
        setActiveStep(0)
      }
    }
  }, [activeStep, steps])

  const onSaveEditProject = async () => {
    const converted = {}
    converted.project = input.project
    converted.type = input.type
    if(input.project && input.type) {
      patchProjectItem(projectItem.id, converted)
      setInput({
        project: '',
        type: 'Object Detection',
        OrganizationId: organizationImport,
      })
      setOpenEditProject(false)
    }else{
      alert('Empty Value! Please Check Again')
    }
  }

  const handleClickOpenEditProject = () => {
    setInput((prevState) => ({
      ...prevState,
      project: projectItem.project,
      type: projectItem.type
    }))
    setOpenEditProject(true)
  }

  const handleCloseEditProject = () => {
    setInput({
      project: '',
      type: 'Object Detection',
      OrganizationId: organizationImport,
    })
    setOpenEditProject(false)
  }

  const onChangeProject = (e) => {
    setInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
  }

  const isStepOptional = (step) => {
    return step === 1
  }

  const isStepSkipped = (step) => {
    return skipped.has(step)
  }

  return (
    <AppBar
      position="fixed"
      elevation={0}
      style={{ backgroundColor: '#1c2127', height: 60, marginTop: 60 }}
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
    >
      <Container maxWidth="100vh">
        <Toolbar disableGutters>
            <Grid container justifyContent='flex-start'>
              <Grid
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
                width={55}
              >
                <FilterCenterFocusIcon style={{ color: 'white', marginTop: 8 }} />
              </Grid>
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
                {projectItem.project}
              </Typography>
              <IconButton
                color="primary"
                aria-label="edit project"
                component="label"
                onClick={handleClickOpenEditProject}
              >
                <EditIcon />
              </IconButton>
            </Grid>
            <Grid
              container
              direction="row"
              alignItems="center"
              justifyContent="flex-end"
            >
              <Stepper activeStep={activeStep}>
                {steps.map((label, index) => {
                  const stepProps = {};
                  const labelProps = {};
                  if (isStepOptional(index)) {
                    labelProps.optional = (
                      <Typography variant="caption" sx={{ color: 'grey' }}>Ignorable</Typography>
                    )
                  }
                  if (isStepSkipped(index)) {
                    stepProps.completed = false;
                  }
                  return (
                    <Step
                      key={label}
                      {...stepProps}
                      sx={{
                          '& .MuiStepLabel-root .Mui-completed': {
                            color: 'green', // circle color (COMPLETED)
                          },
                          '& .MuiStepLabel-label .Mui-completed .MuiStepLabel-alternativeLabel': {
                            color: 'darkgrey', // Just text label (COMPLETED)
                          },
                          '& .MuiStepLabel-root .Mui-active': {
                            color: 'darkgrey', // circle color (ACTIVE)
                          },
                          '& .MuiStepLabel-root .Mui-active .MuiStepIcon-text': {
                            fill: 'darkgrey',// circle's number (ACTIVE)
                          },
                          '& .MuiStepLabel-label': {
                            color: 'darkgrey', // Just text label (SKIP)
                          },
                          '& .MuiStepIcon-root .Mui-disabled': {
                            color: 'red'
                          },
                          '& .MuiStepLabel-root .Mui-disabled': {
                            color: 'red',
                          },
                      }}
                    >
                      <StepLabel
                        {...labelProps}
                        icon={
                          activeStep == index
                          ?<AutorenewIcon color='Cyan'/>
                          :activeStep < index
                          ?<HMobiledataIcon color='red'/>
                          :<CheckIcon color='green'/>
                        }
                      >
                        {label}
                      </StepLabel>
                    </Step>
                  )
                })}
              </Stepper>
            </Grid>
        </Toolbar>
      </Container>
      <Dialog open={openEditProject} onClose={handleCloseEditProject}>
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
            defaultValue={projectItem.project}
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
            defaultValue={projectItem.type}
            InputProps={{
              style: { color: 'white' }
            }}
            style={{ marginTop: 20 }}
            onChange={onChangeProject}
          />
        </Grid>
        </DialogTitle>
        <DialogActions style={{ backgroundColor: '#444950' }}>
          <Button variant="contained" size='small' onClick={handleCloseEditProject} style={{marginTop: 10}}>Cancel</Button>
          <Button variant="contained" size='small' onClick={onSaveEditProject} style={{marginTop: 10}}>Save</Button>
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
    projectItem: state.projectItem,
    dataList: state.dataList,
    labelList: state.labelList,
    projectImport: state.projectImport,
    organizationImport: state.organizationImport,
  }
}

const mapDispatchToProps = (dispatch) => {
  //dispatch指store.dispatch這個方法
  return {
    onClick() {
      const action = LogoutData()
      dispatch(action)
    },
    getProjectList(id) {
      const action = GetProjectList(id)
      dispatch(action)
    },
    patchProjectItem(id, data) {
      const action = PatchProjectItem(id, data)
      dispatch(action)
    },
    getProjectItem(id) {
      const action = GetProjectItem(id)
      dispatch(action)
    },
    getDataList(id) {
      const action = GetDataList(id)
      dispatch(action)
    },
    getLabelList(id) {
      const action = GetLabelList(id)
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

export default connect(mapStateToProps, mapDispatchToProps)(ProjectAppBar)