import Banner from "../../Components/Student/Banner/Banner";
import Courses from "../../Components/Student/Courses/Courses";
import Footer from "../../Components/Student/Footer/Footer";
import Navbar from "../../Components/Student/Navbar/Navbar";
import PopularCategories from "../../Components/Student/PopularCategories/PopularCategories";
import Testominals from "../../Components/Student/Testominals/Testominals";
import TopInstructors from "../../Components/Student/TopInstructors/TopInstructors";
import WhyOnline from "../../Components/Student/WhyOnline/WhyOnline";

function Home() {
  return (
    <>
      <Navbar />
      <Banner />
      <WhyOnline />
      <PopularCategories />
      <Courses />
      <TopInstructors />
      <Testominals />
      <Footer />
    </>
  );
}
export default Home