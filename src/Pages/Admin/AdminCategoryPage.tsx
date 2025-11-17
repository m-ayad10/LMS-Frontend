import AdminCategory from "../../Components/Admin/AdminCategory/AdminCategory";
import AdminSideBar from "../../Components/Admin/AdminSidebar/AdminSidebar";
import InstructorNavbar from "../../Components/Instructor/InstructorNavbar/InstructorNavbar";
import Footer from "../../Components/Student/Footer/Footer";


function AdminCategoryPage(){
    return(
        <>
        <InstructorNavbar/>
        <AdminSideBar>
            <AdminCategory/>
        </AdminSideBar>
        <Footer/>
        </>
    )
}

export default AdminCategoryPage