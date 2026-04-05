import InstructorSignUpForm from "../../Components/Instructor/InstructorSignUp/InstructorSignupForm"
import Footer from "../../Components/Student/Footer/Footer"
import Navbar from "../../Components/Student/Navbar/Navbar"

function InstructorSignup(){
    return(
        <>
        <Navbar/>
        <InstructorSignUpForm/>
        <Footer/>
        </>
    )
}

export default InstructorSignup