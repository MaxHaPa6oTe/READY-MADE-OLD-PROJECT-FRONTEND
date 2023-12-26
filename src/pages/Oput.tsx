import React, { useEffect, useState, useContext } from "react";
import NaviBar from '../components/NavBar/NaviBar'
import { Box, Grid, Container,
    Button, CardActionArea, CardActions,
    CardContent,CardMedia,Skeleton,
    Typography,Card } from '@material-ui/core';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CommentIcon from '@mui/icons-material/Comment';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import {getAllWorks} from '../http/workAPI'
import {Context} from '../function/context'
import { postavitLike } from "../http/likeAPI";
import { useNavigate } from "react-router-dom";
import { IPOST } from "../types/types";

const Oput = () => {
  const {user} = useContext(Context)
  const [obnovit,setObnovit]=useState<boolean>(false)
  const [posts,setPosts]=useState<IPOST[] | null>(null)
  const navigate = useNavigate()

  useEffect(()=>{
    getAllWorks(user).then(o=>setPosts(o)).catch(e=>alert('ошибка на сервере'))
 },[user,obnovit])

function god(ID:number) {
  if (user) {
    postavitLike(ID,null).then(e=>{if(obnovit){
      setObnovit(false)
    } else setObnovit(true)})
  } else alert('авторизуйтесь')
}

  return (
<>
  <NaviBar/>

<Box style={{marginLeft:2, marginTop:2}}>

<Container>
<Grid container spacing={2} style={{display:'flex',justifyContent:'center'}}>
{posts?
posts.map((ppost,index) =>
<Card key={ppost.id} style={{width: 270, margin:5, background:'rgba(90,90,90,0.5)' }}>
<CardActionArea onClick={e=>navigate(`/oput/${ppost.id}`)}>
      <CardMedia
        style={{ height: 180 }}
        image={'http://localhost:3003/'+ppost.img[0]}
        title={'post'+index}
      />
      <CardContent>
        <Typography style={{color:'white'}} gutterBottom variant="h5" component="div">
          {ppost.title}
        </Typography>
        <Typography variant="body2" style={{color:'white'}} color="text.secondary">
          {ppost.text.substring(0,110)+'...'}
        </Typography>
      </CardContent>      
      </CardActionArea>
      <CardActions>
        <Button size="small" style={{color:'white'}} onClick={e=>god(ppost.id)}>
              
       {ppost.usLike?<FavoriteIcon color="error"/>
       :<FavoriteBorderIcon/>}
        {ppost.likes}
        </Button>
        <Button size="small" onClick={o=>{navigate(`/oput/${ppost.id}`);setTimeout(()=>
        window.scrollTo(0, document.body.scrollHeight),400)}}
        style={{color:'white'}}><CommentIcon/>
        {ppost.cmnt}</Button>
      </CardActions>
    </Card>
)
    
:

[1,2,3].map(()=><Card style={{width: 270,margin:5,background:'rgba(255,255,255,0.6)'}}>
        <Skeleton variant="rectangular" style={{ height: 150 }}/>
      <CardContent>
          <React.Fragment>
            <Skeleton animation="wave" height={30} width="20%" style={{ marginBottom: 10 }}/>
            <Skeleton animation="wave" height={10} style={{ marginBottom: 6 }} />
            <Skeleton animation="wave" height={10} style={{ marginBottom: 6 }} />
            <Skeleton animation="wave" height={10} style={{ marginBottom: 6 }} />
            <Skeleton animation="wave" height={10} style={{ marginBottom: 6 }} />
            <Skeleton animation="wave" height={10} width="80%" />
          </React.Fragment>
      </CardContent>
    </Card>
)

}

</Grid>
</Container>
</Box>
</>
    )
}

export default Oput