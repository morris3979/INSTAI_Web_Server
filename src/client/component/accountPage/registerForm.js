import React from 'react'
import { connect } from 'react-redux'
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import OutlinedInput from '@mui/material/OutlinedInput';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Visibility from '@mui/icons-material/Visibility';
import GoogleIcon from '@mui/icons-material/Google';
import InstAI from '../../icon image/instai.png'
import { LoginState } from '../../store/actionCreater'

const RegisterForm = (props) => {

  const { loginState } = props;

  return (
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
        Create Your Account
      </Typography>
      <div style={{marginBottom:'5px'}}>
        <Button
          startIcon={<GoogleIcon/>}
          variant="outlined"
          sx={{
                width: 400,
                marginBottom: 2,
                color: 'lightblue',
                borderColor: 'lightblue'
              }}
          align='center'
        >
          Continue with Google
        </Button>
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
        style={{ marginBottom: 5, color: 'white' }}
      >
        or
      </Divider>
      <Typography align='left' style={{ color: 'white' }}>
        Email
      </Typography>
      <TextField
        id="input-with-icon-textfield"
        placeholder="account@email.com"
        margin='normal'
        sx={{ width: 400, marginBottom: 5, border:'2px solid white' }}
        InputProps={{
          style: {
            color: 'white'
          },
          startAdornment: (
            <InputAdornment position="start">
              <AccountCircle style={{ color: 'white' }} />
            </InputAdornment>
          ),
        }}
      />
      <div>
        <Typography align='left' color='white'>
          Password
        </Typography>
      </div>
      <FormControl
        sx={{
              width: 400,
              marginBottom: 5,
            }}
        variant="outlined"
        margin='normal'>
        <OutlinedInput
          id="outlined-adornment-password"
          style={{ color: 'white', border:'2px solid white' }}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                style={{ color: 'white' }}
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
        Create Your Account
      </Button>
      <Typography sx={{ marginBottom: 5, color: 'white' }}>
        Already have an account?
          <Link
            onClick={() => {loginState(true)}}
          > Sign in </Link>
      </Typography>
    </Typography>
  )
}

const mapDispatchToProps = (dispatch) => {
  //dispatch指store.dispatch這個方法
  return {
    loginState(text) {
      const action = LoginState(text)
      dispatch(action)
    }
  }
}

export default connect(null, mapDispatchToProps)(RegisterForm)