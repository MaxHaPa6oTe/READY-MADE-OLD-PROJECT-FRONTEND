import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import { Link } from "react-router-dom";
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import { useNavigate } from "react-router-dom";
import {login} from '../http/userAPI'


function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {' Max © '}
      Казань{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const defaultTheme = createTheme();

export default function SignInSide() {
  const [email,setEmail] =React.useState('')
  const [password,setPassword]=React.useState('')
  const [mailError,setMailError]=React.useState('')
  const [er,setEr]=React.useState<boolean>(false)

  const navigate = useNavigate()

  async function loggin() {
    if (email.length<6 || email.indexOf('@')===-1 || /[а-яА-ЯЁё]/.test(email)) {
      setMailError('некорректная почта')
      return false;
    } else {setMailError('')}

    try {
    const response = await login(email,password)     
    if (response!=="ошибка") {
    window.location.replace('/sait')
  } else {
    setEr(true)
  }
    } catch (e) {
      alert('ошибка на сервере')
  }
}
  

const keyDownHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
  if (event.code === "Enter") {
    loggin()
  }
};

  return (
    <>

    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: '100vh',display:'flex',justifyContent:'end' }}>
        <CssBaseline />

        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
         <Button style={{top:20,left:10}} onClick={()=>{
            navigate('/sait');
         }}>
            <KeyboardDoubleArrowLeftIcon/>
            Вернутся на сайт</Button>
         <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Авторизация
            </Typography>
            <Box component="form" noValidate onSubmit={(e)=>e.preventDefault()} sx={{ mt: 1 }}>
              <TextField
              onKeyDown={keyDownHandler}
                error={mailError && mailError.length ? true : false}
                margin="normal"
                required
                fullWidth
                id="email"
                inputProps={{maxLength: 60}}                  
                label="Email Address"
                name="email"
                autoFocus
                onChange={(e)=>setEmail(e.target.value)}
                helperText={mailError}
              />                
              <TextField
                onKeyDown={keyDownHandler}
                margin="normal"
                required
                fullWidth
                inputProps={{maxLength: 20}}
                name="password"
                label="Password"
                type="password"
                id="password"
                onChange={(e)=>setPassword(e.target.value)}
              />
  {er?
  <center style={{color:'red',fontSize:13,marginBottom:-17}}><i>
  Неверный логин или пароль
  </i></center>:null}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={loggin}
              >
                Sign In
              </Button>
              <Grid container sx={{display:'flex',justifyContent:'center',textAlign:'center'}}>
                  <Link to="/reg" style={{fontSize:13}}>
                    Нет аккаунта? Зарегестрируйся!
                  </Link>
              </Grid>
              <Copyright />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>

    </>
  );
}