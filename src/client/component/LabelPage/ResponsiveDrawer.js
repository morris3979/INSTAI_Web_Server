import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

const drawerWidth = 240;

const ResponsiveDrawer = (props) => {

  const drawer = (
    <div>
      <Toolbar />
      <Toolbar />
      <Divider
        sx={{
          '&.MuiDivider-root': {
            border: 'thin solid darkslateblue',
          }
        }}
      />
      <Toolbar />
      <Toolbar />
      <Toolbar />
      <Divider
        sx={{
          '&.MuiDivider-root': {
            border: 'thin solid darkslateblue'
          }
        }}
      />
      <Toolbar />
      <Toolbar />
    </div>
  );

  return (
    <Box sx={{ display: 'flex' }}>
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
    return {}
}

const mapDispatchToProps = (dispatch) => {
    //dispatch指store.dispatch這個方法
    return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(ResponsiveDrawer)