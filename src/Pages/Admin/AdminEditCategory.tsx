import EditCategory from "../../Components/Admin/AdminEditCategory/AdminEditCategory";
import AdminSideBar from "../../Components/Admin/AdminSidebar/AdminSidebar";
import InstructorNavbar from "../../Components/Instructor/InstructorNavbar/InstructorNavbar";
import Footer from "../../Components/Student/Footer/Footer";


function AdminEditCategoryPage(){
    return(
        <>
        <InstructorNavbar/>
        <AdminSideBar>
            <EditCategory/>
        </AdminSideBar>
        <Footer/>
        </>
    )
}

export default AdminEditCategoryPage