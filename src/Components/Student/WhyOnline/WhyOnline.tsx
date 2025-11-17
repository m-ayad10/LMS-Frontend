import flexibilty from '../../../assets/flexibility.png'
import accessibility from '../../../assets/accessibility.png'
import globalization from '../../../assets/globalization.png'
import costeffective from '../../../assets/cost-effective.png'
import './style.css'
import './responsive.css'
import { useEffect } from 'react'
import AOS from 'aos';
import 'aos/dist/aos.css'; 

function WhyOnline(){
    useEffect(()=>{
        AOS.init({
            once:true,
            duration:1000
        })
    },[])
    return(
        <>
        <div className='online-learning-section' >
            <h5 className='section-title '>Why learn online?</h5>
            <div className="benefits-list">
                <div className="benefit-item" data-aos="zoom-in" data-aos-easing="ease-in-out" >
                    <img src={flexibilty} alt="" className='benefit-img' />
                    <p className='benefit-text'>Flexibility in scheduling and learning at your own pace.</p>
                </div>
                <div className="benefit-item" data-aos="zoom-in" data-aos-easing="ease-in-out" >
                    <img src={accessibility} alt="" className='benefit-img' />
                    <p className='benefit-text'>Convenient access from anywhere with an internet connection.</p>
                </div>
                <div className="benefit-item" data-aos="zoom-in" data-aos-easing="ease-in-out" >
                    <img src={globalization} alt="" className='benefit-img' />
                    <p className='benefit-text'>Opportunity for global networking and collaboration with peers worldwide.</p>
                </div>
                <div className="benefit-item" data-aos="zoom-in" data-aos-easing="ease-in-out" >
                    <img src={costeffective} alt="" className='benefit-img' />
                    <p className='benefit-text'>Cost-effective compared to traditional in-person education.</p>
                </div>
            </div>
        </div>
        </>
    )
}
export default WhyOnline