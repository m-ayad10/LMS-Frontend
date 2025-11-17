import PageBanner from "../../Components/PageBanner/PageBanner";
import Footer from "../../Components/Student/Footer/Footer";
import MyCourses from "../../Components/Student/MyCourses/MyCourses";
import Navbar from "../../Components/Student/Navbar/Navbar";
import StudentSideBar from "../../Components/Student/SideBar/StudentSideBar";

function MyCoursesPage(){
    return(
        <>
        <Navbar/>
        <PageBanner/>
        <StudentSideBar>
            <MyCourses/>
        </StudentSideBar>
        <Footer/>
        </>
    )
}

export default MyCoursesPage