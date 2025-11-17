import { useSelector } from "react-redux";
import InstructorDashboard from "../../Components/Instructor/InstructorDashboard/InstructorDashboard";
import InstructorNavbar from "../../Components/Instructor/InstructorNavbar/InstructorNavbar";
import InstructorSideBar from "../../Components/Instructor/InstructorSideBar/InstructorSideBar";
import Footer from "../../Components/Student/Footer/Footer";
import type { RootState } from "../../Redux/store";

function InstructorDashboardPage() {
  const instructorDashboard = useSelector(
    (state: RootState) => state.instructorDashboard
  );
  return (
    <>
      <InstructorNavbar />
      <InstructorSideBar>
        {instructorDashboard.status === "succeeded" ? (
          <InstructorDashboard />
        ) : (
          instructorDashboard.status === "loading" && (
            <div className="flex flex-col items-center justify-center h-64 text-gray-500">
              <div className="w-8 h-8 border-4 border-gray-400 border-t-transparent rounded-full animate-spin mb-3"></div>
              <p className="text-lg font-medium">Loading profile...</p>
            </div>
          )
        )}
      </InstructorSideBar>
      <Footer />
    </>
  );
}

export default InstructorDashboardPage;
