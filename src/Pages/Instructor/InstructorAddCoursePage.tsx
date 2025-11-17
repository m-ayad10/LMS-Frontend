import InstructorAddCourse from "../../Components/Instructor/InstructorAddCourse/InstructorAddCourse"
import InstructorNavbar from "../../Components/Instructor/InstructorNavbar/InstructorNavbar"
import InstructorSideBar from "../../Components/Instructor/InstructorSideBar/InstructorSideBar"
import Footer from "../../Components/Student/Footer/Footer"

function InstructorAddCoursePage(){
    return(
        <>
        <InstructorNavbar/>
        <InstructorSideBar>
            <InstructorAddCourse/>
        </InstructorSideBar>
        <Footer/>
        </>
    )
}

export default InstructorAddCoursePage