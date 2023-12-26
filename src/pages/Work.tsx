import React, { useEffect,useState,useContext } from "react";
import NaviBar from '../components/NavBar/NaviBar';
import {Card,CardContent,Button,
  Typography,Skeleton} from '@material-ui/core';
import CommentIcon from '@mui/icons-material/Comment';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import {TextField,Avatar,Box} from '@mui/material'
import CircularProgress from '@material-ui/core/CircularProgress';
import Slaider from '../components/Slaider';
import {getOneWork} from '../http/workAPI'
import {Context} from '../function/context'
import { Link, useNavigate, useParams } from "react-router-dom";
import { indigo } from '@mui/material/colors';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { postavitLike } from "../http/likeAPI";
import {pokazKomments, deleteCmnt, createCmnt} from '../http/commentsAPI'
import { enqueueSnackbar } from 'notistack';
import { IComment, IPOST } from "../types/types";


const theme = createTheme({
  palette: {
    primary: indigo,
  },
});

const Work = () => {
  const [post,setPost]=useState<IPOST | null>(null)
  const {user} = useContext(Context)
  const idWork = useParams()
  const [obnovit,setObnovit]=useState<boolean>(false)
  const [comments,setComments]=useState<IComment[] | null>(null)
  const [limit,setLimit]=useState<number>(3)
  const [otzuv,setOtzuv]=useState<string>('')
  const [otzuvError,setOtzuvError]=useState<string>('')
  const navigate = useNavigate()

  function delCmnt(id:number) {
    let x = window.confirm('Хотите удалить свой комментарий?')     
    if (x) {
      deleteCmnt(id).then(o=>{if(obnovit){
        setObnovit(false)
      } else setObnovit(true)})
    } else return false
  }

  function dobavOtzuv(text:string,workId:number) {
    if (otzuv.length<3) {
      setOtzuvError('Слишком коротко')
      return false;
    } else {setOtzuvError('')}
    if (otzuv.length>200) {
      setOtzuvError('Сократите текст')
      return false;
    } else {setOtzuvError('')}

      createCmnt(user,text,workId).then(e=>{if(obnovit){
        setObnovit(false)
      } else {setObnovit(true)}
      setOtzuv('')
      if (e) setTimeout(()=>enqueueSnackbar('Комментарий оставлен',
      {variant:'success'}),500)
    })
  }

  function likePost(idWork:number,idCmnt:number|null) {
    if (user) {
      postavitLike(idWork,idCmnt).then(e=>{if(obnovit){
        setObnovit(false)
      } else setObnovit(true)})
    } else alert('авторизуйтесь')
  }

  useEffect(()=>{
    try {
      let idd = String(idWork.id)
      var reg = /^\d+$/;
      if (reg.test(idd)){
    getOneWork(user,Number(idd)).then(o=>setPost(o))
    pokazKomments(user,Number(idWork.id),limit).then(o=>setComments(o!))
    }else{alert("Не балуйтесь с адресной строкой!")
    navigate('/')
  }
  } catch (e) {
      alert('ошибка на сервере')
    }
  },[user,obnovit,limit])


    return (
      <ThemeProvider theme={theme}>

<NaviBar/>


<div style={{maxWidth: '700px',left:0,right:0,margin:'auto'}}>

{post?
<div>
<Card style={{margin:1, border:'1px #808080 solid',background:'rgba(90,90,90,0.5)'}}>

      <Slaider image={post.img}/>
      <CardContent style={{marginTop:-44}}>
        <Typography style={{color:'white'}} gutterBottom 
        variant="h5" component="div">
          {post.title}
        </Typography>
        <Typography variant="body2" style={{color:'white'}} color="text.secondary">
          {post.text}
        </Typography>
      </CardContent>      
        <div style={{display:'flex',justifyContent:'space-between'}}>
          <div style={{marginBottom:5}}>
        <Button size="small" style={{color:'white'}} onClick={e=>likePost(post.id,null)}>
          {post.usLike?
          <FavoriteIcon color="error"/>:<FavoriteBorderIcon/>}
          {post.likes}
          </Button>
        <Button size="small" disabled style={{color:'white'}}>
          <CommentIcon/>{post.cmnt}</Button> 
          </div>
          <div>
          <span style={{color:'#A9A9A9',marginRight:15}}>{post.createdAt?.slice(0,10)}</span>
        </div>
        </div>
      
    </Card>
   

<Box component="form" noValidate onSubmit={e=>e.preventDefault()}>
<TextField sx={{mt:2,
background:'rgba(90,90,90,0.5)',borderRadius:2}}
          inputProps={{ style: { color: "white" } }}
          id="filled-textarea"
          error={otzuvError && otzuvError.length ? true : false}
          label=""
          placeholder="Критикуй или хвали)"
          multiline
          fullWidth
          variant="outlined"
          helperText={otzuvError}
          value={otzuv}
          onChange={(e)=>setOtzuv(e.target.value)}
        />

    <div style={{marginBottom:30,display:'flex',justifyContent:'end'}}>
      <div style={{maxWidth: '700px'}}>
        <Button disableElevation color="primary"
        onClick={()=>dobavOtzuv(otzuv,Number(idWork.id))}>Отправить</Button></div>
    </div>
    </Box>
    </div>
:

    <Card style={{background:'rgba(255,255,255,0.6)'}}>
        <Skeleton style={{ height:300 }} variant="rectangular"/>
      <CardContent>
          <React.Fragment>
            <Skeleton animation="wave" height={20} width="20%" style={{ marginBottom: 6 }}/>
            <Skeleton animation="wave" height={10} style={{ marginBottom: 6 }} />
            <Skeleton animation="wave" height={10} width="80%" />
          </React.Fragment>
      </CardContent>
    </Card>
}


{comments?
comments.map((com,index) =>
    <div className='krestVisible' key={index} style={{marginBottom:10,wordWrap:'break-word'}}>
      <div style={{display:'flex',marginBottom:-6,marginTop:12,justifyContent:'space-between'}}>
      <div style={{display:'flex',justifyContent:'start'}}>
      <Link to={`/user/${com.userId}`}  style={{ textDecoration: 'none' }}>
      <Avatar alt={com.avtor[0]} src={'http://localhost:3003/'+com.avtor[2]}/>
      </Link>
      <Typography style={{margin:8,color:'white'}}>{com.avtor[0]+' '+com.avtor[1]}</Typography>
      </div>
      <div style={{margin:8,color:'#A9A9A9'}}>{com.createdAt?.slice(0,16).replace('T','  ')}</div>
      </div>
      <div style={{border:'1px #808080 solid',borderRadius:'4px',
    marginTop:8,padding:8,color:'white'}}>
      {user===com.userId?
        <span className='krest' style={{float:'right',cursor:'pointer',marginTop:-8,color:'#A9A9A9'}}
        onClick={()=>delCmnt(com.id)}>X</span>
        :null}       
       <Typography>
        {com.text}
        </Typography>
        <div style={{display:'flex',justifyContent:'end'}}>
        <Button size="small" onClick={()=>likePost(post!.id,com.id)} style={{color:'white'}}>
        {com.usLike?<FavoriteIcon color="error"/>
       :<FavoriteBorderIcon/>}
        {com.likes}
          </Button>
        </div>
      </div>
</div>
):
<center style={{marginTop:50}}>
    <CircularProgress/>
    </center>
}
{post && limit<post.cmnt?
<center>
<Button variant="contained" style={{marginBottom:10}} onClick={()=>setLimit(limit + 3)}>Показать еще?</Button></center>
:null}

</div>
    


</ThemeProvider>
    )
}

export default Work