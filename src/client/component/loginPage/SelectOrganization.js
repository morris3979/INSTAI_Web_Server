import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import InstAI from '../../icon image/instai.png'
import { GetLoginUser, LogoutData } from '../../store/actionCreater'

const SelectOrganization = (props) => {
  const {
    getLoginUser,
    onClick,
    userInformation,
  } = props

  useEffect(() => {
    if(userInformation.id){
      return getLoginUser(userInformation.id)
    }
  },[])

  const selectOrganization = (id) => {
    console.log('organizationId', id)
  }

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
      {
        (userInformation.Organizations) != undefined ?
          userInformation.Organizations.map((c) => {
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
                onClick={() => selectOrganization(c.id)}
                component={Link}
                to='/Home'
              >
                {c.organization}
              </Button>
            )
            }):''
        }
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
        style={{ backgroundColor: 'darkorange' }}
        sx={{
              width: 400,
              marginBottom: 2,
            }}
        align='center'
        component={Link}
        to='/CreateOrganization'
      >
        ADD ORGANIZATION
      </Button>
      <Button
        variant="contained"
        sx={{
              width: 400,
              marginBottom: 2,
            }}
        align='center'
        onClick={onClick}
        component={Link}
        to='/'
      >
        SIGN OUT
      </Button>
    </Typography>
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
  return {
    getLoginUser(id, text) {
      const action = GetLoginUser(id)
      dispatch(action)
    },
    onClick() {
      const action = LogoutData()
      dispatch(action)
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SelectOrganization)