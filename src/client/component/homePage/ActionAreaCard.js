import React, { useState } from 'react'
import { connect } from 'react-redux'
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import { CardActionArea } from '@mui/material';

const ActionAreaCard = (props) => {
  const { userInformation } = props

  return (
    <div style={{ marginTop: 20 }}>
      <div style={{ marginBottom: 30, display: 'flex', justifyContent:'space-between', alignItems: 'center', width: '90vw' }}>
        <div style={{ float: 'left' }}>
          <Typography variant="h5" gutterBottom color={'white'}>
            {`Welcome, ${userInformation.username}`}
          </Typography>
        </div>
        <div style={{ float: 'right' }}>
          <Button variant="contained">Create Project</Button>
        </div>
      </div>
      <Card sx={{ maxWidth: 345, backgroundColor: 'lightblue' }}>
        <CardActionArea>
          <CardContent>
            <Typography variant="body2" textAlign={'center'} color="white" borderRadius={2} style={{backgroundColor: 'grey'}} maxWidth='8vw'>
              object detection
            </Typography>
            <Typography gutterBottom variant="h5" component="div">
              New Project
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Created by {userInformation.username}
            </Typography>
            <Typography variant="body2" color="text.secondary" style={{ marginTop: 50 }}>
              Last opened ???
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </div>
  )
}

const mapStateToProps = (state) => {
  //state指的是store裡的數據
  return {
    userInformation: state.userInformation
  }
}

const mapDispatchToProps = (dispatch) => {
  //dispatch指store.dispatch這個方法
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(ActionAreaCard)