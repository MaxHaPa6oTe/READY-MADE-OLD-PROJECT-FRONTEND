import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import { Link } from "react-router-dom";
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import { useNavigate } from "react-router-dom";
import {registration, otpravkaPisma, poiskUsPocht, provekraKoda} from '../http/userAPI'
import { enqueueSnackbar } from 'notistack';
import Stepper from '../components/Stepper'
import TrendingFlatIcon from '@mui/icons-material/TrendingFlat';

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center" >
      {'Max © Казань'}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}


let regex = /[\d|,|.|e|E|\+]+/g;

const defaultTheme = createTheme();

export default function SignUp() {
const [antiSpam,setAntiSpam]=React.useState<string>('')
const [shagOd,setShagOd]=React.useState<string>('block')
const [shagDv,setShagDv]=React.useState<string>('none')
const [email,setEmail] =React.useState<string>('')
const [password,setPassword]=React.useState<string>('')
const [name,setName]=React.useState<string>('')
const [years,setYears]=React.useState<number>(0)
const [avata,setAvata]=React.useState<File | null>(null)
const [mailError,setMailError]=React.useState<string>('')
const [pswrdError,setPswrdError]=React.useState<string>('')
const [nameError,setNameError]=React.useState<string>('')
const [yearsError,setYearsError]=React.useState<string>('')
const [kod,setKod]=React.useState<string>('')
const [kodErr,setKodErr]=React.useState<boolean>(false)
const formData = new FormData()

 const handleFileInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
          setAvata(event.target.files[0]);
        }
      };
    
      const keyDownHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.code === "Enter") {
          registr()
        }
      };
      

 async function registr() {
  if (email.length<6 || email.indexOf('@')===-1 || /[а-яА-ЯЁё]/.test(email)) {
    setMailError('некорректная почта')
    return false;
  } else {setMailError('')}

try {
if (!antiSpam || antiSpam !== email) {
  const poisk = await poiskUsPocht(email)
  if (poisk === 'Данная почта уже занята') {
    setMailError('Эта почта уже занята')
    return false
  } if (poisk === 'Good') {
    setMailError('')
    const zapolnenie = await otpravkaPisma(email)
    console.log(zapolnenie)
    console.log(zapolnenie)
if (zapolnenie==='Письмо отправлено') {
  setAntiSpam(email)
  enqueueSnackbar('Письмо отправлено на указанную почту',
  {variant:'success'});return false
} else {
  enqueueSnackbar('хостинг не позволяет подключаться к SMTP-серверам',{variant:'warning'});return false
}}} } catch (e) {
  enqueueSnackbar('что-то пошло не так',{variant:'warning'});return false
}}

async function dalee() {
      if (name.length<2) {
        setNameError('Введите имя')
        return false;
      } else {setNameError('')}
      if (name.match(regex)) {
        setNameError('Уберите цифры')
        return false;
      } else {setNameError('')}
      if (String(years).length<2 || years<14 || years>70) {
        setYearsError('Укажите свой возраст')
        return false;
      } else {setYearsError('')}
      if (email.length<6 || email.indexOf('@')===-1 || /[а-яА-ЯЁё]/.test(email)) {
        setMailError('некорректная почта')
        return false;
      } else {setMailError('')}
      if (password.length<5) {
        setPswrdError('минимум 5 символов')
        return false;
      } else {setPswrdError('')}
    
      try {
        const poisk = await poiskUsPocht(email)
        if (poisk === 'Данная почта уже занята') {
          setMailError('Эта почта уже занята')
          return false
        } if (poisk === 'Good') {
          setMailError('')
        } else {
          enqueueSnackbar('возникла ошибка',{variant:'warning'})
          return false
        }
    
    setShagOd('none')
    setShagDv('block')
} catch (e) {
  enqueueSnackbar('что-то пошло не так', {variant:'warning'})
  return false
}}

async function podtverditPocht() {
if (kod.length<4) {
  setKodErr(true)
  return false;
  } else {setKodErr(false)}
  try {
  const go = await provekraKoda(email,kod)
  if (go !== 'Успешно') {
    enqueueSnackbar('Не удается подтвердить почту',{variant:'warning'})
  return false
  } else {
    formData.append('email',email)
     formData.append('password',password)
     formData.append('name',name)
     formData.append('years',String(years))
     if(avata!==null){formData.append('ava',avata as Blob)} 
    const response = await registration(formData)
 if (response) {
  navigate('/sait')
} else {
  enqueueSnackbar('непредвиденная ошибка',{variant:'warning'})
  return false
}
  } 
} catch (e) {
  enqueueSnackbar('что-то пошло не так',{variant:'warning'});return false
}
}
  const navigate = useNavigate()
  const min = 14;
  const max = 70;

  return (
    <>
    
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Button style={{top:20,left:10,position:'absolute'}} onClick={()=>{
            navigate('/sait');
         }}><KeyboardDoubleArrowLeftIcon/>Вернутся на сайт</Button>
        <Box
          sx={{
            marginTop: 10,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <div style={{display:'flex',justifyContent:'center',marginBottom:-20,marginLeft:-48}}>
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5" style={{marginTop:12}}>
            Регистрация
          </Typography>
          </div>
          <Stepper shag={shagOd==='block'?0:1}/>

          
           <Box component="form" noValidate onSubmit={(e)=>e.preventDefault()} sx={{ mt: 3, display:`${shagOd}`}}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  error={nameError && nameError.length ? true : false}
                  name="name"
                  required
                  fullWidth
                  inputProps={{maxLength: 18}}                  
                  id="Name"
                  label="Ваше имя"
                  helperText={nameError}
                  onChange={(e)=>setName(e.target.value)}
                  onKeyDown={keyDownHandler}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
              <TextField
          error={yearsError && yearsError.length ? true : false}
          name="years"
          id="outlined-number"
          required 
          label="Сколько вам лет"
          type="number"
          fullWidth
          inputProps={{ min, max }}
          helperText={yearsError}
          onChange={(e)=>setYears(Number(e.target.value))}
          onKeyDown={keyDownHandler}
          />
              </Grid>
              <Grid item>
              <Typography sx={{mt:'-5px'}}>Добавьте себе аватарку:</Typography>
              <input type='file' onChange={handleFileInputChange} style={{width:'90%'}}/>
              </Grid>
              <Grid item xs={12} sx={{display:'flex',justifyContent:'space-between'}}>
                <TextField
                  error={mailError && mailError.length ? true : false}
                  required
                  fullWidth
                  inputProps={{maxLength: 60}}                  
                  id="email"
                  label="Почта"
                  name="email"   
                  onKeyDown={keyDownHandler}
                  helperText={mailError  || 'Нужно подтверждение'}
                  onChange={(e)=>setEmail(e.target.value)}
                  /><Button onClick={()=>registr()} sx={{float:'right',height:56,p:0}}>Отправ. письмо</Button>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  error={pswrdError && pswrdError.length ? true : false}
                  required
                  fullWidth
                  inputProps={{maxLength: 18}}                  
                  name="password"
                  label="Пароль для входа на сайт"
                  type="password"
                  id="password"
                  onKeyDown={keyDownHandler}
                  helperText={pswrdError}
                  onChange={(e)=>setPassword(e.target.value)}
                  />
              </Grid>
              
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 2, mb: 2 }}
              onClick={()=>dalee()}>
              Далее<TrendingFlatIcon/>
            </Button>
            <Grid container justifyContent="center">
              <Grid item >
                <Link to='/login' style={{fontSize:13}}>
                  Есть аккаунт? Авторизуйся!
                </Link>
              </Grid>
            </Grid>
          </Box>

          <Box sx={{mt:5, display:`${shagDv}`}}>
            <p style={{marginBottom:26,textAlign:'justify'}}>
              Чтобы завершить регистрацию введите код отправленный на
              вашу почту:</p>
            <center>
            <TextField 
            name="kod"
            required
            error={kodErr}                  
            inputProps={{maxLength: 20,style: { textAlign: 'center' }}}
            onChange={(e)=>setKod(e.target.value)}
            />
              </center>
            <div style={{display:'flex',marginTop:30,marginBottom:10,justifyContent:'space-between'}}>
              <Button onClick={()=>{setShagOd('block');setShagDv('none')}}>
                назад
              </Button>
              <Button onClick={()=>podtverditPocht()}>
                подтвердить
              </Button>
            </div>
              </Box>

        {/* {zagrzka?
              <center style={{marginTop:70}}>
          <Typography mb={3}>Идет отправка письма...</Typography>
      <CircularProgress />
    </center>:null} */}

        </Box>
        <Copyright />
      </Container>
    </ThemeProvider>
 </>
  );
}