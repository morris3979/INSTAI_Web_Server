import React, { useState } from 'react'
import { connect } from 'react-redux'
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import InstAI from '../../icon image/instai.png'
import { LoginState, HasSelectedOrg, LoginAuthorize } from '../../store/actionCreater'

const OrganizationSelectForm = (props) => {

  const { loginState, hasSelectedOrg, selectorg, loginAuthorize, loginInformation } = props;
  
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
              onClick={() => { 
                hasSelectedOrg(true)
                }}>
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
            loginState(false)
            loginAuthorize(true)
             }}>
          Create Organization
        </Button>
    </Typography>
    )
}

const mapStateToProps = (state) => {
  //state指的是store裡的數據
  return {
    loginInformation: state.loginInformation,
    selectorg: state.selectorg
  }
}
const mapDispatchToProps = (dispatch) => {
  //dispatch指store.dispatch這個方法
  return {
    loginState(text) {
      const action = LoginState(text)
      dispatch(action)
    },
    hasSelectedOrg(text) {
      const action = HasSelectedOrg(text)
      dispatch(action)
    },
    loginAuthorize(text) {
      const action = LoginAuthorize(text)
      dispatch(action)
    }
  }
}
  
  export default connect(mapStateToProps, mapDispatchToProps)(OrganizationSelectForm)