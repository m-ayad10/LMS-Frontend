import AdminInstructors from "../../Components/Admin/AdminInstructors/AdminInstructors";
import AdminSideBar from "../../Components/Admin/AdminSidebar/AdminSidebar";
import InstructorNavbar from "../../Components/Instructor/InstructorNavbar/InstructorNavbar";
import Footer from "../../Components/Student/Footer/Footer";

function AdminInstructorPage(){
    return(
        <>
        <InstructorNavbar/>
        <AdminSideBar>
            <AdminInstructors/>
        </AdminSideBar>
        <Footer/>
        </>
    )
}

export default AdminInstructorPage