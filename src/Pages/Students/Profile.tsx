import Footer from "../../Components/Student/Footer/Footer"
import Navbar from "../../Components/Student/Navbar/Navbar"
import PersonalInformation from "../../Components/Student/PersonalInformation/PersonalInformation"
import StudentSideBar from "../../Components/Student/SideBar/StudentSideBar"

function Profile(){
    return(
        <>
        <Navbar/>
        <StudentSideBar>
            <PersonalInformation/>
        </StudentSideBar>
        <Footer/>
        </>
    )
}

export default Profile