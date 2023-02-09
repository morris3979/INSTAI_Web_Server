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
import { LogoutData, GetProjectList, PatchProjectData } from '../../store/actionCreater'

const steps = ['Data collection', 'Clean data', 'Label', 'Train']

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
  const [ activeStep, setActiveStep ] = useState(0)
  const [ skipped, setSkipped ] = useState(new Set())

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
              justifyContent="flex-end"
              alignItems="center"
            >
              <Button
                color="inherit"
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
                          color: 'darkgray', // circle color (COMPLETED)
                        },
                        '& .MuiStepLabel-label.Mui-completed.MuiStepLabel-alternativeLabel':
                          {
                            color: 'darkgray', // Just text label (COMPLETED)
                          },
                        '& .MuiStepLabel-root .Mui-active': {
                          color: 'green', // circle color (ACTIVE)
                        },
                        '& .MuiStepLabel-label .Mui-active.MuiStepLabel-alternativeLabel': {
                          color: 'common.white', // Just text label (ACTIVE)
                        },
                        '& .MuiStepLabel-root .Mui-active .MuiStepIcon-text': {
                          fill: 'common.white', // circle's number (ACTIVE)
                        },
                        '& .MuiStepIcon-root .Mui-disabled': {
                          color: 'darkgrey'
                        },
                        '& .MuiStepLabel-root .Mui-disabled': {
                          color: 'darkgrey',
                        },
                        '& .MuiStepLabel-root .Mui-disabled .MuiStepIcon-text': {
                          color: 'black',
                        }
                      }}
                    >
                      <StepLabel {...labelProps}>{label}</StepLabel>
                    </Step>
                  )
                })}
              </Stepper>
              {activeStep === steps.length ? (
                <div>
                  <Button onClick={handleReset} variant='outlined' sx={{ margin: 1 }} endIcon={<RestartAltIcon />}>Restart</Button>
                </div>
              ) : (
                <div>
                  {isStepOptional(activeStep) && (
                    <Button color="inherit" variant='outlined' onClick={handleSkip} sx={{ margin: 1 }} endIcon={<SkipNextIcon />}>
                      Skip
                    </Button>
                  )}
                  <Button onClick={handleNext} variant='outlined' sx={{ margin: 1 }} endIcon={<ChevronRightIcon />}>
                    {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
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