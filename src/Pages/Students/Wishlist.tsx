import Footer from "../../Components/Student/Footer/Footer";
import Navbar from "../../Components/Student/Navbar/Navbar";
import StudentSideBar from "../../Components/Student/SideBar/StudentSideBar";
import Wishlist from "../../Components/Student/Wishlist/Wishlist";

function WishlistPage(){
    return(
        <>
        <Navbar/>
        <StudentSideBar>
            <Wishlist/>
        </StudentSideBar>
        <Footer/>
        </>
    )
}

export default WishlistPage