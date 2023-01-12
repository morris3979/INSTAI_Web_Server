import React, { useState } from 'react'
import { connect } from 'react-redux'
import { useNavigate } from "react-router-dom";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import Grid from '@mui/material/Grid';
import InstAI from '../../icon image/instai.png'
import { LogoutData } from '../../store/actionCreater'

const settings = ['Profile', 'Account', 'Logout'];

const stringToColor = (string) => {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#55688';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }

  return color;
}

const stringAvatar = (name) => {
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
  };
}

const ResponsiveAppBar = (props) => {
  const { onClick } = props

  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const navigate = useNavigate();

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  }

  const handleCloseUserMenu = (e) => {
    setAnchorElUser(null);
    if(e.target.innerText == 'Logout'){
      onClick()
      navigate('/')
    }
  }

  return (
    <AppBar position="static" style={{ backgroundColor: '#0A1929', height: '6vh' }}>
      <Container maxWidth="100vh">
        <Toolbar disableGutters>
          <Grid container justifyContent='flex-start'>
            <Typography href="/Home" component={'a'}>
              <img src={InstAI} alt='Logo' style={{ width: '12vh', height: '6vh' }} />
            </Typography>
          </Grid>

          <Grid container justifyContent='flex-end'>
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar {...stringAvatar('Morris Chang')} />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem key={setting} onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Grid>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

const mapDispatchToProps = (dispatch) => {
  //dispatch指store.dispatch這個方法
  return {
    onClick() {
      const action = LogoutData()
      dispatch(action)
    },
  }
}

export default connect(null, mapDispatchToProps)(ResponsiveAppBar)