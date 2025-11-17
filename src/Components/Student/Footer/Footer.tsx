import { BsArrowRight, BsFacebook, BsInstagram, BsLinkedin, BsTwitter } from "react-icons/bs"
import './style.css'
import './responsive.css'
import logo from '../../../assets/Logo footer.png'
import 'aos/dist/aos.css'; 
import React, {  useState } from "react"

function Footer()
{
    const [email, setEmail] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubscribed, setIsSubscribed] = useState(false);



    const handleSubscribe = async (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!email) return;

        setIsSubmitting(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        setIsSubmitting(false);
        setIsSubscribed(true);
        setEmail('');
        
        // Reset success message after 3 seconds
        setTimeout(() => setIsSubscribed(false), 3000);
    };

    const categories = [
        "Web Development", "Mobile Development", "Data Science", 
        "UI/UX Design", "Digital Marketing", "Business", 
        "Photography", "Music Production"
    ];

    const resources = [
        "About Us", "Contact", "Blog", "Careers", 
        "Help Center", "Privacy Policy", "Terms of Service"
    ];

    const support = [
        "Documentation", "Forums", "Language Support", 
        "Accessibility", "Get Help", "Status"
    ];
    return(
        <>
       <footer className="footer-cont">
            {/* Brand & Newsletter Column */}
            <div className="footer-col">
                <div>
                    <img src={logo} className="footer-logo" alt="Academy Logo" />
                    <p className="footer-logo-text">
                        Study any topic, anytime. Explore thousands of courses for the lowest price ever! 
                        Start your learning journey today.
                    </p>
                </div>
                
                <div className="mt-4">
                    <h5 className="footer-subscribe-text mb-1">Stay Updated</h5>
                    <p className="footer-logo-text text-sm mb-3">
                        Get the latest courses and learning tips delivered to your inbox.
                    </p>
                    
                    <form onSubmit={handleSubscribe} className="footer-subscribe-container">
                        <input 
                            type="email" 
                            className="footer-subscribe-input" 
                            placeholder="Enter your email address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <button 
                            type="submit" 
                            className="footer-subscribe-btn"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? (
                                <div className="footer-loading"></div>
                            ) : (
                                <BsArrowRight className="footer-subscribe-icon" />
                            )}
                        </button>
                    </form>
                    
                    {isSubscribed && (
                        <p className="text-green-400 text-sm mt-2">
                            🎉 Thank you for subscribing!
                        </p>
                    )}
                    
                    <div className="footer-social">
                        <a href="#" className="footer-social-icon" aria-label="Facebook">
                            <BsFacebook />
                        </a>
                        <a href="#" className="footer-social-icon" aria-label="Twitter">
                            <BsTwitter />
                        </a>
                        <a href="#" className="footer-social-icon" aria-label="Instagram">
                            <BsInstagram />
                        </a>
                        <a href="#" className="footer-social-icon" aria-label="LinkedIn">
                            <BsLinkedin />
                        </a>
                    </div>
                </div>
            </div>

            {/* Categories Column */}
            <div className="footer-col">
                <h5 className="footer-head">Top Categories</h5>
                <div>
                    {categories.slice(0, 6).map((category, index) => (
                        <p key={index} className="footer-text">{category}</p>
                    ))}
                </div>
            </div>

            {/* Resources Column */}
            <div className="footer-col">
                <h5 className="footer-head">Resources</h5>
                <div>
                    {resources.map((resource, index) => (
                        <p key={index} className="footer-text">{resource}</p>
                    ))}
                </div>
            </div>

            {/* Support Column */}
            <div className="footer-col">
                <h5 className="footer-head">Support</h5>
                <div>
                    {support.map((item, index) => (
                        <p key={index} className="footer-text">{item}</p>
                    ))}
                </div>
            </div>

            {/* Footer Bottom */}
            <div className="footer-bottom">
                <p className="footer-copyright">
                    © {new Date().getFullYear()} Academy. All rights reserved. 
                    Made with ❤️ for learners worldwide.
                </p>
            </div>
        </footer>
        </>
    )
}
export default Footer