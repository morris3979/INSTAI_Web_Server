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

const drawerWidth = '5.5vw';

const ClippedDrawer = (props) => {

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
                    <List>
                        <ListItem key={'Data'} disablePadding style={{ marginTop: 10, marginBottom: 15 }}>
                            <ListItemButton onClick={() => navigate('/Data')}>
                                <Grid
                                    container
                                    direction="column"
                                    justifyContent="center"
                                    alignItems="center"
                                >
                                    <PermMediaIcon style={{color: 'white'}} />
                                    <ListItemText primary={'Data'} style={{color: 'white'}} />
                                </Grid>
                            </ListItemButton>
                        </ListItem>
                        <ListItem key={'Device'} disablePadding style={{ marginTop: 15, marginBottom: 15 }}>
                            <ListItemButton onClick={() => navigate('/Device')}>
                                <Grid
                                    container
                                    direction="column"
                                    justifyContent="center"
                                    alignItems="center"
                                >
                                    <SettingsRemoteIcon style={{color: 'white'}} />
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
                        <ListItem key={'Settings'} disablePadding style={{ position: 'fixed', bottom: 15, maxWidth: '5.5vw' }}>
                            <ListItemButton disabled={true}>
                                <Grid
                                    container
                                    direction="column"
                                    justifyContent="center"
                                    alignItems="center"
                                >
                                    <SettingsIcon style={{color: 'white'}} />
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
    return {}
  }

  const mapDispatchToProps = (dispatch) => {
    //dispatch指store.dispatch這個方法
    return {}
  }

export default connect(mapStateToProps, mapDispatchToProps)(ClippedDrawer)