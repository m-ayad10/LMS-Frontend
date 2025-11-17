import AddCategory from "../../Components/Admin/AddNewCategory/AdminNewCategory"
import AdminSideBar from "../../Components/Admin/AdminSidebar/AdminSidebar"
import InstructorNavbar from "../../Components/Instructor/InstructorNavbar/InstructorNavbar"
import Footer from "../../Components/Student/Footer/Footer"


function AdminAddNewCategoryPage(){
    return(
        <>
        <InstructorNavbar/>
        <AdminSideBar>
            <AddCategory/>
        </AdminSideBar>
        <Footer/>
        </>
    )
}

export default AdminAddNewCategoryPage