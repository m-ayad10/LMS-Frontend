import InstructorCourses from "../../Components/Instructor/InstructorCourse/InstructorCourses"
import InstructorNavbar from "../../Components/Instructor/InstructorNavbar/InstructorNavbar"
import InstructorSideBar from "../../Components/Instructor/InstructorSideBar/InstructorSideBar"
import Footer from "../../Components/Student/Footer/Footer"

function InstructorManageCoursesPage(){
    return(
        <>
        <InstructorNavbar/>
        <InstructorSideBar>
            <InstructorCourses/>
        </InstructorSideBar>
        <Footer/>
        </>
    )
}

export default InstructorManageCoursesPage