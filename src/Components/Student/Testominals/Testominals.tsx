import StarDisplay from "../Star/StarDisplay"
import './style.css'
import './responsive.css'
import Aos from 'aos'
import 'aos/dist/aos.css'; 
import { useEffect } from "react"

const reviews = [
    {
        name: 'Riya Patel',
        role: 'Frontend Developer',
        img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face',
        rating: 5,
        text: 'Went from knowing zero React to landing a job in 4 months. The project-based approach made everything click for me.',
    },
    {
        name: 'Daniel Okafor',
        role: 'CS Student',
        img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face',
        rating: 5,
        text: 'Way better than my university lectures honestly. I actually understand data structures now after taking the algorithms course here.',
    },
    {
        name: 'Megan Liu',
        role: 'UX Designer',
        img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face',
        rating: 4,
        text: 'The UI/UX design course had real client briefs which made it feel practical. Helped me build a portfolio that actually got callbacks.',
    },
    {
        name: 'Arjun Mehta',
        role: 'Backend Engineer',
        img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=face',
        rating: 5,
        text: 'Picked up Node.js and PostgreSQL from scratch. The instructor didn\'t skip over the hard parts which I really appreciated.',
    },
]

function Testominals(){
    useEffect(()=>{
        Aos.init({
            once:true,
            duration:700
        })
    },[])
    return(
        <>
        <div className="testominals-section">
            <h3 className="testominals-section-heading">What our students say</h3>
            <p className="testominals-section-sub">Real feedback from learners who took our courses</p>
            <div className="testominals-lists">
                {reviews.map((r, i) => (
                    <div className="testominals-item" data-aos="fade-up" data-aos-easing="ease-out" data-aos-delay={i * 80} key={i}>
                        <span className="quote-mark">&ldquo;</span>
                        <p className="testominal-item-feedback">{r.text}</p>
                        <div className="testominal-item-user-box">
                            <img src={r.img} alt={r.name} className="testominal-user-img" />
                            <div className="testominal-user-info">
                                <p className="testominal-item-user-name">{r.name}</p>
                                <p className="testominal-item-user-role">{r.role}</p>
                            </div>
                            <div className="testominal-stars">
                                <StarDisplay value={r.rating} />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
        </>
    )
}

export default Testominals