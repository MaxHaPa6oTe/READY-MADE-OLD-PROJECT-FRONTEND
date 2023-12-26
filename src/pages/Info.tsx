import React from "react";
import { YMaps, Map, Placemark } from "react-yandex-maps";
import NaviBar from '../components/NavBar/NaviBar';
import {Container, Grid} from '@material-ui/core';
import logo from '../photos/logoMetro.png'

const Info = () => {
    return (
        <>
        <NaviBar />

<Container style={{marginTop:12}} >
        <Grid style={{display:'flex',justifyContent:'center'}} container >
        <div style={{maxWidth:'520px'}}>
<h2 className="o-odin"><b>Где я сейчас работаю?</b></h2>
<p style={{fontSize:17,textIndent:'25px',marginTop:6,textAlign:'justify'}}>
На данный момент (03.08.2023) я работаю 
в МУП Метроэлектротрансе ведущем ижнинером - системным и сетевым администратором. В мои задачи входит 
обеспечение бесперебойной работы серверов, а также оборудования относящееся к оплате проезда.
</p>
</div>
<div>
    </div>
    <YMaps>
            <div style={{margin:20}}>
                <Map width='278px'
               defaultState={{
                    center: [55.77696483433359,49.143877197253126],
                    zoom: 16
                }}
                >
        <Placemark geometry={[55.77696483433359,49.143877197253126]} />
                </Map>
            </div>
        </YMaps>

    </Grid>


    <Grid style={{display:'flex',justifyContent:'center'}} container>
    <div style={{maxWidth:800,marginTop:10}}>
    <img src={logo} className='zapross' alt='Метро' />
    <p style={{textIndent:'25px',fontSize:17,marginTop:2,textAlign:'justify'}}>
        Работа у меня интересная, а коллектив очень дружный, поэтому я несильно спешил уходить
        от туда, но все же хочется карьерного и финансового роста, поэтому сейчас я нахожусь в 
        поисках высокооплачиваемой работы.
    </p>
    </div>
    <div style={{maxWidth:800}}>
    <h2>Опыт</h2>
    <p style={{fontSize:17,textIndent:'25px',marginTop:6,textAlign:'justify'}}>
       Помимо однолетнего опыта в веб разработки за моими плечами 
       стоит много сделанных проектировочных работ в области промышленной
       безопасности и в частности моя дипломная работа 
       "Расчет мощности и последствий различных вариантов аварий на ПАО Казаньоргсинтез".
    </p>
    </div>

</Grid>
<Grid style={{display:'flex',justifyContent:'center'}} container spacing={2}>
    
</Grid>
   </Container>
        </>
    )
}

export default Info