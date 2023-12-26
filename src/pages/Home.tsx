import React from 'react'
import NaviBar from '../components/NavBar/NaviBar';
import {kolpolz} from '../http/userAPI'
import chel from '../photos/chel24.png'
import ffon from '../photos/24.png'
import { useNavigate } from "react-router-dom";



const Home:React.FC = () => {
    // const [users,setUsers]=React.useState<number | null>(null)
    // React.useEffect(()=>{
    //     kolpolz().then(o=>setUsers(o))
    // },[])
    const navigate = useNavigate()

    React.useEffect(() => {
        if (window.innerWidth > 900) {
        const handleWindowMouseMove = (e:any) => {
            Object.assign(document.documentElement,{
                style:`
                --move-x:${(e.clientX - window.innerWidth / 2)*.005}deg;
                --move-y:${(e.clientY - window.innerHeight /2)*-.005}deg;
                `
            })
        };
        window.addEventListener('mousemove', handleWindowMouseMove);
        return () => {
          window.removeEventListener(
            'mousemove',
            handleWindowMouseMove,
          );
        };}
      }, []);

    return (
            <div className='homee'>
   
    <section className='layers'>
            <div className='layers__container'>
            <div className='layers__item layer-1' style={{backgroundImage:`url(${ffon})`}}></div>
            <div className='layers__item layer-2' style={{backgroundImage:`url(${chel})`}}></div>
            {/* <div className='layers__item layer-3'>
                    <NaviBar />
            </div> */}
            <div className='layers__item layer-4'>
            <div className="hero-content">
              <h1>Добро пожаловать!</h1>
            <div className='hero-content__p'>
              <i>на мой показательный сайт - портфолио</i>
            </div>
            <button className="button-start"
            onClick={()=>navigate('/sait')}
            >Start Learning</button>
            </div>
            </div>
            {/* <div className='layers__item layer-5'>
                 <p>
        Кол-во зарег. пользователей: {users}
        </p>
            </div> */}
            </div>
    </section>
    </div>
    )
}

export default Home