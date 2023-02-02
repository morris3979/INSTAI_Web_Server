import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { useNavigate } from "react-router-dom";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import FileDownloadIcon from '@mui/icons-material/FileDownload';

const drawerWidth = 240;

const ResponsiveDrawer = (props) => {
  const { dataItem } = props

  const navigate = useNavigate()

  useEffect(() => {
    dataItem
    // console.log('dataItem', dataItem)
  },[])

  const drawer = (
    <div>
        <IconButton
            aria-label="close label"
            component="label"
            onClick={() => {
                navigate('/Data')
            }}
            style={{ marginLeft: 2, marginTop: 2, color: 'lightblue' }}
        >
            <CloseIcon />
        </IconButton>
        {/* <Toolbar /> */}
        <Divider
            sx={{
                '&.MuiDivider-root': {
                    "&::before": {
                      borderTop: "thin solid green"
                    },
                    "&::after": {
                      borderTop: "thin solid blue"
                    }
                },
                marginTop: 2
            }}
        >
            <Typography
                color='darkgrey'
                sx={{ fontWeight: 'bold' }}
            >
                General
            </Typography>
        </Divider>
        <List>
            <Grid
                container
                direction="column"
                spacing={2}
                style={{ marginLeft: 10, marginTop: 8 }}
            >
                <Typography color='grey' sx={{ fontWeight: 'bold' }}>Name</Typography>
                <Grid
                    container
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                    style={{ marginTop: 3 }}
                >
                    <Typography color='darkgrey'>{dataItem.data}</Typography>
                </Grid>
            </Grid>
            <Grid
                container
                direction="column"
                spacing={2}
                style={{ marginLeft: 10, marginTop: 8 }}
            >
                <Typography color='grey' sx={{ fontWeight: 'bold' }}>Uploaded</Typography>
                <Grid
                    container
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                    style={{ marginTop: 3 }}
                >
                    <Typography color='darkgrey'>{dataItem.createdAt.slice(0, -5).replace('T', ' ')}</Typography>
                </Grid>
            </Grid>
            <Grid
                container
                direction="column"
                spacing={2}
                style={{ marginLeft: 10, marginTop: 8, marginBottom: 8 }}
            >
                <Typography color='grey' sx={{ fontWeight: 'bold' }}>Action</Typography>
                <Grid
                    container
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                >
                    <IconButton
                        aria-label="download label"
                        component="label"
                        style={{ color: 'darkgrey' }}
                    >
                        <FileDownloadIcon />
                    </IconButton>
                    <IconButton
                        aria-label="delete label"
                        component="label"
                        style={{ color: 'darkgrey' }}
                    >
                        <DeleteIcon />
                    </IconButton>
                </Grid>
            </Grid>
        </List>
        <Divider
            sx={{
                '&.MuiDivider-root': {
                    border: 'thin solid darkslateblue'
                }
            }}
        />
        <List>
            <ListItem style={{ marginTop: 8 }}>
                <ListItemButton
                    style={{
                        backgroundColor: 'darkorange',
                        color: 'darkslateblue',
                        justifyContent: "center",
                        alignItems: "center",
                        fontWeight: 'bold',
                        borderRadius: 5
                    }}
                >
                    Save & Exist
                </ListItemButton>
            </ListItem>
        </List>
        <Toolbar />
    </div>
  );

  return (
    <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar
            position="fixed"
            sx={{
                backgroundColor: '#0A1929',
                width: { sm: `calc(100% - ${drawerWidth}px)` },
                ml: { sm: `${drawerWidth}px` },
            }}
        >
            <Toolbar>
                <Typography
                    variant="h6"
                    noWrap
                    component="div"
                    color='lightblue'
                    sx={{ fontWeight: 'bold' }}
                >
                    Label Workspace
                </Typography>
            </Toolbar>
        </AppBar>
        <Box
            component="nav"
            sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
            aria-label="mailbox folders"
        >
            <Drawer
                variant="permanent"
                sx={{
                    display: { xs: 'none', sm: 'block' },
                    '& .MuiDrawer-paper': {
                        boxSizing: 'border-box',
                        width: drawerWidth,
                        backgroundColor: '#0A1929'
                    },
                }}
                open
            >
            {drawer}
            </Drawer>
        </Box>
    </Box>
  );
}

const mapStateToProps = (state) => {
    //state指的是store裡的數據
    return {
        dataItem: state.dataItem
    }
}

const mapDispatchToProps = (dispatch) => {
    //dispatch指store.dispatch這個方法
    return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(ResponsiveDrawer)