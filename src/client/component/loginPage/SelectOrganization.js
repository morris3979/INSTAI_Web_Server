import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import InstAI from '../../icon image/instai.png'
import {
  GetLoginUser,
  LogoutData,
  GetProjectList,
  OrganizationImport
} from '../../store/actionCreater'

const SelectOrganization = (props) => {
  const {
    getLoginUser,
    onClick,
    userInformation,
    getProjectList,
    organizationImport,
    userImport
  } = props

  const navigate = useNavigate()

  useEffect(() => {
    getLoginUser(userImport)
    userInformation
  },[])

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
        style={{ marginBottom: 15 }}
      >
        Select Your Organization
      </Typography>
      <div style={{ marginBottom: 10 }}>
        {userInformation.Organizations?.map((c) => {
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
                getProjectList(c.id)
                organizationImport(c.id)
                setTimeout(() => {
                  navigate('/Home')
                }, 300)
              }}
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
        style={{ marginTop: 10, marginBottom: 10, color: 'white' }}
      >
        or
      </Divider>
      <Button
        variant="contained"
        style={{ backgroundColor: 'darkorange' }}
        sx={{ width: 400, marginTop: 2, marginBottom: 2 }}
        align='center'
        component={Link}
        to='/Organization/Create'
      >
        ADD ORGANIZATION
      </Button>
      <Button
        variant="outlined"
        color='error'
        sx={{ width: 400, marginBottom: 2 }}
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
    userInformation: state.userInformation,
    projectList: state.projectList,
    userImport: state.userImport
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
    getProjectList(id, text) {
      const action = GetProjectList(id)
      dispatch(action)
    },
    organizationImport(id, text) {
      const action = OrganizationImport(id)
      dispatch(action)
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SelectOrganization)