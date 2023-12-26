import NaviBar from '../components/NavBar/NaviBar'
import Avatar from '@material-ui/core/Avatar';
import * as React from 'react';
import {Button, CircularProgress, Grid, Typography} from '@material-ui/core';
import { useNavigate, useParams } from "react-router-dom";
import { prosmotrUsera, ismenAva } from '../http/userAPI'
import {Context} from '../function/context'
import { enqueueSnackbar } from 'notistack';
import { IUSER } from '../types/types';

const User = () => {
    const [prUser,setPrUser]=React.useState<IUSER|null>(null)
    const [none,setNone]=React.useState<string>('none')
    const param = useParams()
    const [avat,setAvat]=React.useState<File|undefined>(undefined)
    const formDat = new FormData()
    const {user} = React.useContext(Context)
    const navigate = useNavigate()

    React.useEffect(()=>{
        let idd=param.id
        var reg = /^\d+$/;
        if (reg.test(String(idd))){
        prosmotrUsera(Number(idd)).then(o=>setPrUser(o))
        }else{alert("Не балуйтесь с адресной строкой!");
        navigate('/')
    }
    },[param])

    const handleFileInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
          setAvat(event.target.files[0]);
        }
      };

   async function ismAva() {
        if (none === 'none') {
            setNone('block')
        } else {
            if (avat!==undefined) {
            formDat.append('id',user)
            formDat.append('ava',avat as Blob)
            const smena = await ismenAva(formDat)
            if (smena !== 'ошибка') {
                window.location.reload();
            } else {
                enqueueSnackbar('что-то пошло не так',{variant:'warning'});
                return false
            }
            }
        }
    }
    return (
        <>
        <NaviBar />
        <center style={{marginTop:50}}>
       <h4 style={{color:'#00FFFF'}}>Информация о пользователе:</h4>
        </center>
        {prUser?<>
        <Grid container style={{display:'flex',justifyContent:'center',marginTop:20}}>
<Grid item style={{padding:10}}>
      <center style={{color:'white'}}>
      <Avatar alt={prUser.name} src={'http://localhost:3003/'+ prUser.ava} style={{width:230,height:230}}/>
      {user===prUser.id?<>
        <input onChange={handleFileInputChange} 
        style={{marginTop:15,width:'90%',display:`${none}`}}type='file'/><br/>
        <Button variant='contained' style={{marginTop:-20}} onClick={()=>ismAva()} color='secondary'>Изменить аватарку</Button>
        </>:null}
    </center>
</Grid>
<Grid item style={{marginTop:10,padding:10}}>
      <div style={{wordWrap:'break-word',width:230}}>
        <i style={{color:'#00FFFF'}}>Role:</i><br/>
        <b style={{fontSize:18,color:'white'}}>{' '+prUser.role}</b><br/>       
         <i style={{color:'#00FFFF'}}>Name:</i><br/>
        <h5 style={{color:'white'}}>{prUser.name}</h5>
        <i style={{color:'#00FFFF'}}>Возраст:</i><br/>
        <b style={{fontSize:18,color:'white'}}>{' '+prUser.years}</b><br/>
        <i style={{color:'#00FFFF'}}>Почта:</i><br/>
        <h6 style={{color:'white',marginBottom:-14}}>{prUser.email}</h6><br/>
        <i style={{color:'#00FFFF'}}>Дата регистрации:</i><br/>
        <h5 style={{color:'white'}}>{String(prUser.createdAt).slice(0,10)}</h5>
      </div> 
</Grid>
    </Grid>
    </>
    :
        <center style={{marginTop:70}}>
          <Typography mb={3}>Идет загрузка...</Typography>
      <CircularProgress />
    </center>
    }
        </>
    )
}

export default User