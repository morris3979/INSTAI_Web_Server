import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import InstAI from '../../icon image/instai.png'
import { CreateNewOrganization } from '../../store/actionCreater'

const CreateOrganization = (props) => {
  const { createNewOrganization, userInformation } = props

  const [ organizationName, setOrganizationName ] = useState('')

  const handleChangeOrganization = (e) => {
    setOrganizationName((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
  }

  const onCreate = () => {
    if (organizationName.length === 0) {
      alert('Organization can not be empty!')
      location.reload()
    } else {
      createNewOrganization(organizationName, userInformation.id)
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
        style={{ backgroundColor: 'darkorange' }}
        sx={{ width: 400, marginBottom: 2 }}
        align='center'
        onClick={onCreate}
        component={Link}
        to='/SelectOrganization'
      >
        CREATE ORGANIZATION
      </Button>
      <Button
        variant="contained"
        sx={{ width: 400, marginBottom: 2 }}
        align='center'
        component={Link}
        to='/Organization/Select'
      >
        CANCEL
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
    createNewOrganization(data, id) {
      const action = CreateNewOrganization(data, id)
      dispatch(action)
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateOrganization)