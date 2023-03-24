import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { useNavigate } from "react-router-dom";
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Grid from '@mui/material/Grid';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import PermMediaIcon from '@mui/icons-material/PermMedia';
import SettingsRemoteIcon from '@mui/icons-material/SettingsRemote';
import SettingsIcon from '@mui/icons-material/Settings';
import ScienceIcon from '@mui/icons-material/Science';
import DvrIcon from '@mui/icons-material/Dvr';
import ModelTrainingIcon from '@mui/icons-material/ModelTraining';
import { SetClippedDrawer } from '../../store/actionCreater';

const drawerWidth = '120';

const ClippedDrawer = (props) => {
    const {setClippedDrawer, clippedDrawer} = props
    const navigate = useNavigate()

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
                <Toolbar />
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
                                    <DvrIcon style={clippedDrawer=='Overview'?{ color: 'Cyan' }:{ color: 'white' }} />
                                    <ListItemText primary={'Overview'} style={{ color: 'white' }} />
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
                                    <SettingsRemoteIcon style={clippedDrawer=='Device'?{ color: 'Cyan' }:{ color: 'white' }} />
                                    <ListItemText
                                        primary={'Device'}
                                        style={{
                                            color: 'white',
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
                                    <PermMediaIcon style={clippedDrawer=='Data'?{ color: 'Cyan' }:{ color: 'white' }} />
                                    <ListItemText primary={'Data'} style={{ color: 'white' }} />
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
                                    <ModelTrainingIcon style={clippedDrawer=='Model'?{ color: 'Cyan' }:{ color: 'white' }} />
                                    <ListItemText
                                        primary={'Model'}
                                        style={{
                                            color: 'white',
                                            display: 'flex',
                                            justifyContent: 'center',
                                            flexDirection: 'column',
                                            textAlign: 'center'
                                        }}
                                    />
                                </Grid>
                            </ListItemButton>
                        </ListItem>
                        <ListItem key={'Detector'} disablePadding style={{ marginTop: 10, marginBottom: 5 }}>
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
                                    <ScienceIcon style={clippedDrawer=='Detector'?{ color: 'Cyan' }:{ color: 'white' }} />
                                    <ListItemText
                                        primary={'Detector'}
                                        style={{
                                            color: 'white',
                                            display: 'flex',
                                            justifyContent: 'center',
                                            flexDirection: 'column',
                                            textAlign: 'center'
                                        }}
                                    />
                                </Grid>
                            </ListItemButton>
                        </ListItem>
                        <ListItem key={'Settings'} disablePadding style={{ position: 'fixed', bottom: 15, maxWidth: drawerWidth }}>
                            <ListItemButton disabled={true}>
                                <Grid
                                    container
                                    direction="column"
                                    justifyContent="center"
                                    alignItems="center"
                                    width={drawerWidth}
                                >
                                    <SettingsIcon style={{ color: 'white' }} />
                                    <ListItemText
                                        primary={'Settings'}
                                        style={{
                                            color: 'white',
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
        </Box>
    )
}

const mapStateToProps = (state) => {
    //state指的是store裡的數據
    return {
        clippedDrawer: state.clippedDrawer
    }
  }

  const mapDispatchToProps = (dispatch) => {
    //dispatch指store.dispatch這個方法
    return {
        setClippedDrawer(text) {
            const action = SetClippedDrawer(text)
            dispatch(action)
          },
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(ClippedDrawer)