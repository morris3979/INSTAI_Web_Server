import React, { useState } from 'react'
import { connect } from 'react-redux'
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import { CardActionArea } from '@mui/material';

const ActionAreaCard = (props) => {
  const { userInformation } = props

  return (
    <div style={{ marginTop: 20, marginBottom: 40 }}>
      <div style={{ marginBottom: 10, display: 'flex', justifyContent:'space-between', alignItems: 'center', width: '90vw' }}>
        <div style={{ float: 'left' }}>
          <Typography variant="h5" gutterBottom color={'white'} sx={{fontFamily: 'monospace', fontWeight: 'bold'}}>
            {`Welcome, ${userInformation.username}`}
          </Typography>
        </div>
        <div style={{ float: 'right' }}>
          <Button variant="contained">Create Project</Button>
        </div>
      </div>
      <div style={{ marginBottom: 5, display: 'flex', justifyContent:'right', width: '90vw' }}>
        <TextField
          focused
          id="outlined-start-adornment"
          label="Search"
          size='small'
          color='info'
          sx={{ width: 400 }}
          placeholder='Search by project name, creator...'
          InputProps={{
            style: {
              color: 'white'
            },
            endAdornment: <SearchIcon style={{ color: 'white' }} />,
          }}
        />
      </div>
      <div style={{ marginBottom: 10, display: 'flex', justifyContent:'left', alignItems: 'center', width: '90vw' }}>
        <div style={{ float: 'left' }}>
          <Typography variant="h6" gutterBottom color={'white'} sx={{fontWeight: 'bold'}}>
            All Projects
          </Typography>
        </div>
      </div>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container maxWidth='90vw' spacing={{ xs: 2, md: 4 }} columns={{ xs: 4, sm: 6, md: 16 }}>
          {Array.from(Array(23)).map((_, index) => (
            <Grid item xs={2} sm={6} md={4} key={index}>
              <Card sx={{ maxWidth: 430, backgroundColor: 'lightblue' }}>
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
                    <Typography variant="body2" color="text.secondary" style={{ marginTop: 60 }}>
                      Last opened ???
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
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