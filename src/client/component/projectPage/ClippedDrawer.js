import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { useNavigate } from "react-router-dom";
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import PermMediaIcon from '@mui/icons-material/PermMedia';
import SettingsRemoteIcon from '@mui/icons-material/SettingsRemote';
import SettingsIcon from '@mui/icons-material/Settings';
import ScienceIcon from '@mui/icons-material/Science';
import DvrIcon from '@mui/icons-material/Dvr';
import ModelTrainingIcon from '@mui/icons-material/ModelTraining';
import { GetProjectItem, PatchProjectItem, GetOrganizationMembers, SetClippedDrawer } from '../../store/actionCreater';

const drawerWidth = '120';

const ClippedDrawer = (props) => {
    const {
      userInformation,
      projectImport,
      organizationImport,
      membersList,
      projectItem, 
      getProjectItem, 
      patchProjectItem,
      getOrganizationMembers,
      setClippedDrawer, 
      clippedDrawer
     } = props
    
    useEffect(() => {
      projectItem
      getProjectItem(projectImport)
      getOrganizationMembers(organizationImport)
    },[])

    const [ open, setOpen ] = useState(false)
    const [ permissioned, setPermissioned ] = useState(null)
    const navigate = useNavigate()

    const handleClickOpen = () => {
      setOpen(true)
    }

    const handleClose = () => {
      setOpen(false)
      setPermissioned(null)
    }

    const onSave = () => {
      if(permissioned!=null) {
        const converted = {}
        converted.project = projectItem.project
        converted.accessAuth = permissioned? 0 : 1
        patchProjectItem(projectItem.id,converted)
      }
      setOpen(false)
      setPermissioned(null)
    }

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <Drawer
                variant="permanent"
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    [`& .MuiDrawer-paper`]: {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                        backgroundColor: '#1c2127',
                        borderWidth: 0
                    },
                }}
            >
                {/* <Toolbar /> */}
                <Toolbar />
                <Box sx={{ overflow: 'auto' }}>
                    <List
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <ListItem key={'Overview'} disablePadding style={{ marginTop: 10, marginBottom: 5 }}>
                            <ListItemButton
                                onClick={() => {
                                    setClippedDrawer('Overview')
                                    setTimeout(() => {navigate('/Project/Overview')},300)
                                }}
                            >
                                <Grid
                                    container
                                    direction="column"
                                    justifyContent="center"
                                    alignItems="center"
                                    width={drawerWidth}
                                >
                                    <DvrIcon style={{ color: clippedDrawer=='Overview'? 'Cyan' : 'darkcyan' }} />
                                    <ListItemText
                                        primary={'Overview'}
                                        style={{
                                            color: clippedDrawer=='Overview'? 'Cyan' : 'darkcyan',
                                            display: 'flex',
                                            justifyContent: 'center',
                                            flexDirection: 'column',
                                            textAlign: 'center'
                                        }}
                                    />
                                </Grid>
                            </ListItemButton>
                        </ListItem>
                        <ListItem key={'Device'} disablePadding style={{ marginTop: 10, marginBottom: 5 }}>
                            <ListItemButton
                                onClick={() => {
                                    setClippedDrawer('Device')
                                    setTimeout(() => {navigate('/Project/Device')},300)
                                }}
                            >
                                <Grid
                                    container
                                    direction="column"
                                    justifyContent="center"
                                    alignItems="center"
                                    width={drawerWidth}
                                >
                                    <SettingsRemoteIcon style={{ color: clippedDrawer=='Device'? 'Cyan' : 'darkcyan' }} />
                                    <ListItemText
                                        primary={'Device'}
                                        style={{
                                            color: clippedDrawer=='Device'? 'Cyan' : 'darkcyan',
                                            display: 'flex',
                                            justifyContent: 'center',
                                            flexDirection: 'column',
                                            textAlign: 'center'
                                        }}
                                    />
                                </Grid>
                            </ListItemButton>
                        </ListItem>
                        <ListItem key={'Data'} disablePadding style={{ marginTop: 10, marginBottom: 5 }}>
                            <ListItemButton
                                onClick={() => {
                                    setClippedDrawer('Data')
                                    setTimeout(() => {navigate('/Project/Data')},300)
                                }}
                            >
                                <Grid
                                    container
                                    direction="column"
                                    justifyContent="center"
                                    alignItems="center"
                                    width={drawerWidth}
                                >
                                    <PermMediaIcon style={{ color: clippedDrawer=='Data'? 'Cyan' : 'darkcyan' }} />
                                    <ListItemText
                                        primary={'Data'}
                                        style={{
                                            color: clippedDrawer=='Data'? 'Cyan' : 'darkcyan',
                                            display: 'flex',
                                            justifyContent: 'center',
                                            flexDirection: 'column',
                                            textAlign: 'center'
                                        }}
                                    />
                                </Grid>
                            </ListItemButton>
                        </ListItem>
                        <ListItem key={'Model'} disablePadding style={{ marginTop: 10, marginBottom: 5 }}>
                            <ListItemButton
                                onClick={() => {
                                    setClippedDrawer('Model')
                                    setTimeout(() => {navigate('/Project/Model')},300)
                                }}
                            >
                                <Grid
                                    container
                                    direction="column"
                                    justifyContent="center"
                                    alignItems="center"
                                    width={drawerWidth}
                                >
                                    <ModelTrainingIcon style={{ color: clippedDrawer=='Model'? 'Cyan' : 'darkcyan' }} />
                                    <ListItemText
                                        primary={'Model'}
                                        style={{
                                            color: clippedDrawer=='Model'? 'Cyan' : 'darkcyan',
                                            display: 'flex',
                                            justifyContent: 'center',
                                            flexDirection: 'column',
                                            textAlign: 'center'
                                        }}
                                    />
                                </Grid>
                            </ListItemButton>
                        </ListItem>
                        {/* <ListItem key={'Detector'} disablePadding style={{ marginTop: 10, marginBottom: 5 }}>
                            <ListItemButton
                                onClick={() => {
                                    setClippedDrawer('Detector')
                                    setTimeout(() => {navigate('/Project/Detector')},300)
                                }}
                            >
                                <Grid
                                    container
                                    direction="column"
                                    justifyContent="center"
                                    alignItems="center"
                                    width={drawerWidth}
                                >
                                    <ScienceIcon style={{ color: clippedDrawer=='Detector'? 'Cyan' : 'darkcyan' }} />
                                    <ListItemText
                                        primary={'Detector'}
                                        style={{
                                            color: clippedDrawer=='Detector'? 'Cyan' : 'darkcyan',
                                            display: 'flex',
                                            justifyContent: 'center',
                                            flexDirection: 'column',
                                            textAlign: 'center'
                                        }}
                                    />
                                </Grid>
                            </ListItemButton>
                        </ListItem> */}
                        <ListItem key={'Settings'} disablePadding style={{ position: 'fixed', bottom: 15, maxWidth: drawerWidth }}>
                            <ListItemButton 
                                onClick={handleClickOpen}
                                disabled={(membersList.Users?.find(data => data.id == userInformation.id))?.UserGroup.authorize != 'admin'}
                            >
                                <Grid
                                    container
                                    direction="column"
                                    justifyContent="center"
                                    alignItems="center"
                                    width={drawerWidth}
                                >
                                    <SettingsIcon style={{ color: 'darkcyan' }} />
                                    <ListItemText
                                        primary={'Settings'}
                                        style={{
                                            color: 'darkcyan',
                                            display: 'flex',
                                            justifyContent: 'center',
                                            flexDirection: 'column',
                                            textAlign: 'center'
                                        }}
                                    />
                                </Grid>
                            </ListItemButton>
                        </ListItem>
                    </List>
                </Box>
            </Drawer>
            <Dialog open={open} onClose={handleClose}>
              <DialogContent style={{ backgroundColor: '#444950', color: 'white' }}>Modify Project Authorize</DialogContent>
              <DialogTitle style={{ backgroundColor: '#444950' }}>
                <FormControl>
                  <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                    defaultValue={!projectItem.accessAuth?"permissioned":"nonpermissioned" }
                  >
                    <FormControlLabel 
                      value="nonpermissioned" 
                      control={ <Radio style={{ color:'lightblue' }} /> } 
                      label="For All User" 
                      style={{ color: 'white' }}
                      onClick={() => {
                        setPermissioned(false)
                      }}
                    />
                    <FormControlLabel 
                      value="permissioned" 
                      control={ <Radio style={{ color:'lightblue' }} /> } 
                      label="Only Admin" 
                      style={{ color: 'white' }}
                      onClick={() => {
                        setPermissioned(true)
                      }}
                      />
                  </RadioGroup>
                </FormControl>
              </DialogTitle>
              <DialogActions style={{ backgroundColor: '#444950' }}>
                <Button variant="contained" size='small' onClick={handleClose} style={{marginTop: 10}}>Cancel</Button>
                <Button variant="contained" size='small' onClick={onSave} style={{marginTop: 10}}>OK</Button>
              </DialogActions>
            </Dialog>
        </Box>
    )
}

const mapStateToProps = (state) => {
    //state指的是store裡的數據
    return {
        userInformation: state.userInformation,
        projectImport: state.projectImport,
        organizationImport: state.organizationImport,
        projectItem: state.projectItem,
        membersList: state.membersList,
        clippedDrawer: state.clippedDrawer
    }
  }

  const mapDispatchToProps = (dispatch) => {
    //dispatch指store.dispatch這個方法
    return {
        getProjectItem(id) {
            const action = GetProjectItem(id)
            dispatch(action)
        },
        patchProjectItem(id, data) {
            const action = PatchProjectItem(id, data)
            dispatch(action)
        },
        getOrganizationMembers(id) {
            const action = GetOrganizationMembers(id)
            dispatch(action)
        },
        setClippedDrawer(text) {
            const action = SetClippedDrawer(text)
            dispatch(action)
        },
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(ClippedDrawer)