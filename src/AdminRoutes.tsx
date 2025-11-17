import { Route, Routes } from "react-router-dom"
import AdminDashboard from "./Pages/Admin/AdminDashboardPage"
import AdminAccountPage from "./Pages/Admin/AdminAccountPage"
import AdminStudentsPage from "./Pages/Admin/AdminStudentsPage"
import AdminInstructorPage from "./Pages/Admin/AdminInstructorsPage"
import { AdminProtectedRoute } from "./AuthMiddleware"
import AdminCategoryPage from "./Pages/Admin/AdminCategoryPage"
import AdminAddNewCategoryPage from "./Pages/Admin/AdminAddNewCategory"
import AdminEditCategoryPage from "./Pages/Admin/AdminEditCategory"


function AdminRoutes(){
    return(
        <>
        <Routes>
         <Route element={<AdminProtectedRoute/>}>
            <Route path="/admin" element={<AdminDashboard/>} />     
            <Route path="/admin/account" element={<AdminAccountPage/>} />     
            <Route path="/admin/students" element={<AdminStudentsPage/>} />     
            <Route path="/admin/instructors" element={<AdminInstructorPage/>} />   
            <Route path="/admin/category" element={<AdminCategoryPage/>} />   
            <Route path="/admin/add-category" element={<AdminAddNewCategoryPage/>} />        
            <Route path="/admin/edit-category/:id" element={<AdminEditCategoryPage/>} />        
         </Route> 
        </Routes>
        </>
    )
}

export default AdminRoutes