import StarDisplay from "../Star/StarDisplay"
import img1 from '../../../assets/banner-man-2.png'
import img2 from '../../../assets/banner-man-1.png'
import img3 from '../../../assets/banner-man-3.png'
import img4 from '../../../assets/banner-man-4.png'
import './style.css'
import './responsive.css'
 import Aos from 'aos'
import 'aos/dist/aos.css'; 
import { useEffect } from "react"


function Testominals(){
    useEffect(()=>{
        Aos.init({
            once:true,
            duration:700
        })
    })
    return(
        <>
        <div className="testominals-section">
    <h3 className="testominals-section-heading">What our students say about our courses</h3>
    <div className="testominals-lists my-4">
        <div className="testominals-item" data-aos="zoom-in" data-aos-easing="ease-in-out">
            <div className="testominal-item-user-box">
                <img src={img1} alt="user profile" className="testominal-user-img" />
                <div className="testominal-user-info">
                    <p className="testominal-item-user-name">Sarah Johnson</p>
                    <StarDisplay value={5} />
                </div>
            </div>
            <p className="testominal-item-feedback">This course completely transformed my understanding of JavaScript. The instructor explains complex concepts in such a simple way. Highly recommended!</p>
        </div>
        <div className="testominals-item" data-aos="zoom-in" data-aos-easing="ease-in-out">
            <div className="testominal-item-user-box">
                <img src={img2} alt="user profile" className="testominal-user-img" />
                <div className="testominal-user-info">
                    <p className="testominal-item-user-name">Mike Chen</p>
                    <StarDisplay value={4} />
                </div>
            </div>
            <p className="testominal-item-feedback">Great course structure and practical examples. The projects helped me build a solid portfolio. Would love more advanced content!</p>
        </div>
        <div className="testominals-item" data-aos="zoom-in" data-aos-easing="ease-in-out">
            <div className="testominal-item-user-box">
                <img src={img3} alt="user profile" className="testominal-user-img" />
                <div className="testominal-user-info">
                    <p className="testominal-item-user-name">Emma Davis</p>
                    <StarDisplay value={5} />
                </div>
            </div>
            <p className="testominal-item-feedback">As a complete beginner, I found this course incredibly helpful. The step-by-step approach made learning so much easier. Thank you!</p>
        </div>
        <div className="testominals-item" data-aos="zoom-in" data-aos-easing="ease-in-out">
            <div className="testominal-item-user-box">
                <img src={img4} alt="user profile" className="testominal-user-img" />
                <div className="testominal-user-info">
                    <p className="testominal-item-user-name">Alex Rodriguez</p>
                    <StarDisplay value={5} />
                </div>
            </div>
            <p className="testominal-item-feedback">The quality of content exceeded my expectations. The real-world projects and coding exercises were exactly what I needed to advance my career.</p>
        </div>
    </div>
</div>
        </>
    )
}

export default Testominals