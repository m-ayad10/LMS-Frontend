import { useSelector } from "react-redux";
import AdminDashboard from "../../Components/Admin/AdminDashboard/AdminDashboard";
import AdminSideBar from "../../Components/Admin/AdminSidebar/AdminSidebar";
import InstructorNavbar from "../../Components/Instructor/InstructorNavbar/InstructorNavbar";
import Footer from "../../Components/Student/Footer/Footer";
import type { RootState } from "../../Redux/store";

function AdminDashboardPage() {
  const adminDashboard = useSelector(
    (state: RootState) => state.adminDashboard
  );
  return (
    <>
      <InstructorNavbar />
      <AdminSideBar>
        {adminDashboard.status === "succeeded" ? (
          <AdminDashboard />
        ) : (
          adminDashboard.status === "loading" && (
            <div className="flex flex-col items-center justify-center h-64 text-gray-500">
              <div className="w-8 h-8 border-4 border-gray-400 border-t-transparent rounded-full animate-spin mb-3"></div>
              <p className="text-lg font-medium">Loading profile...</p>
            </div>
          )
        )}
      </AdminSideBar>
      <Footer />
    </>
  );
}

export default AdminDashboardPage;
