import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import PermMediaIcon from '@mui/icons-material/PermMedia';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import { CirclesWithBar } from 'react-loader-spinner';

const drawerWidth = 100;

const ClippedDrawer = (props) => {

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
                    backgroundColor: '#0A1929'
                },
                }}
            >
                <Toolbar />
                <Box sx={{ overflow: 'auto' }}>
                    <List>
                        <ListItem key={'Data'} disablePadding style={{marginTop: 15, marginBottom: 15}}>
                            <ListItemButton>
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
                        <ListItem key={'Deploy'} disablePadding style={{marginTop: 15, marginBottom: 15}}>
                            <ListItemButton>
                                <Grid
                                    container
                                    direction="column"
                                    justifyContent="center"
                                    alignItems="center"
                                >
                                    <RocketLaunchIcon style={{color: 'white'}} />
                                    <ListItemText primary={'Deploy'} style={{color: 'white'}} />
                                </Grid>
                            </ListItemButton>
                        </ListItem>
                    </List>
                </Box>
            </Drawer>
            <div
                style={{
                    marginTop: 200,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                }}
            >
                <CirclesWithBar
                height="100"
                width="100"
                color="#4fa94d"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
                outerCircleColor=""
                innerCircleColor="lightblue"
                barColor="red"
                ariaLabel='circles-with-bar-loading'
                />
                <h1 style={{ color: 'yellow' }}>SITE UNDER CONSTRUCTION ...</h1>
            </div>
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