import React from 'react'
import { Link } from "react-router-dom";
import { Typography } from "@material-ui/core";
import {Avatar,Menu,MenuItem} from '@mui/material'
import { useNavigate } from "react-router-dom";
import { Context } from '../../function/context';
import 'bootstrap/dist/css/bootstrap.min.css'
import {prosmotrUsera} from '../../http/userAPI'
import './NaviBar.css'
import { IUSER } from '../../types/types';


const NaviBar:React.FC = () => {
    const navigate = useNavigate()
    const [avs,setAvs]=React.useState<string|null>(null)
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event:React.MouseEvent<any>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };  
    const [showSidebar, setShowSidebar] = React.useState<boolean>(false)
    function toggleSidebar() {
        setShowSidebar(!showSidebar)
    }
    const {user,setUser} = React.useContext(Context)
    React.useEffect(()=>{
        if(user) prosmotrUsera(user).then((o:IUSER)=>setAvs(o.ava))
    },[user])
    
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-transparent">
        <div className="container">
            {/* logo */}
        <Link  style={{marginRight:'-16px'}}className="navbar-brand fs-4" to='/'>
            MaxПортфель</Link>
        {/* toggle button */}
        <button className="navbar-toggler shadow-none border-0" type='button'
        onClick={toggleSidebar}><span className="navbar-toggler-icon">
            </span></button>
            {/* sidebar */}
    <div className={`sidebar offcanvas offcanvas-start ${showSidebar ? 'show' : ''}`}
        tabIndex={-1} id='offcanvasNavbar' aria-labelledby="offcanvasNavbarLabel">
    {/* sidebar header */}
    <div className="offcanvas-header text-white border-bottom">
        <h5 className="offcanvas-title" id='offcanvasNavbarLabel'>MaxПортфель</h5>
        <button className="btn-close btn-close-white shadow-none"
        onClick={toggleSidebar} aria-label='Close'></button>
    </div>
    {/* navbar body */}
    <div className="offcanvas-body d-flex flex-column flex-lg-row p-4">
    {/* navbar links */}
    <ul style={{marginLeft:'16px'}} className="navbar-nav justify-content-center align-items-center fs-5 flex-grow-1 pe-3">
        <li className="nav-item mx-2 ">
            <Link  className="nav-link active" aria-current='page' to='/sait'>Сайт</Link>
        </li>
        <li className="nav-item mx-2 ">
            <Link  className="nav-link active" aria-current='page' to='/oput'>Опыт</Link>
        </li>
        <li className="nav-item mx-2 ">
            <Link  className="nav-link active" aria-current='page' to='/info'>Инфо</Link>
        </li>
        <li className="nav-item mx-2 ">
            <Link  className="nav-link active" aria-current='page' to='/photos'>Фотки</Link>
        </li>
    </ul>
    {/* login / sign out */}
    <div className="d-flex flex-column justify-content-center align-items-center
    gap-3 flex-lg-row">
        {user?
        <span style={{display:'flex',justifyContent:'center'}}>
        <Typography style={{color:'white',fontSize:18,marginTop:16,marginRight:10,marginLeft:10}}>
            Аккаунт: 
          </Typography>

          <Avatar id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
          src={avs?'http://localhost:3003/'+ avs:''} style={{marginTop:10,cursor:'pointer'}}/>:
          </span>
            :
        <>
        <Link to='/login'  className="text-white">Login</Link>
        <Link to='/reg' className="text-white decoration-none px-3 py-1 rounded-4"
        style={{backgroundColor: '#f94ca4'}}>Sign up</Link></>
        }
        <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={()=>{handleClose();navigate(`/user/${user}`)}}>Инфо</MenuItem>
        <MenuItem onClick={()=>{handleClose();localStorage.removeItem('token');setUser(null);navigate('/')}}>Выйти</MenuItem>
      </Menu>
    </div>
    </div>
    </div>
    </div>
    </nav>
    )
}

export default NaviBar