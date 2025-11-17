import InstructorNavbar from "../../Components/Instructor/InstructorNavbar/InstructorNavbar";
import InstructorProfileInformation from "../../Components/Instructor/InstructorProfileInformation/InstructorProfileInformation";
import InstructorSideBar from "../../Components/Instructor/InstructorSideBar/InstructorSideBar";
import Footer from "../../Components/Student/Footer/Footer";


function InstructorProfilePage() {
  return (
    <>
        <InstructorNavbar/>
      <InstructorSideBar>
        <InstructorProfileInformation />
      </InstructorSideBar>
      <Footer />
    </>
  );
}

export default InstructorProfilePage;
