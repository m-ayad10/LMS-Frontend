import img1 from '../../../assets/Group 9.png'
import img2 from '../../../assets/Group 9 (1).png'
import img3 from '../../../assets/Group 9 (2).png'
import img4 from '../../../assets/Group 9 (3).png'
import './style.css'
import './responsive.css'
import Aos from 'aos'
import 'aos/dist/aos.css'; 
import { useEffect } from 'react';

function TopInstructors(){
    useEffect(()=>{
        Aos.init({
            once:true,
            duration:700
        })
    },[])
    return(
        <>
        <div className="instructor-section">
            <h2 className="instructor-section-title">Top Instructors</h2>
            <div className="instructor-lists">
                <div className="instructor-item"  data-aos="zoom-in" data-aos-easing="ease-in-out">
                    <img src={img1} className="instructor-item-img" alt="" />
                    <h4 className="instructor-name">Albert John</h4>
                    <p className="instructor-role">Professional Film Colorist · DaVinci Resolve Trainer</p>
                </div>
                <div className="instructor-item"  data-aos="zoom-in" data-aos-easing="ease-in-out">
                    <img src={img2} className="instructor-item-img" alt="" />
                    <h4 className="instructor-name">Sarah Mitchell</h4>
                    <p className="instructor-role">Senior Web Developer · JavaScript & React Expert</p>
                </div>
                <div className="instructor-item"  data-aos="zoom-in" data-aos-easing="ease-in-out">
                    <img src={img3} className="instructor-item-img" alt="" />
                    <h4 className="instructor-name">David Peterson</h4>
                    <p className="instructor-role">Data Scientist · AI & Machine Learning Mentor</p>
                </div>
                <div className="instructor-item"  data-aos="zoom-in" data-aos-easing="ease-in-out">
                    <img src={img4} className="instructor-item-img" alt="" />
                    <h4 className="instructor-name">Emma Williams</h4>
                    <p className="instructor-role">UI/UX Designer · Figma & Design Systems Coach</p>
                </div>
            </div>
        </div>
        </>
    )
}
export default TopInstructors