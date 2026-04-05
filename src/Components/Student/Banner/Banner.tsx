import './style.css'
import './responsive.css'
import Aos from 'aos'
import 'aos/dist/aos.css'; 
import { useEffect } from "react"
import { Link } from 'react-router-dom'
import heroImg from '../../../assets/Group 6.png'

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
            <div className="hero-inner">
                <div className="hero-text" data-aos="fade-right" data-aos-easing="ease-out">
                    <h1 className='hero-title'>Build skills that actually <span className='highlight'>matter</span></h1>
                    <p className='hero-description'>Get access to thousands of courses taught by real-world experts in development, design, business and more.</p>
                    <Link to='/courses'><button className='hero-cta'>Explore Courses</button></Link>
                </div>
                <div className="hero-image" data-aos="fade-left" data-aos-easing="ease-out" data-aos-delay="150">
                    <img src={heroImg} alt="Students learning" />
                </div>
            </div>
        </section>
        </>
    )
}
export default Banner