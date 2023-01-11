import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import OutlinedInput from '@mui/material/OutlinedInput';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import GoogleIcon from '@mui/icons-material/Google';
import InstAI from '../../icon image/instai.png'
import { RegisterFormData } from '../../store/actionCreater'

const RegisterForm = (props) => {
  const { registerFormData } = props

  const [ showPassword, setShowPassword ] = useState(false);
  const [ input, setInput ] = useState({
    username: "",
    email: "",
    password: ""
  })

  const handleClickShowPassword = () => setShowPassword((show) => !show)

  const handleMouseDownPassword = (event) => {
    event.preventDefault()
  }

  const handleChangeUserData = (e) => {
    setInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
  }

  const onSubmitUserData = (e) => {
    e.preventDefault()
    registerFormData(input)
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
      <form>
        <Typography align='left' style={{ color: 'white' }}>
          Email
        </Typography>
        <TextField
          id="email"
          name="email"
          placeholder="account@email.com"
          required='True'
          margin='normal'
          type={"email"}
          onChange={handleChangeUserData}
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
            id="password"
            name="password"
            required='True'
            type={showPassword ? 'text' : 'password'}
            onChange={handleChangeUserData}
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
        <Typography align='left' style={{ color: 'white' }}>
          Username
        </Typography>
        <TextField
          id="name"
          name="username"
          placeholder="YOUR NAME"
          required='True'
          margin='normal'
          onChange={handleChangeUserData}
          sx={{ width: 400, marginBottom: 5, border:'2px solid white' }}
          InputProps={{
            style: {
              color: 'white'
            },
          }}
        />
        <Button
          variant="contained"
          onClick={onSubmitUserData}
          sx={{
                width: 400,
                marginBottom: 5,
              }}
          align='center'
          component={Link}
          to='/CreateOrganization'
        >
          Create Your Account
        </Button>
      </form>
      <Typography sx={{ marginBottom: 5, color: 'white' }}>
        Already have an account?
        <Link to='/' style={{ color: 'yellow' }}> Sign in </Link>
      </Typography>
    </Typography>
  )
}

const mapDispatchToProps = (dispatch) => {
  //dispatch指store.dispatch這個方法
  return {
    registerFormData(data) {
      const action = RegisterFormData(data)
      dispatch(action)
    },
  }
}

export default connect(null, mapDispatchToProps)(RegisterForm)