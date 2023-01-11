import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import InstAI from '../../icon image/instai.png'
import { LoginAuthorize } from '../../store/actionCreater'

const SelectOrganization = (props) => {
  const { loginAuthorize, loginInformation } = props

  return(
    <Typography align='center' sx={{ width : 400 }}>
      <div>
        <img src={InstAI} alt='Logo' style={{ width: '70%', height: '70%' }} />
      </div>
      <Typography
        fontFamily='Microsoft JhengHei UI'
        fontSize='30px'
        align='center'
        color='lightblue'
        style={{marginBottom:'5px'}}
      >
        Select Your Organization
      </Typography>
      <div style={{marginBottom:'5px'}}>
        {loginInformation.Organizations.map((c) => {
          return (
            <Button
              variant="outlined"
              sx={{
                    width: 400,
                    height: 50,
                    marginBottom: 2,
                    color: 'lightblue',
                    borderColor: 'lightblue'
                  }}
              align='center'
              onClick={() => {}}
              component={Link}
              to='/Home'
            >
              {c.organization}
            </Button>
          )
        })}
      </div>
      <Divider
        sx={{
          '&.MuiDivider-root': {
            "&::before": {
              borderTop: "thin solid green"
            },
            "&::after": {
              borderTop: "thin solid blue"
            }
          }
        }}
        style={{ marginBottom: 10, color: 'white' }}
      >
        or
      </Divider>
        <Button
          variant="contained"
          sx={{
                width: 400,
                marginBottom: 2,
              }}
          align='center'
          onClick={() => {
            loginAuthorize(true)
          }}
          component={Link}
          to='/CreateOrganization'
        >
          ADD ORGANIZATION
        </Button>
    </Typography>
    )
}

const mapStateToProps = (state) => {
  //state指的是store裡的數據
  return {
    loginInformation: state.loginInformation,
  }
}

const mapDispatchToProps = (dispatch) => {
  //dispatch指store.dispatch這個方法
  return {
    loginAuthorize(text) {
      const action = LoginAuthorize(text)
      dispatch(action)
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SelectOrganization)