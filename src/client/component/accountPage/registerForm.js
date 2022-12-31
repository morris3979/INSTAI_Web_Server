import React from 'react'
import { connect } from 'react-redux'
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import InputAdornment from '@mui/material/InputAdornment';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import AccountCircle from '@mui/icons-material/AccountCircle';
import GoogleIcon from '@mui/icons-material/Google';
import InstAI from '../../icon image/instai.png'
import { RegisterFormData, LoginState } from '../../store/actionCreater'

const RegisterForm = (props) => {

  const { loginState } = props;

  return (
    <Typography align='center' sx={{ width : 400 }}>
      <div>
        <img src={InstAI} alt='Logo' style={{ width: '70%', height: '70%' }} />
      </div>
      <Typography fontFamily='Microsoft JhengHei UI' fontSize='30px' align='center'>
        Create Your Account
      </Typography>
      <div style={{marginBottom:'5px'}}>
        <Button 
          tartIcon={<GoogleIcon/>} 
          variant="outlined" 
          sx={{ 
                width: 400, 
                marginBottom: 2, 
                color: 'black',
                borderColor: 'black'
              }} 
          align='center'>
          Continue with Google
        </Button>
      </div>
      <Divider style={{ marginBottom: 5 }}>
        or
      </Divider>
      <Typography align='left'>
        Email
      </Typography>
      <TextField
        id="input-with-icon-textfield"
        placeholder="yourname@email.com"
        sx={{ width: 400, marginBottom: 5 }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <AccountCircle />
            </InputAdornment>
          ),
        }}
      />
      <Button 
        variant="contained" 
        sx={{ 
              width: 400, 
              marginBottom: 5, 
            }} 
        align='center'>
        Create Your Account
      </Button>
      <Typography sx={{ marginBottom: 5 }}>
      Already have an account?
          <Link
           onClick={() => {loginState(true)}}>
            Sign In
          </Link>
      </Typography>
    </Typography>
  )
}

const mapDispatchToProps = (dispatch) => {
  //dispatch指store.dispatch這個方法
  return {
    onFinish(value) {
      const action = RegisterFormData(value)
      dispatch(action)
    },
    loginState(text) {
      const action = LoginState(text)
      dispatch(action)
    }
  }
}

export default connect(null, mapDispatchToProps)(RegisterForm)