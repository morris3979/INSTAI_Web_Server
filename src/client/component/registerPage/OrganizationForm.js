import React, { useState } from 'react'
import { connect } from 'react-redux'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import InstAI from '../../icon image/instai.png'
import { OrganizationFormData } from '../../store/actionCreater'

const OrganizationCreateForm = (props) => {
  const { organizationFormData, userInformation, loginInformation } = props

  const [ organizationName, setOrganizationName ] = useState('')

  const handleChangeOrganization = (e) => {
    setOrganizationName((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
  }

  const onSubmitOrganization = (e) => {
    if(Object.keys(userInformation).length){
      e.preventDefault()
      organizationFormData(organizationName, userInformation.id)
    }else{
      e.preventDefault()
      organizationFormData(organizationName, loginInformation.id)
    }
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
        Set Up Your Organization
      </Typography>
      <TextField
          id="organization"
          name="organization"
          placeholder="Organization Name"
          required='True'
          margin='normal'
          onChange={handleChangeOrganization}
          sx={{ width: 400, marginBottom: 5, border:'2px solid white' }}
          InputProps={{
            style: {
              color: 'white'
            },
          }}
      />
      <Button
        variant="contained"
        onClick={onSubmitOrganization}
        sx={{
              width: 400,
              marginBottom: 5,
            }}
        align='center'
      >
        Create Organization
      </Button>
    </Typography>
  )
}

const mapStateToProps = (state) => {
  //state指的是store裡的數據
  return {
    userInformation: state.userInformation,
    loginInformation: state.loginInformation
  }
}

const mapDispatchToProps = (dispatch) => {
  //dispatch指store.dispatch這個方法
  return {
    organizationFormData(data, id) {
      const action = OrganizationFormData(data, id)
      dispatch(action)
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrganizationCreateForm)