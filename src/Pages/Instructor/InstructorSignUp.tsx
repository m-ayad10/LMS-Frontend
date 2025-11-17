import InstructorNavbar from "../../Components/Instructor/InstructorNavbar/InstructorNavbar"
import InstructorSignUpForm from "../../Components/Instructor/InstructorSignUp/InstructorSignupForm"
import Footer from "../../Components/Student/Footer/Footer"

function InstructorSignup(){
    return(
        <>
        <InstructorNavbar/>

        <InstructorSignUpForm/>
        <Footer/>
        </>
    )
}

export default InstructorSignup