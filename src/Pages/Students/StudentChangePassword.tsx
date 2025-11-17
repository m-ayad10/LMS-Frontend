import StudentAccountInformation from "../../Components/Student/AccountInformation/StudentAccount"
import Footer from "../../Components/Student/Footer/Footer"
import Navbar from "../../Components/Student/Navbar/Navbar"
import StudentSideBar from "../../Components/Student/SideBar/StudentSideBar"

function StudentChangePassword(){
    return(
        <>
        <Navbar/>
        <StudentSideBar>
            <StudentAccountInformation/>
        </StudentSideBar>
        <Footer/>
        </>
    )
}

export default StudentChangePassword