import SearchCourses from "../../Components/Student/Search/SearchCourses"
import Footer from "../../Components/Student/Footer/Footer"
import Navbar from "../../Components/Student/Navbar/Navbar"
import PageBanner from "../../Components/PageBanner/PageBanner"

function ExploreCourses(){
    return(
        <>
        <Navbar/>
        <PageBanner/>
        <SearchCourses/>
        <Footer/>
        </>
    )
}

export default ExploreCourses