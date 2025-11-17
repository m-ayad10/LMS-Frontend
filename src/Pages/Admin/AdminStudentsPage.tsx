import AdminSideBar from "../../Components/Admin/AdminSidebar/AdminSidebar";
import AdminStudents from "../../Components/Admin/AdminStudents/AdminStudents";
import InstructorNavbar from "../../Components/Instructor/InstructorNavbar/InstructorNavbar";
import Footer from "../../Components/Student/Footer/Footer";

function AdminStudentsPage(){
    return(
        <>
        <InstructorNavbar/>
        <AdminSideBar>
            <AdminStudents/>
        </AdminSideBar>
        <Footer/>
        </>
    )
}

export default AdminStudentsPage