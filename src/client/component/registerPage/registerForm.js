
import React, { useState, useEffect } from 'react'
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
import KeyIcon from '@mui/icons-material/Key';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import GoogleIcon from '@mui/icons-material/Google';
import InstAI from '../../icon image/instai.png'
import { RegisterFormData, LogoutData } from '../../store/actionCreater'

const RegisterForm = (props) => {
  const { registerFormData, userInformation } = props

  const [ open, setOpen ] = useState(false)
  const [ showPassword, setShowPassword ] = useState(false)
  const [ input, setInput ] = useState({
    username: "",
    email: "",
    password: ""
  })

  useEffect(() => {
    Object.keys(userInformation).length > 0
    ? setOpen(true): setOpen(false)
  },[userInformation])

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

  const onSubmitUserData = async () => {
    // e.preventDefault()
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
            startAdornment={
              <InputAdornment position="start">
                <KeyIcon style={{ color: 'white' }} />
              </InputAdornment>
            }
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
            style: { color: 'white' },
          }}
        />
        <Button
          variant="contained"
          onClick={onSubmitUserData}
          sx={{ width: 400, marginBottom: 5 }}
          align='center'
        >
          CREATE ACCOUNT
        </Button>
      </form>
      <Typography sx={{ marginBottom: 5, color: 'white' }}>
        Already have an account？
        <Link to='/' style={{ color: 'lightgreen' }}>Sign in</Link>
      </Typography>
      <Dialog
        open={open}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        style={{ backgroundColor: '#444950' }}
      >
        <DialogContent style={{ backgroundColor: '#444950', width: '30vh' }}>
          <DialogContentText id="alert-dialog-description" style={{ color: 'lightgrey' }}>
            From InstAI
          </DialogContentText>
        </DialogContent>
        <DialogTitle id="alert-dialog-title" textAlign={'center'} style={{ backgroundColor: '#444950', color: 'white', width: '30vh' }}>
          {`Welcome, ${userInformation.username}`}
        </DialogTitle>
        <DialogActions style={{ backgroundColor: '#444950', color: 'lightblue' }}>
          <Button autoFocus size='small'
            variant="contained"
            component={Link}
            to={'/CreateOrganization'}
            sx={{ margin: 1 }}
          >
            next
          </Button>
        </DialogActions>
      </Dialog>
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
    registerFormData(data) {
      const action = RegisterFormData(data)
      dispatch(action)
    },
    logoutData() {
      const action = LogoutData()
      dispatch(action)
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterForm)