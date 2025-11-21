import img from '../../../assets/Group 6.png'
import './style.css'
import './responsive.css'
 import Aos from 'aos'
import 'aos/dist/aos.css'; 
import { useEffect } from "react"
function Banner (){
    useEffect(()=>{
        Aos.init({
            once:true,
            duration:900
        })
    },[])
    return(
        <>
        <section className="hero-section">
            <div className="hero-content" data-aos="zoom-in" data-aos-easing="ease-in-out">
                <div className=''>
                <h1 className='hero-title'>Welcome to <span className='bg-primary'>Academy</span>  <br />
                   <span className='bg-primary'>Start</span> learning from best platform</h1>
                <p className='hero-description'>Study any topic, anytime. explore thousands of courses for the lowest price ever!</p>
                <div className='hero-stats '>
                    <div className='stat-item'>
                        <h2 className='stat-value'>8+</h2>
                        <p className='stat-label'>Happy students</p>
                    </div>
                    <div className='stat-item'>
                        <h2  className='stat-value'>6+</h2>
                        <p className='stat-label'>Quality educators</p>
                    </div>
                    <div className='stat-item'>
                        <h2  className='stat-value'>8+</h2>
                        <p className='stat-label'>Quality courses</p>
                    </div>
                </div>
                </div>
            </div>
            <div className="hero-image">
                <img src={img} alt="banner" data-aos="zoom-in" data-aos-easing="ease-in-out" className='banner-image' />
            </div>
        </section>
        </>
    )
}
export default Banner