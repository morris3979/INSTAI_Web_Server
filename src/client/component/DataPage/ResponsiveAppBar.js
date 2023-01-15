import React, { useState, useEffect } from 'react'
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
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import PersonIcon from '@mui/icons-material/Person';
import GroupsIcon from '@mui/icons-material/Groups';
import Logout from '@mui/icons-material/Logout';
import InstAI from '../../icon image/instai_icon.png'
import { LogoutData, GetProjectList } from '../../store/actionCreater'

const stringToColor = (string) => {
  let hash = 0
  let i
  let color = '#55688'

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }

  return color
}

const stringAvatar = (name) => {
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${name.split(' ')[0][0]}`,
  };
}

const ResponsiveAppBar = (props) => {
  const {
    onClick,
    userInformation,
    projectList,
    dataList,
    // getProjectList
  } = props

  const [ anchorElUser, setAnchorElUser ] = useState(null)

  useEffect(() => {
    // dataList
    // projectList
    console.log('dataList', dataList)
    console.log('projectList', projectList)
  },[])

  const navigate = useNavigate();

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget)
  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }

  const onSwitchOrganization = () => {
    navigate('/SelectOrganization')
    location.reload()
  }

  const onSignOut = () => {
    onClick()
    navigate('/')
  }

  return (
    <AppBar position="fixed"
      style={{ backgroundColor: '#0A1929', height: '6vh' }}
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
    >
      <Container maxWidth="100vh">
        <Toolbar disableGutters>
          <Grid container justifyContent='flex-start'>
            <Typography href="/Home" component={'a'}>
              <img src={InstAI} alt='Logo' style={{ width: '4vh', height: '4vh' }} />
            </Typography>
            <Typography noWrap
              variant="h5"
              sx={{
                mr: 2,
                fontFamily: 'monospace',
                fontWeight: 'bold',
                color: 'inherit',
                marginTop: 0.5,
                marginLeft: 1
              }}
            >
              {dataList.project}
            </Typography>
          </Grid>
          <Grid container justifyContent='flex-end'>
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar {...stringAvatar(userInformation.username)} />
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
                <MenuItem>
                  <ListItemIcon>
                    <PersonIcon fontSize="small" />
                  </ListItemIcon>
                  Account
                </MenuItem>
                <Divider />
                <Typography sx={{ fontWeight: 'bold', marginLeft: 2, color: 'grey' }}>
                  {projectList.organization.toUpperCase()}
                </Typography>
                <MenuItem onClick={onSwitchOrganization} sx={{ fontWeight: 'bold' }}>
                  <ListItemIcon>
                    <GroupsIcon fontSize="small" />
                  </ListItemIcon>
                  Switch Organization
                </MenuItem>
                <Divider />
                <MenuItem onClick={onSignOut} sx={{ color: 'red' }}>
                  <ListItemIcon>
                    <Logout fontSize="small" />
                  </ListItemIcon>
                  Sign Out
                </MenuItem>
              </Menu>
            </Box>
          </Grid>
        </Toolbar>
      </Container>
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
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ResponsiveAppBar)