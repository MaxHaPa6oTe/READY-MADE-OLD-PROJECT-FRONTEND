import React from 'react';
import { Routes, Route,useLocation } from 'react-router-dom';
import img1 from './photos/24.png'
import img2 from './photos/Nav2.jpg'
import img3 from './photos/Nav3.jpg'
import img4 from './photos/Nav4.jpg'
import img5 from './photos/Nav5.jpeg'
import img6 from './photos/Nav6.1.jpg'
import img7 from './photos/7.avif'
import img8 from './photos/8.jpg'
import { SmenaFona } from './function/SmenaFona';
import {Context} from './function/context'
import { SnackbarProvider } from 'notistack';
import Home from './pages/Home';
import Error from './pages/Error'
import Info from './pages/Info'
import Photos from './pages/Photos'
import Sait from './pages/Sait'
import Login from './pages/Login'
import Reg from './pages/Reg'
import Oput from './pages/Oput'
import CircularProgress from '@material-ui/core/CircularProgress';
import { check } from './http/userAPI';
import Work from './pages/Work'
import User from './pages/User';
import { ParallaxProvider } from 'react-scroll-parallax';


function App() {
  const [user,setUser]=React.useState<number|null>(null)
  const [loading,setLoading]=React.useState<boolean>(true)
  const location = useLocation();
  const smenaFona0 = () => {
  let url = window.location.pathname
 if (url === '/') {
  SmenaFona(img1,'rgba(0,0,0,0.3)','center')
 }
 if (url === '/oput' || 
 url === `/oput/${(url.match(/\d+$/))}`
 ) {
  SmenaFona(img2,'rgba(0,0,0,0.3)','top')
 }
 if (url === '/info') {
  SmenaFona(img3,'rgba(0,0,0,0.3)','center')
 }
 if (url === '/photos') {
  SmenaFona(img4,'','right')
 }
 if (url === '/login') {
  SmenaFona(img5,'','center')
 }
 if (url === '/reg') {
  SmenaFona(img6,'','50%')
 }//через switch чет не пошло
 if (url === '/sait') {
  SmenaFona(img7,'rgba(0,0,0,0.3)','center')
 }
 if (url === '/user' ||
 url === `/user/${(url.match(/\d+$/))}`) {
  SmenaFona(img8,'rgba(0,0,0,0.1)','center')
 }
}
React.useEffect(()=>{
  smenaFona0()
   },[location])

React.useEffect(()=>{
    check().then(data=>{
      if (data !== 'ошибка') {
        setUser(data)
      }
    })
      .finally(()=>setLoading(false))
  },[])
  
    if (loading) {
      return (
        <center style={{marginTop:300}}>
        <CircularProgress />
      </center>
      )
    }
  
  return (
    <ParallaxProvider>

    <Context.Provider value={{user,setUser}}>
  <SnackbarProvider maxSnack={3}
    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
    />
   <Routes>
      <Route path='/' element={<Home />}/>
      <Route path='/oput' element={<Oput />}/>
      <Route path='/info' element={<Info />}/>
      <Route path='/photos' element={<Photos />}/>
      <Route path='/sait' element={<Sait />}/>
      <Route path='/login' element={<Login />}/>
      <Route path='/reg' element={<Reg />}/>
      <Route path='oput/:id' element={<Work />}/>
      <Route path='/user/:id' element={<User />}/>
      <Route path='*' element={<Error />}/>
    </Routes>
    </Context.Provider>
    </ParallaxProvider>

  );
}

export default App;
