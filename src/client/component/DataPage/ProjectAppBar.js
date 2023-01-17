import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import FilterCenterFocusIcon from '@mui/icons-material/FilterCenterFocus';
import EditIcon from '@mui/icons-material/Edit';
import { LogoutData, GetProjectList } from '../../store/actionCreater'

const ProjectAppBar = (props) => {
  const {
    projectList,
    dataList,
  } = props

  useEffect(() => {
    // dataList
    // projectList
    console.log('dataList', dataList)
    console.log('projectList', projectList)
  },[])

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
            <Typography noWrap
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
            <Button>
                <EditIcon style={{ color: 'white' }} />
            </Button>
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

export default connect(mapStateToProps, mapDispatchToProps)(ProjectAppBar)