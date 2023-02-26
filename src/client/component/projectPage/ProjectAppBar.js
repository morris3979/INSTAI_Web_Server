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
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import {
  LogoutData,
  GetProjectList,
  PatchProjectItem,
  GetProjectItem
} from '../../store/actionCreater'

const steps = ['Data collection', 'Clean data', 'Annotation', 'Train']

const ProjectAppBar = (props) => {
  const {
    projectList,
    projectItem,
    patchProjectItem,
    getProjectItem
  } = props

  const [ open, setOpen ] = useState(false)
  const [ input, setInput ] = useState({
    project: '',
    type: 'Object Detection',
    OrganizationId: projectList.id,
  })
  const [ activeStep, setActiveStep ] = useState(0)
  const [ skipped, setSkipped ] = useState(new Set())

  useEffect(() => {
    projectItem
    projectList
    getProjectItem(projectItem.id)
    // console.log('projectItem', projectItem)
    // console.log('projectList', projectList)
  },[])

  const onSave = async () => {
    const converted = {}
    converted.project = input.project
    converted.type = input.type
    if(input.project&&input.type) {
      patchProjectItem(projectItem.id, converted)
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
      project: projectItem.project,
      type: projectItem.type
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

  const isStepOptional = (step) => {
    return step === 1
  }

  const isStepSkipped = (step) => {
    return skipped.has(step)
  }

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values())
      newSkipped.delete(activeStep)
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1)
    setSkipped(newSkipped)
  }

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.")
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1)
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values())
      newSkipped.add(activeStep)
      return newSkipped
    })
  }

  const handleReset = () => {
    setActiveStep(0);
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
                onClick={handleClickOpen}
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
              <Button
                color='info'
                variant='outlined'
                disabled={activeStep === 0}
                onClick={handleBack}
                startIcon={<ChevronLeftIcon />}
                sx={{
                  mr: 1,
                  "&.Mui-disabled": {
                    color: 'grey',
                    opacity: .3,
                    border: '1px solid grey'
                  }
                }}
              >
                Back
              </Button>
              <Stepper activeStep={activeStep}>
                {steps.map((label, index) => {
                  const stepProps = {};
                  const labelProps = {};
                  if (isStepOptional(index)) {
                    labelProps.optional = (
                      <Typography variant="caption" sx={{ color: 'grey' }}>Optional</Typography>
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
                          color: 'grey', // circle color (COMPLETED)
                        },
                        '& .MuiStepLabel-label .Mui-completed .MuiStepLabel-alternativeLabel': {
                          color: 'grey', // Just text label (COMPLETED)
                        },
                        '& .MuiStepLabel-root .Mui-active': {
                          color: 'green', // circle color (ACTIVE)
                        },
                        '& .MuiStepLabel-root .Mui-active .MuiStepIcon-text': {
                          fill: 'common.white', // circle's number (ACTIVE)
                        },
                        '& .MuiStepLabel-label': {
                          color: 'darkgrey', // Just text label (SKIP)
                        },
                        '& .MuiStepIcon-root .Mui-disabled': {
                          color: 'darkgrey'
                        },
                        '& .MuiStepLabel-root .Mui-disabled': {
                          color: 'darkgrey',
                        },
                      }}
                    >
                      <StepLabel {...labelProps}>{label}</StepLabel>
                    </Step>
                  )
                })}
              </Stepper>
              {/* {console.log('activeStep', activeStep)}
              {console.log('steps.length', steps.length)} */}
              {activeStep === steps.length ? (
                <div>
                  <Button onClick={handleReset} variant='outlined' sx={{ margin: 1 }} endIcon={<RestartAltIcon />}>
                    Restart
                  </Button>
                </div>
              ):(
                <div>
                  {isStepOptional(activeStep) && (
                    <Button color='info' variant='outlined' onClick={handleSkip} sx={{ margin: 1 }} endIcon={<SkipNextIcon />}>
                      Skip
                    </Button>
                  )}
                  <Button onClick={handleNext} variant='outlined' sx={{ margin: 1 }} endIcon={<ChevronRightIcon />}>
                    {activeStep === steps.length - 1 ? 'Submit' : 'Next'}
                  </Button>
                </div>
              )}
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
    projectItem: state.projectItem
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
    patchProjectItem(id, data) {
      const action = PatchProjectItem(id, data)
      dispatch(action)
    },
    getProjectItem(id, text) {
      const action = GetProjectItem(id)
      dispatch(action)
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectAppBar)