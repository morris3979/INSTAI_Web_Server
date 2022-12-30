import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { Form, Input, Checkbox } from 'antd'
import { LoginFormData } from '../../store/actionCreater'
import IconButton from '@mui/material/IconButton';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import AccountCircle from '@mui/icons-material/AccountCircle';
import OutlinedInput from '@mui/material/OutlinedInput';
import Visibility from '@mui/icons-material/Visibility';
import {
  LoginOutlined,
  UserOutlined,
  LockOutlined
} from '@ant-design/icons'
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import GoogleIcon from '@mui/icons-material/Google';
import InstAI from '../../icon image/instai.png'
const { Item } = Form
const { Password } = Input
const border = {
    borderTopLeftRadius: '12px',
    borderTopRightRadius: '12px',
    borderBottomLeftRadius: '12px',
    borderBottomRightRadius: '12px',
}

const LoginForm = (props) => {
  const { onFinish } = props

  return (
    <Typography align='center' sx={{ width : 400 }}>
      <div>
        <img src={InstAI} alt='Logo' style={{ width: '70%', height: '70%' }} />
      </div>
      <Typography fontFamily='Lucida Console' fontSize='50px' color='DodgerBlue' align='center'>
        Sign In
      </Typography>
      <div style={{marginBottom:'5px'}}>
        <Button 
          tartIcon={<GoogleIcon/>} 
          variant="outlined" 
          sx={{ 
                width: 400, 
                marginBottom: 2, 
                color: 'black', 
                border: "2px black solid" }} 
          align='center'>
          Continue with Google
        </Button>
        <Button 
          startIcon={<VpnKeyIcon/>} 
          variant="outlined" 
          sx={{ 
                width: 400, 
                marginBottom: 5, 
                color: 'black', 
                border: "2px black solid"  }} 
          align='center'>
          Continue with Enterprise SSO
        </Button>
      </div>
      <Divider style={{ marginBottom: 5 }}>or</Divider>
      <Typography align='left'>Email</Typography>
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
      <div>
        <Typography align='left'>
          Password
          <Link> (Forget Password?)</Link>
        </Typography>
      </div>
      <FormControl 
        sx={{ width: 400, 
              marginBottom: 5 }} 
        variant="outlined">
        <OutlinedInput
          id="outlined-adornment-password"
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                // onClick={handleClickShowPassword}
                // onMouseDown={handleMouseDownPassword}
                edge="end"
              >
              {<Visibility />}
              </IconButton>
            </InputAdornment>
          }
        />
      </FormControl>
      <Button 
        variant="contained" 
        sx={{ 
              width: 400, 
              marginBottom: 5, 
            }} 
        align='center'>
        Sign In
      </Button>
      <Typography sx={{ marginBottom: 5 }}>
        Don’t have an account?
          <Link>Sign Up</Link>
      </Typography>
      <Link>
        Switch to Legacy Sign In
      </Link>
    </Typography>
  )
}

const mapDispatchToProps = (dispatch) => {
  //dispatch指store.dispatch這個方法
  return {
    onFinish(value) {
      const action = LoginFormData(value)
      dispatch(action)
    }
  }
}

export default connect(null, mapDispatchToProps)(LoginForm)