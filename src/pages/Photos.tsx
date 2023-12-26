import React from 'react';
import phot1 from '../components/MyPhotos/Photki (1).jpg'
import phot2 from '../components/MyPhotos/Photki (2).jpg'
import phot3 from '../components/MyPhotos/Photki (3).jpg'
import phot4 from '../components/MyPhotos/Photki (4).jpg'
import phot5 from '../components/MyPhotos/Photki (5).jpg'
import NaviBar from '../components/NavBar/NaviBar';
import Photki from '../components/MyPhotos/Photki (1)';
import {motion} from 'framer-motion'

// const anima = {
//     hidden: {
//       opacity: 0,
//     },
//     visible: (custom:any) => ({
//       opacity: 1,
//       transition: { delay: custom * 0.2 }
//     })
// }

const Photos = () => {

     return (
        <>
        <NaviBar />

        {/* <motion.section
  initial='hidden'
  whileInView='visible'
  viewport={{amount: 0.3}}
  >
        
        <div style={{
            height:'1000px',display:'flex',
            flexDirection:'column',
            marginTop:900
            }}>            
            
            <MPhotki custom={1} variants={anima} src={phot1} alt='alt' />
            {/* <MPhotki custom={2} variants={anima} src={phot2} alt='alt' />
            <MPhotki custom={3} variants={anima} src={phot3} alt='alt' />
            <MPhotki custom={4} variants={anima} src={phot4} alt='alt' />
            <MPhotki custom={5} variants={anima} src={phot5} alt='alt' /> */}
    <div className='photki'>
    <div className='photo1'>
    <Photki src={phot1} alt='alt' />
    </div>
    <div className='photo2'>
    <Photki src={phot2} alt='alt' />
    </div>
    <div className='photo3'>
    <Photki src={phot3} alt='alt' />
    </div>
    <div className='photo4'>
    <Photki src={phot4} alt='alt' />
    </div>
    <div className='photo5'>
    <Photki src={phot5} alt='alt' />
    </div>
    </div>
        </>
    )
}

export default Photos