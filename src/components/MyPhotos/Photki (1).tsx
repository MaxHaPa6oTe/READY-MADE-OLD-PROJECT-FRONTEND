import * as React from 'react';
import {motion} from 'framer-motion'

interface photo {
  alt:string
  src:string
}

const anima = {
  hidden: {
    opacity: 0,
  },
  visible: (custom:any) => ({
    opacity: 1,
    transition: { delay: custom * 0.2 }
  })
}

// export const Photki = React.forwardRef<HTMLImageElement, photo>(
//   (props,ref) => {
 
const Photki:React.FC<photo> = ({alt,src}) => {
  return (
<>
  <motion.img 
  initial='hidden'
  whileInView='visible'
  viewport={{amount:0.999}}
  src={src} alt={alt} style={{width:200}}
  variants={anima}/>
  </>
  )
}

export default Photki

// export const MPhotki = motion(Photki)