import './style.css'
import './responsive.css'
import Aos from 'aos'
import 'aos/dist/aos.css'; 
import { useEffect } from 'react';

const instructors = [
    {
        name: "Priya Sharma",
        role: "Full Stack Developer · MERN Stack Specialist",
        avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&h=300&fit=crop&crop=face",
    },
    {
        name: "James Carter",
        role: "Cloud Architect · AWS & DevOps Instructor",
        avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=300&h=300&fit=crop&crop=face",
    },
    {
        name: "Aisha Khan",
        role: "Product Designer · UX Research & Prototyping",
        avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&h=300&fit=crop&crop=face",
    },
    {
        name: "Marcus Lee",
        role: "Mobile Developer · React Native & Flutter Coach",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face",
    },
];

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
                {instructors.map((inst) => (
                    <div className="instructor-item" key={inst.name} data-aos="zoom-in" data-aos-easing="ease-in-out">
                        <img src={inst.avatar} className="instructor-item-img" alt={inst.name} />
                        <h4 className="instructor-name">{inst.name}</h4>
                        <p className="instructor-role">{inst.role}</p>
                    </div>
                ))}
            </div>
        </div>
        </>
    )
}
export default TopInstructors