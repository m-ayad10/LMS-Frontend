import {Routes,Route} from 'react-router-dom'
import InstructorSignup from './Pages/Instructor/InstructorSignUp'
import InstructorProfilePage from './Pages/Instructor/InstructorProfilePage'
import InstructorAccountPage from './Pages/Instructor/InstructorAccountPage'
import InstructorDashboard from './Pages/Instructor/InstructorDashboard'
import InstructorManageCoursesPage from './Pages/Instructor/InstructorManageCourses'
import InstructorAddCoursePage from './Pages/Instructor/InstructorAddCoursePage'
import { InstructorProtectedRoute } from './AuthMiddleware'

function InstructorRoutes(){
    return(
        <>
        <Routes>
            <Route path='/instructor/signup' element={<InstructorSignup/>} />
            <Route element={<InstructorProtectedRoute/>}>
               <Route path='/instructor/profile' element={<InstructorProfilePage/>} />
               <Route path='/instructor/account' element={<InstructorAccountPage/>} />
               <Route path='/instructor' element={<InstructorDashboard/>} />
               <Route path='/instructor/managecourse' element={<InstructorManageCoursesPage/>} />
                <Route path='/instructor/addcourse' element={<InstructorAddCoursePage/>} />
            </Route>
        </Routes>
        </>
    )
}

export default InstructorRoutes