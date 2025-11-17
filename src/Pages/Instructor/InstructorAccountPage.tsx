import InstructorAccountInformation from "../../Components/Instructor/AccountInformation/InstructorAccountInformation";
import InstructorNavbar from "../../Components/Instructor/InstructorNavbar/InstructorNavbar";
import InstructorSideBar from "../../Components/Instructor/InstructorSideBar/InstructorSideBar";
import Footer from "../../Components/Student/Footer/Footer";

function InstructorAccountPage(){
    return(
        <>
        <InstructorNavbar/>
        <InstructorSideBar>
            <InstructorAccountInformation/>
        </InstructorSideBar>
        <Footer/>
        </>
    )
}

export default InstructorAccountPage