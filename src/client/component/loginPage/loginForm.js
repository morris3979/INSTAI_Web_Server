import React, { useState } from 'react'
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
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import GoogleIcon from '@mui/icons-material/Google';
import InstAI from '../../icon image/instai.png'
import { LoginState, LoginFormData } from '../../store/actionCreater'

const LoginForm = (props) => {

  const { loginState, loginFormData } = props

  const [showPassword, setShowPassword] = useState(false);
  const [ input, setInput ] = useState({
    email: "",
    password: ""
  })

  const handleClickShowPassword = () => setShowPassword((show) => !show)

  const handleMouseDownPassword = (event) => {
    event.preventDefault()
  }

  const handleChange = (e) => {
    setInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
  }

  const onSubmit = (e) => {
    e.preventDefault()
    loginFormData(input)
    console.log(input)
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
        Sign In
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
          align='center'>
          Continue with Google
        </Button>
        <Button
          startIcon={<VpnKeyIcon/>}
          variant="outlined"
          sx={{
                width: 400,
                marginBottom: 5,
                color: 'lightblue',
                borderColor: 'lightblue'
              }}
          align='center'>
          Continue with Enterprise SSO
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
      <form onSubmit={onSubmit}>
        <Typography align='left' color='white'>
          Email
        </Typography>
        <TextField
          id="email"
          name="email"
          placeholder="account@email.com"
          required='True'
          margin='normal'
          type={"email"}
          onChange={handleChange}
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
            <Link> (Forget Password?) </Link>
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
            id="password"
            name="password"
            required='True'
            type={showPassword ? 'text' : 'password'}
            onChange={handleChange}
            style={{ color: 'white', border:'2px solid white' }}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  style={{ color: 'white' }}
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
        <Button
          variant="contained"
          type="submit"
          sx={{
                width: 400,
                marginBottom: 5,
              }}
          align='center'
        >
          Sign In
        </Button>
      </form>
      <Typography sx={{ marginBottom: 5, color: 'white' }}>
        Don’t have an account?
        <Link
          onClick={() => {loginState(false)}}
        > Register </Link>
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
    },
    loginFormData(value) {
      const action = LoginFormData(value)
      dispatch(action)
    }
  }
}

export default connect(null, mapDispatchToProps)(LoginForm)